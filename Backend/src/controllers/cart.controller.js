import { stockOfVariant } from "../dao/product.dao.js"
import cartModel from "../models/cart.model.js"
import productModel from "../models/product.model.js"

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

    const result = await cartModel.aggregate([
        { $match: { user: user._id } },
        { $unwind: '$items' },

        {
            $lookup: {
                from: 'products',
                localField: 'items.product',
                foreignField: '_id',
                as: 'items.product'
            }
        },

        { $unwind: '$items.product' },

        {
            $addFields: {
                selectedVariant: {
                    $cond: [
                        { $ifNull: ['$items.variant', false] },
                        {
                            $arrayElemAt: [
                                {
                                    $filter: {
                                        input: '$items.product.variants',
                                        as: 'v',
                                        cond: {
                                            $eq: ['$$v._id', '$items.variant']
                                        }
                                    }
                                },
                                0
                            ]
                        },
                        null
                    ]
                }
            }
        },

        {
            $addFields: {
                itemPrice: {
                    $multiply: [
                        '$items.quantity',
                        '$items.product.price.amount' 
                    ]
                }
            }
        },

        {
            $group: {
                _id: '$_id',
                total: { $sum: '$itemPrice' },
                items: {
                    $push: {
                        product: '$items.product',
                        size: '$items.size',
                        variant: '$selectedVariant',
                        quantity: '$items.quantity',
                        price: '$items.price'
                    }
                }
            }
        }
    ]);

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