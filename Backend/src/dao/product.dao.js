import productModel from "../models/product.model.js"

export const stockOfVariant = async (productId, variantId) => {
    
    const product = await productModel.findById(productId);

    if (!product) {
        return null; 
    }

    if (variantId) {
        const variant = product.variants.find(
            v => v._id.toString() === variantId.toString()
        );

        if (variant) {
            return variant.stock;
        }
    }

    return product.stock;
};