import { addProductVariant, createProduct, getAllProducts, getProductById, getSellerDrafts, getSellerProducts } from "../services/product.api"
import { useDispatch } from 'react-redux'
import { setProducts, setSellerProducts } from "../states/product.slice"
import { toast } from 'react-toastify'

export const useProduct = () => {

    const dispatch = useDispatch()

    async function handleCreateProduct(formData) {
        try {
            const data = await createProduct(formData)
            return data.product
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to create product. Please try again.'
            toast.error(errorMsg)
            return null
        }
    }

    async function handleGetSellerProducts() {
        try {
            const data = await getSellerProducts()
            dispatch(setSellerProducts(data.products))
            return data.products
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to fetch seller products.')
            return []
        }
    }

    async function handleGetSellerDrafts() {
        try {
            const data = await getSellerDrafts()
            return data.products
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to fetch seller drafts.')
            return []
        }
    }

    async function handleGetAllProducts() {
        try {
            const data = await getAllProducts()
            dispatch(setProducts(data.products))
            return data.products
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to load catalog products.')
            return []
        }
    }

    async function handleGetProductById(productId) {
        try {
            const data = await getProductById(productId)
            return data.product
        } catch (err) {
            toast.error(err.response?.data?.message || 'Product details not found.')
            return null
        }
    }

    async function handleAddProductVariant(productId, newProductVariant) {
        try {
            const data = await addProductVariant(productId, newProductVariant)
            toast.success(data.message || 'Product variant added successfully!')
            return data
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to add product variant.')
            return null
        }
    }

    return {
        handleCreateProduct,
        handleGetSellerProducts,
        handleGetSellerDrafts,
        handleGetAllProducts,
        handleGetProductById,
        handleAddProductVariant
    }
}