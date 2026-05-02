import { addItem, createCartOrder, decrementCartItemApi, getCart, incrementCartItemApi, verifyCartOrder } from "../services/cart.api.js";
import { useDispatch } from "react-redux"
import { setItems, incrementCartItem, decrementCartItem } from '../state/cart.slice'

export const useCart =  () => {
    const dispatch = useDispatch()

    async function handleAddItem({ productId, variantId, size }) {
        const data = await addItem({ productId, variantId, size })
        
        return data
    }

    async function handleGetCart() {
        const data = await getCart()
        dispatch(setItems(data.cart))
    }

    async function handleIncrementCartItem({ productId, variantId }) {
        const data = await incrementCartItemApi({productId, variantId})
        dispatch(incrementCartItem({ productId, variantId }))
        return data
    }

    async function handleDecrementCartItem({productId, variantId, size}) {
        const data = await decrementCartItemApi({productId, variantId, size})
        dispatch(decrementCartItem({productId, variantId}))
        return data
    }

    async function handleCreateCartOrder() {
        const data = await createCartOrder()
        return data.order
    }

    async function handleVerifyCartOrder({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
        const data = await verifyCartOrder({razorpay_order_id, razorpay_payment_id, razorpay_signature})
        return data.success
    }

    return {
        handleAddItem,
        handleGetCart,
        handleIncrementCartItem,
        handleDecrementCartItem,
        handleCreateCartOrder,
        handleVerifyCartOrder
    }
}