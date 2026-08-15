import mongoose from "mongoose"
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js"
import { getCartDetails } from "../dao/cart.dao.js"
import { stockOfVariant } from "../dao/product.dao.js"
import cartModel from "../models/cart.model.js"
import paymentModel from "../models/payment.model.js"
import productModel from "../models/product.model.js"
import { createOrder } from "../services/payment.service.js"
import { config } from "../config/config.js"



export const addToCart = async (req, res) => {
    const { productId } = req.params
    const { quantity=1, variantId, size } = req.body

    let product;

    if(variantId){
        product = await productModel.findOne({
            _id: productId,
            "variants._id": variantId
        })
    }else{
        product = await productModel.findById(productId)
    }

    if(!product){
        return res.status(404).json({
            message:"Product or variant not found",
            success: false
        })
    }

    const stock = variantId ? await stockOfVariant(productId, variantId) : product.stock

    const cart = (await cartModel.findOne({ user: req.user._id })) || (await cartModel.create({ user:req.user._id }))

    const isProductAlreadyInCart = cart.items.some(item => item.product.toString() === productId && item.size === size && (variantId ? item.variant?.toString() === variantId : !item.variant))

    if(isProductAlreadyInCart){
        const quantityInCart = cart.items.find(item => item.product.toString() === productId && item.size === size && (variantId ? item.variant.toString() === variantId : !item.variant)).quantity
        if(quantityInCart + quantity > stock){
            return res.status(400).json({
                message: `Only ${stock - quantityInCart} items left in the stock and you have already added ${quantityInCart} in your cart.`,
                success: false
            });
        }

        const filter = variantId
            ? { 
                user: req.user._id, 
                "items.product": productId, 
                "items.variant": variantId,
                "items.size": size
            }
            : { 
                user: req.user._id, 
                "items.product": productId, 
                "items.variant": { $exists: false } ,
                "items.size": size
            };

        await cartModel.findOneAndUpdate(
            filter,
            { $inc: { "items.$.quantity": quantity } },
            { new: true }
        );

        return res.status(200).json({
            message: 'Cart updated successfully',
            success: true
        })
    }

    if(quantity >  stock){
        return res.status(400).json({
            message: `Only ${stock} items left in the stock`,
            success: false
        })
    }

    cart.items.push({
        product: productId,
        ...(variantId && { variant: variantId }), 
        quantity,
        size,
        price: product.price
    });

    await cart.save()

    res.status(200).json({
        message: 'Product added to cart successfully',
        success: true
    });
}

export const getCart = async (req, res) => {
    const user = req.user;

    const result = await getCartDetails(user._id)

    const cart = result[0] || { items: [], total: 0 };

    return res.status(200).json({
        message: 'Cart fetched Successfully',
        success: true,
        cart
    });
};

export const incrementCartItemQuantity = async (req, res) => {
    const { productId } = req.params
    const { variantId } = req.body

    let product;

    if(variantId){
        product = await productModel.findOne({
            _id: productId,
            "variants._id": variantId
        })
    }else{
        product = await productModel.findById(productId)
    }

    if(!product){
        return res.status(404).json({
            message:"Product or variant not found",
            success: false
        })
    }

    const cart = await cartModel.findOne({ user: req.user._id})

    if(!cart){
        return res.status(404).json({
            message:"Cart not found",
            success: false
        })
    }

    const stock = await stockOfVariant(productId, variantId)

    const quantityInCart = cart.items.find(item => item.product.toString() === productId && (variantId ? item.variant.toString() === variantId : !item.variant)).quantity || 0

    if(quantityInCart + 1 > stock){
        return res.status(400).json({
            message: `Only ${stock - quantityInCart} items left in the stock and you have already added ${quantityInCart} in your cart.`,
            success: false
        });
    }

    const filter = variantId
        ? {
            user: req.user._id,
            "items.product": productId,
            "items.variant": variantId
        }
        : {
            user: req.user._id,
            "items.product": productId,
            "items.variant": { $exists: false }
        };

    await cartModel.findOneAndUpdate(
        filter,
        { $inc: { "items.$.quantity": 1 } }
    );

    return res.status(200).json({
        message: 'Cart items updated successfully',
        success: true,
    })
}

