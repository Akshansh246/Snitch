/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct'
import Navbar from '../../auth/components/Navbar'
import { useNavigate } from 'react-router'

const HomePage = () => {
    
    const { handleGetAllProducts } = useProduct()
    const products = useSelector(state => state.product.products)
    const navigate = useNavigate()

    function convertCurrency(name){
        switch(name){
            case 'INR': return '₹'
            case 'USD': return '$'
            case 'EUR': return '€'
            case 'JBP': return '£'
            default: return '₹'
        }
    }

    useEffect(()=>{
        handleGetAllProducts()
    },[])


    return (
        <div className='w-screen bg-snitch-bg text-white py-20 px-10'>
            <Navbar/>
            <div className='w-full flex justify-between items-center mb-10'>
                <div className='flex flex-col gap-4'>
                    <p className='uppercase text-xs tracking-[4px] text-snitch-text-muted'>Summer / Autumn 24</p>
                    <h1 className='text-2xl md:text-5xl font-snitch-display'>The Silhouette Of <br /> Silence</h1>
                </div>
                <div className='uppercase'>
                    <select name="" id="">
                        <option value="">Sort By</option>
                        <option value="">Newest</option>
                        <option value="">Oldest</option>
                    </select>
                </div>
            </div>
            <div className='flex flex-wrap gap-4'>
                {products.map((product, idx) => (
                    <div onClick={() => {navigate(`/product/${product._id}`)}} key={idx} className='bg-snitch-surface m-auto w-36 md:w-60 rounded overflow-hidden hover:scale-105 transition-all'>
                        <img className='w-full h-40 md:h-70 object-cover' src={product.images[0].url} alt="" />
                        <div className='p-3 flex justify-between'>
                            <p className='text-sm font-extralight'>{product.title}</p>
                            <div className='flex gap-1 text-snitch-text-muted'>
                                <p>{convertCurrency(product.price.currency)}</p>
                                <p>{product.price.amount}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage
