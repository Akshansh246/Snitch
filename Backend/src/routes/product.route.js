import express from 'express'
import { authenticateSeller } from '../middlewares/auth.middleware.js'
import { createProduct } from '../controllers/product.controller.js'
import multer from 'multer'
import { createProductValidator } from '../validators/product.validator.js'

const upload = multer({
    storage: multer.memoryStorage(),
    limits:{
        fileSize: 5 * 1024 * 1024 //5mb
    }
})

const productRouter = express.Router()

/**
 * @route /api/products/
 * @description it will be used to create products by ONLY SELLER
 * @access protected by SELLER
 */
productRouter.post('/', authenticateSeller, createProductValidator, upload.array('images', 7), createProduct)



export default productRouter