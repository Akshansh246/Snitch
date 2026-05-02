import axios from 'axios'

const api = axios.create({
    baseURL: '/api/cart',
    withCredentials: true
})

export const addItem = async ({ productId, variantId, size }) => {
    const response = await api.post(`/add/${productId}`,{
        quantity: 1,
        variantId,
        size
    })

    return response.data
}

export const getCart = async () => {
    const response = await api.get('/')

    return response.data
}

export const incrementCartItemApi = async ({ productId, variantId }) => {
    const response = await api.patch(`/quantity/increment/${productId}`,{
            variantId
        }
    )

    return response.data
}

export const decrementCartItemApi = async ({productId, variantId, size}) => {
    const response = await api.patch(`/quantity/decrement/${productId}`,{
        variantId,
        size
    })

    return response.data
}

export const createCartOrder = async () => {
    const response = await api.post('/payment/create/order')
    return response.data
}

export const verifyCartOrder = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature}) => {
    const response = await api.post('/payment/verify/order',{
        razorpay_order_id, razorpay_payment_id, razorpay_signature
    })

    return response.data
}