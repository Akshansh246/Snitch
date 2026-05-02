import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        totalPrice: null,
        currency: null,
        items: []
    }, 
    reducers : {
        setItems: (state, action) => {
            state.items = action.payload.items
            state.totalPrice = action.payload.total
            state.currency = action.payload.currency
        },
        addItem: (state, action) => {
            state.items.push(action.payload)
        },
        incrementCartItem: (state, action) => {
            const {productId, variantId} = action.payload
            state.items = state.items.map(item => {
                if( item.product._id === productId && (variantId)?item.variant._id === variantId : !item.variant ){
                    return {...item, quantity: item.quantity + 1 }
                } else {
                    return item
                }
            })
        },
        decrementCartItem: (state, action) => {
            const {productId, variantId} = action.payload
            state.items = state.items.map(item => {
                if( item.product._id === productId && (variantId)?item.variant._id === variantId : !item.variant ){
                    return {...item, quantity: item.quantity - 1 }
                } else {
                    return item
                }
            })
        },
    }
})

export const { setItems, addItem, incrementCartItem, decrementCartItem } = cartSlice.actions

export default cartSlice.reducer