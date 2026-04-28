import { stockOfVariant } from "../dao/product.dao.js"
import cartModel from "../models/cart.model.js"
import productModel from "../models/product.model.js"

export const addToCart = async (req, res) => {
    const {productId} = req.params
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
    const user = req.user

    let cart = await cartModel.findOne({ user: user._id }).populate('items.product')

    if(!cart){
        cart = await cartModel.create({ user: user._id })
    }

    return res.status(200).json({
        message: 'Cart fetched Successfuly',
        success: true,
        cart
    })
}