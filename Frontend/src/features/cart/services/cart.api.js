import axios from 'axios'

const api = axios.create({
    baseURL: '/api/cart',
    withCredentials: true
})

export const addItem = async ({ productId, variantId }) => {
    const response = await api.post(`/add/${productId}`,{
        quantity: 1,
        variantId
    })

    return response.data
}