export const decrementCartItemQuantity = async (req, res) => {
    const { productId } = req.params;
    const { variantId, size } = req.body;

    const cart = await cartModel.findOne({ user: req.user._id });

    if (!cart) {
        return res.status(404).json({
            message: "Cart not found",
            success: false
        });
    }

    const item = cart.items.find(item =>
        item.product.toString() === productId &&
        item.size === size &&
        (variantId
            ? item.variant?.toString() === variantId
            : !item.variant)
    );

    if (!item) {
        return res.status(404).json({
            message: "Item not found in cart",
            success: false
        });
    }

    if (item.quantity - 1 <= 0) {

        const filter = variantId
            ? {
                user: req.user._id,
                "items.product": productId,
                "items.variant": variantId,
                "items.size": size
            }
            : {
                user: req.user._id,
                "items.product": productId,
                "items.variant": { $exists: false },
                "items.size": size
            };

        await cartModel.findOneAndUpdate(
            { user: req.user._id },
            {
                $pull: {
                    items: {
                        product: productId,
                        ...(variantId && { variant: variantId }),
                        size
                    }
                }
            }
        );

        return res.status(200).json({
            message: "Item removed from cart",
            success: true
        });
    }


    const filter = variantId
        ? {
            user: req.user._id,
            "items.product": productId,
            "items.variant": variantId,
            "items.size": size
        }
        : {
            user: req.user._id,
            "items.product": productId,
            "items.variant": { $exists: false },
            "items.size": size
        };

    await cartModel.findOneAndUpdate(
        filter,
        { $inc: { "items.$.quantity": -1 } }
    );

    return res.status(200).json({
        message: "Cart item decremented",
        success: true
    });
};

export const createOrderController = async (req, res) => {

    const cart = await getCartDetails(req.user._id)
    const cartData = cart[0];

    if (!cartData) {
        return res.status(400).json({
            message: "Cart is Empty",
            success: false
        });
    }

    const order = await createOrder({ amount: cartData.total, currency: cartData.currency })

    const payment = await paymentModel.create({
        user: req.user._id,
        razorpay:{
            orderId: order.id,

        },
        price:{
            amount: cartData.total,
            currency: cartData.currency
        },
        orderItems: cartData.items.map(item => ({
            title: item.product.title,
            productId: item.product._id,
            variantId: item.variant?._id || null,
            quantity: item.quantity,
            size: item.size,
            images: item.variant?.images || item.product.images,
            description: item.product.description,
            price: {
                amount: item.variant?.price?.amount || item.product.price.amount,
                currency: item.product.price.currency
            }
        }))
    })

    return res.status(200).json({
        message: "Order created successfully",
        success: true,
        order
    })
}

export const verifyOrderController = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = req.body

    const payment = await paymentModel.findOne({
        "razorpay.orderId": razorpay_order_id,
        status: "pending"
    })

    if(!payment){
        return res.status(400).json({
            message: "Payment not found",
            success: false
        })
    }

    const isPaymentValid = validatePaymentVerification({
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        
    }, razorpay_signature, config.RAZORPAY_KEY_SECRET)

    if(!isPaymentValid){
        payment.status = "failed"
        await payment.save()

        return res.status(400).json({
            message: "Payment verification Failed",
            success: false
        })
    }

    payment.status = "paid"
    payment.razorpay.paymentId = razorpay_payment_id
    payment.razorpay.signature = razorpay_signature
    payment.estimatedDeliveryDate = new Date(Date.now() + 9 * 24 * 60 * 60 * 1000) // 9 days delivery target
    payment.shippingStatus = "In Transit"
    payment.shippingCity = "Mumbai Atelier Hub"

    await payment.save()

    await cartModel.findOneAndUpdate(
        { user: payment.user },
        { $set: { items: [] } }
    )

    return res.status(200).json({
        message: "Payment verified successfully",
        success: true
    })
}

export const buyNowController = async (req, res) => {
    const { productId, variantId, size = 'M', quantity = 1 } = req.body

    let product;
    if (variantId) {
        product = await productModel.findOne({
            _id: productId,
            "variants._id": variantId
        })
    } else {
        product = await productModel.findById(productId)
    }

    if (!product) {
        return res.status(404).json({
            message: "Product or variant not found",
            success: false
        })
    }

    const selectedVariant = variantId ? product.variants.id(variantId) : null
    const unitPrice = selectedVariant?.price?.amount || product.price.amount
    const currency = selectedVariant?.price?.currency || product.price.currency || 'INR'
    const totalAmount = unitPrice * Number(quantity)

    const order = await createOrder({ amount: totalAmount, currency })

    const payment = await paymentModel.create({
        user: req.user._id,
        razorpay: {
            orderId: order.id
        },
        price: {
            amount: totalAmount,
            currency
        },
        orderItems: [
            {
                title: product.title,
                productId: product._id,
                variantId: selectedVariant?._id || null,
                quantity,
                size,
                images: selectedVariant?.images?.length ? selectedVariant.images : product.images,
                description: product.description,
                price: {
                    amount: unitPrice,
                    currency
                }
            }
        ]
    })

    return res.status(200).json({
        message: "Direct Buy Now order created successfully",
        success: true,
        order
    })
}

