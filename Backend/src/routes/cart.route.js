import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { validateAddToCart } from '../validators/cart.validator.js';
import { addToCart, decrementCartItemQuantity, getCart, incrementCartItemQuantity } from '../controllers/cart.controller.js';

const router = express.Router()

/**
 * @route /api/cart/add/:productId/
 * @description add item to cart
 * @access private (users only)
 * @argument productId - ID of the product to add
 * @argument variantId - ID of the variant to add
 * @argument quantity - Quantity of the item to add (optional, default: 1)
 * @argument size - size of the product
 */
router.post('/add/:productId', authenticateUser, validateAddToCart, addToCart)

/**
 * @route GET /api/cart/
 * @description get cart products
 * @access private (users only)
 */
router.get('/', authenticateUser, getCart)

/**
 * @route PATCH /api/cart/quantity/increment/:productId
 * @description Increment product quantity by one
 * @access private
 */
router.patch('/quantity/increment/:productId', authenticateUser, incrementCartItemQuantity)

/**
 * @route PATCH /api/cart/quantity/decrement/:productId
 * @description Decrement product quantity by one
 * @access private
 */
router.patch('/quantity/decrement/:productId', authenticateUser, decrementCartItemQuantity)

export default router