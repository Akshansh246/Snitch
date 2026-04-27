import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { validateAddToCart } from '../validators/cart.validator.js';
import { addToCart, getCart } from '../controllers/cart.controller.js';

const router = express.Router()

/**
 * @route /api/cart/add/:productId/:variantId
 * @description add item to cart
 * @access private (users only)
 * @argument productId - ID of the product to add
 * @argument variantId - ID of the variant to add
 * @argument quantity - Quantity of the item to add (optional, default: 1)
 */
router.post('/add/:productId', authenticateUser, validateAddToCart, addToCart)

/**
 * @route /api/cart/
 * @description get cart products
 * @access private (users only)
 */
router.get('/', authenticateUser, getCart)



export default router