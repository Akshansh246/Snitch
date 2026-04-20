/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router'
import { useProduct } from '../hooks/useProduct'
import Navbar from '../../auth/components/Navbar'

const ProductDetails = () => {

    const {productId} = useParams()
    const [product, setProduct] = useState({});
    const { handleGetProductById } = useProduct()
    console.log(productId)

    async function getProduct() {
        const data = await handleGetProductById(productId)
        setProduct(data)
    }
    
    useEffect(()=>{
        getProduct()
    },[productId])

    console.log(product)

    return (
        <div>
            <Navbar/>
            Product Details
            {product.title}
        </div>
    )
}

export default ProductDetails
