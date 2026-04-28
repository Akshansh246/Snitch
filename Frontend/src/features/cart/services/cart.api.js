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