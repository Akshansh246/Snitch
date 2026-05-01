import { addItem, decrementCartItemApi, getCart, incrementCartItemApi } from "../services/cart.api";
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

    return {
        handleAddItem,
        handleGetCart,
        handleIncrementCartItem,
        handleDecrementCartItem
    }
}