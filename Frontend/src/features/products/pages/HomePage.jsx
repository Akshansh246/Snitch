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

    function applyDiscount(amount){
        const discounts = [5, 10, 15, 20]; // more realistic
        const discount = discounts[Math.floor(Math.random() * discounts.length)];

        const finalAmt = Math.round(amount * (1 - discount / 100));

        return { finalAmt, discount };
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
                    <div onClick={() => {navigate(`/product/${product._id}`)}} key={idx} className='bg-snitch-surface cursor-pointer m-auto w-36 md:w-60 rounded overflow-hidden hover:scale-105 transition-all'>
                        <img className='w-full h-40 md:h-70 object-cover' src={product.images[0].url} alt="" />
                        <div className='p-4 flex flex-col gap-3 justify-between'>
                            <div className='flex justify-between items-center'>
                                <p className='text-sm font-extralight'>{product.title}</p>
                                <div className='flex items-center gap-2 text-xs'>
                                    <div className='w-4 h-4 rounded-full border border-white' style={{backgroundColor: product.color.swatch}} />
                                    <p>{product.color.name}</p>
                                </div>
                            </div>
                            <div className='flex gap-2 items-center text-snitch-text-muted'>
                                <div className='flex gap-1 text-white'>
                                    <p>{convertCurrency(product.price.currency)}</p>
                                    <p>{applyDiscount(product.price.amount).finalAmt}</p>
                                </div>
                                <strike className='flex gap-1 text-xs'>
                                    <p>{convertCurrency(product.price.currency)}</p>
                                    <p className=''>{product.price.amount}</p>
                                </strike>
                                <p className='text-xs text-snitch-success'>({applyDiscount(product.price.amount).discount}% OFF)</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage
