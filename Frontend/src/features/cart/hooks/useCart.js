import { addItem, getCart } from "../services/cart.api";
import { useDispatch } from "react-redux"
import { setItems } from '../state/cart.slice'

export const useCart =  () => {
    const dispatch = useDispatch()

    async function handleAddItem({ productId, variantId, size }) {
        const data = await addItem({ productId, variantId, size })
        
        return data
    }

    async function handleGetCart() {
        const data = await getCart()
        dispatch(setItems(data.cart.items))
    }

    return {
        handleAddItem,
        handleGetCart
    }
}