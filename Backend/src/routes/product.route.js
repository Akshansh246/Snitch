import express from 'express'
import { authenticateSeller } from '../middlewares/auth.middleware.js'
import { createProduct, getAllProducts, getSellerDrafts, getSellerProducts } from '../controllers/product.controller.js'
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
 * @route POST /api/products/
 * @description it will be used to create products by ONLY SELLER
 * @access private (seller only)
 */
productRouter.post('/', authenticateSeller, upload.array('images', 7), createProductValidator , createProduct)

/**
 * @route GET /api/products/seller
 * @description returns all the products created by a seller
 * @access private (seller only)
 */
productRouter.get('/seller', authenticateSeller, getSellerProducts)

/**
 * @route GET  /api/products/seller/drafts
 * @description returns all the drafts
 * @access private (seller only)
 */
productRouter.get('/seller/drafts', authenticateSeller, getSellerDrafts)

/**
 * @route Get /api/products/
 * @description returns all the published products
 * @access public
 */
productRouter.get('/', getAllProducts)


export default productRouter