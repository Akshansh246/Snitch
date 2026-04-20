import { createProduct, getAllProducts, getProductById, getSellerDrafts, getSellerProducts } from "../services/product.api"
import { useDispatch } from 'react-redux'
import { setProducts, setSellerProducts } from "../states/product.slice"

export const useProduct = () => {

    const dispatch = useDispatch()

    async function handleCreateProduct(formData) {
        const data = await createProduct(formData)
        
        return data.product
    }

    async function handleGetSellerProducts() {
        const data = await getSellerProducts()
        dispatch(setSellerProducts(data.products))

        return data.products
    }

    async function handleGetSellerDrafts() {
        const data = await getSellerDrafts()

        return data.products
    }

    async function handleGetAllProducts() {
        const data = await getAllProducts()
        dispatch(setProducts(data.products))
        return data.products
    }

    async function handleGetProductById(productId) {
        const data = await getProductById(productId)
        
        return data.product
    }


    return {
        handleCreateProduct,
        handleGetSellerProducts ,
        handleGetSellerDrafts,
        handleGetAllProducts,
        handleGetProductById
    }
}