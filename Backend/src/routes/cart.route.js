import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { validateAddToCart } from '../validators/cart.validator.js';
import { addToCart, buyNowController, createOrderController, decrementCartItemQuantity, getCart, getOrderDetailsController, getUserOrdersController, incrementCartItemQuantity, verifyOrderController } from '../controllers/cart.controller.js';

const router = express.Router()

/**
 * @route /api/cart/add/:productId/
 * @description add item to cart
 * @access private (users only)
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

/**
 * @route POST /api/cart/payment/create/order
 * @description creating an order for payment
 * @access private
 */
router.post('/payment/create/order', authenticateUser, createOrderController)

/**
 * @route POST /api/cart/payment/buy-now
 * @description create direct single item buy now order
 * @access private
 */
router.post('/payment/buy-now', authenticateUser, buyNowController)

/**
 * @route GET /api/cart/orders
 * @description get all paid orders for user
 * @access private
 */
router.get('/orders', authenticateUser, getUserOrdersController)

/**
 * @route GET /api/cart/orders/:orderId
 * @description get specific order details and shipping tracking status
 * @access private
 */
router.get('/orders/:orderId', authenticateUser, getOrderDetailsController)

/**
 * @route POST /api/cart/payment/verify/order
 * @description verifys the payment
 * @access private
 */
router.post('/payment/verify/order', authenticateUser, verifyOrderController)

export default router