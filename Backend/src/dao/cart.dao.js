import cartModel from "../models/cart.model.js"

export async function getCartDetails(userId) {
    const cart = await cartModel.aggregate([
        { $match: { user: userId } },
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
                currency: { $first: '$items.product.price.currency' }, 
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
    ])

    return cart
}