import { createSlice } from '@reduxjs/toolkit'

const loadWishlist = () => {
    try {
        const saved = localStorage.getItem('snitch_wishlist')
        return saved ? JSON.parse(saved) : []
    } catch {
        return []
    }
}

const saveWishlist = (items) => {
    try {
        localStorage.setItem('snitch_wishlist', JSON.stringify(items))
    } catch (e) {
        console.error('Failed to save wishlist:', e)
    }
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: loadWishlist()
    },
    reducers: {
        toggleWishlistProduct: (state, action) => {
            const product = action.payload
            const existsIndex = state.items.findIndex(item => item._id === product._id || item.id === product.id)
            if (existsIndex >= 0) {
                state.items.splice(existsIndex, 1)
            } else {
                state.items.push(product)
            }
            saveWishlist(state.items)
        },
        removeFromWishlist: (state, action) => {
            const id = action.payload
            state.items = state.items.filter(item => item._id !== id && item.id !== id)
            saveWishlist(state.items)
        },
        clearWishlist: (state) => {
            state.items = []
            saveWishlist([])
        }
    }
})

export const { toggleWishlistProduct, removeFromWishlist, clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
