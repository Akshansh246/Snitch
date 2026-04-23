import productModel from "../models/product.model.js"
import { uploadFile } from "../services/storage.service.js"

export async function createProduct(req, res) {
    const {title, description, priceAmount, priceCurrency, type ='published', colorName, colorSwatch, sizes} = req.body
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

export async function addProductVariant(req, res) {

    const productId = req.params.productId

    const product = await productModel.findOne({
        _id: productId,
        seller: req.user._id
    })

    if(!product){
        return res.status(404).json({
            message:"Product Not Found!",
            success: false
        })
    }

    const files = req.files
    const images = []

    if(!files || files.length !== 0){
        (await Promise.all(files.map(async (file) => {
            const image = await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname
            })
            return image
        }))).map(image => images.push(image))
    }

    const price = req.body.priceAmount
    const stock = req.body.stock
    const attributes = JSON.parse(req.body.attributes || "{}")

    console.log(product, images, price, stock, attributes)

    product.variants.push({
        images,
        price: {
            amount:price,
            currency: req.body.priceCurrency || product.price.currency
        },
        stock,
        attributes
    })

    await product.save();

    return res.status(200).json({
        message:"Product variant added successfully",
        success:true,
        product
    })
}