import productModel from "../models/product.model.js"
import { uploadFile } from "../services/storage.service.js"

export async function createProduct(req, res) {
    const {title, description, priceAmount, priceCurrency, type ='published', colorName, colorSwatch, stock, sizes} = req.body
    const seller = req.user

    const images = await Promise.all(req.files.map(async (file)=>{
        return await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname
        })
    }))

    const isDraft = type === "draft";

    const product = await productModel.create({
        title,
        description,
        price:{
            amount: priceAmount,
            currency: priceCurrency || 'INR'
        },
        images,
        seller: seller._id,
        type,
        stock: stock,
        color:{
            name: colorName,
            swatch: colorSwatch
        },
        sizes: sizes,
        expiresAt: isDraft 
            ? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
            : null
    })

    res.status(201).json({
        message:'Product created successfully',
        success:true,
        product
    });
}

export  async function getSellerProducts(req, res) {
    const seller = req.user

    const products = await productModel.find({ 
        seller: seller._id,
    })


    res.status(200).json({
        message:"Products fetched successfully.",
        success:true,
        products
    })
}

export  async function getSellerDrafts(req, res) {
    const seller = req.user

    const products = await productModel.find({ 
        seller: seller._id,
        type:'draft'
    })


    res.status(200).json({
        message:"Drafts fetched successfully.",
        success:true,
        products
    })
}

export async function getAllProducts(req, res) {
    const products = await productModel.find({ type:'published' })

    return res.status(200).json({
        message:"Products fetched successfully.",
        success:true,
        products
    })
}

export async function getProductDetails(req, res) {
    const { id } = req.params

    const product = await productModel.findById(id).populate('seller','fullname email contact')

    if(!product){
        return res.status(400).json({
            message: 'Product not found',
            success:false
        })
    }

    return res.status(200).json({
        message: 'Product found successfully',
        success: true,
        product
    })
}