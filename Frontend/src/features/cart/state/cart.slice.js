import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        items: []
    }, 
    reducers : {
        setItems: (state, action) => {
            state.items = action.payload
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
        }
    }
})

export const { setItems, addItem, incrementCartItem } = cartSlice.actions

export default cartSlice.reducer