export const getUserOrdersController = async (req, res) => {
    try {
        const orders = await paymentModel.find({
            user: req.user._id,
            status: { $in: ["paid", "pending"] }
        }).sort({ createdAt: -1 })

        return res.status(200).json({
            message: "Orders fetched successfully",
            success: true,
            orders
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Failed to fetch orders",
            success: false
        })
    }
}

export const getOrderDetailsController = async (req, res) => {
    let { orderId } = req.params

    try {
        let payment = null;

        if (orderId === 'latest' || !orderId) {
            payment = await paymentModel.findOne({
                user: req.user._id
            }).sort({ createdAt: -1 }).populate('user', 'fullname email contact address')
        }

        if (!payment && mongoose.Types.ObjectId.isValid(orderId)) {
            payment = await paymentModel.findOne({
                _id: orderId,
                user: req.user._id
            }).populate('user', 'fullname email contact address')

            if (!payment) {
                payment = await paymentModel.findById(orderId).populate('user', 'fullname email contact address')
            }
        }

        if (!payment) {
            payment = await paymentModel.findOne({
                $or: [
                    { "razorpay.orderId": orderId },
                    { "razorpay.paymentId": orderId }
                ]
            }).populate('user', 'fullname email contact address')
        }

        // Fallback: retrieve the most recent order for the logged-in user
        if (!payment) {
            payment = await paymentModel.findOne({
                user: req.user._id
            }).sort({ createdAt: -1 }).populate('user', 'fullname email contact address')
        }

        // Ultimate fallback
        if (!payment) {
            payment = await paymentModel.findOne().sort({ createdAt: -1 }).populate('user', 'fullname email contact address')
        }

        if (!payment) {
            return res.status(404).json({
                message: "Order not found",
                success: false
            })
        }

        const userAddress = payment.user?.address || req.user?.address
        const userAddressCity = userAddress?.city 
            ? `${userAddress.street ? userAddress.street + ', ' : ''}${userAddress.city}${userAddress.zipcode ? ' - ' + userAddress.zipcode : ''}`
            : "Destination Address"

        const now = new Date()
        const createdAt = new Date(payment.createdAt || Date.now())
        const estDelivery = new Date(payment.estimatedDeliveryDate || Date.now() + 9 * 24 * 60 * 60 * 1000)

        // Calculate progress percentage (0 - 100)
        const totalDuration = estDelivery.getTime() - createdAt.getTime()
        const elapsed = now.getTime() - createdAt.getTime()
        const progressPercent = Math.min(100, Math.max(0, Math.floor((elapsed / totalDuration) * 100)))

        // Simulated Indian Transit Hubs ending at user's real address
        const transitHubs = [
            { name: "Mumbai Atelier Hub", dayOffset: 0, city: "Mumbai" },
            { name: "Ahmedabad Transit Center", dayOffset: 2, city: "Ahmedabad" },
            { name: "New Delhi Dispatch Center", dayOffset: 5, city: "New Delhi" },
            { name: "Regional Center", dayOffset: 7, city: userAddress?.state || "Regional Hub" },
            { name: "Final Delivery", dayOffset: 9, city: userAddressCity }
        ]

        let currentHubIndex = 0
        const daysElapsed = elapsed / (1000 * 60 * 60 * 24)

        if (daysElapsed >= 9 || now >= estDelivery) {
            currentHubIndex = 4
            payment.shippingStatus = "Delivered"
            payment.shippingCity = userAddressCity
        } else if (daysElapsed >= 7) {
            currentHubIndex = 3
            payment.shippingStatus = "Out for Delivery"
            payment.shippingCity = userAddress?.state ? `${userAddress.state} Regional Hub` : "Regional Fulfillment Hub"
        } else if (daysElapsed >= 5) {
            currentHubIndex = 2
            payment.shippingStatus = "In Transit"
            payment.shippingCity = "New Delhi Dispatch Center"
        } else if (daysElapsed >= 2) {
            currentHubIndex = 1
            payment.shippingStatus = "In Transit"
            payment.shippingCity = "Ahmedabad Transit Center"
        } else {
            currentHubIndex = 0
            payment.shippingStatus = "Processing"
            payment.shippingCity = "Mumbai Atelier Hub"
        }

        return res.status(200).json({
            message: "Order tracking details fetched successfully",
            success: true,
            order: payment,
            tracking: {
                isDelivered: daysElapsed >= 9 || now >= estDelivery,
                progressPercent,
                currentHubIndex,
                transitHubs,
                daysRemaining: Math.max(0, Math.ceil((estDelivery.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Failed to fetch order details",
            success: false
        })
    }
}