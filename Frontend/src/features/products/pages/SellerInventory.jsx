/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import SellerHeader from '../components/SellerHeader'
import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct'

const SellerInventory = () => {

    const {handleGetSellerProducts} = useProduct()
    const navigate = useNavigate()

    const sellerProducts = useSelector(state => state.product.sellerProducts)


    useEffect(()=>{
        handleGetSellerProducts()
    },[])


    return (
        <div className='w-full min-h-screen flex justify-center px-4 sm:px-8 lg:px-12 pt-24 pb-16 text-snitch-text bg-snitch-bg overflow-x-hidden'>
            <SellerHeader/>
            <div className='flex flex-col gap-8 w-full max-w-7xl'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='font-snitch-display text-3xl sm:text-4xl text-snitch-text font-bold'>Inventory</h1>
                        <p className='text-xs sm:text-sm text-snitch-text-muted italic'>Curate your collection of architectural silhouettes and textile art.</p>
                    </div>
                    <Link to={'/seller/create-product'} className='btn px-4 py-2.5 text-xs font-semibold shrink-0'>+ Add New Piece</Link>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {sellerProducts.map((prod, idx)=>(
                        <div onClick={() => {navigate(`/seller/product/${prod._id}`)}} key={idx} className='bg-snitch-surface rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] border border-snitch-border/40 flex flex-col group shadow-sm'>
                            <div className='w-full h-64 sm:h-72 relative overflow-hidden bg-snitch-card'>
                                <img className='w-full h-full object-top object-cover group-hover:scale-105 transition-transform duration-500' src={prod.images[0]?.url} alt={prod.title}/>
                                <p className='absolute text-[10px] uppercase right-2 top-2 bg-snitch-dark-hero/90 backdrop-blur-md px-2 py-0.5 rounded text-white font-medium'>{prod.type || 'Published'}</p>  
                            </div>
                            <div className='p-4 flex flex-col gap-3 flex-1 justify-between font-mono'>
                                <div>
                                    <h3 className='text-sm font-bold text-snitch-text line-clamp-1'>{prod.title}</h3>
                                    <p className='text-xs text-snitch-text-muted font-light line-clamp-2 mt-1'>{prod.description}</p>
                                </div>
                                <div className='flex items-center gap-1 font-bold text-sm text-snitch-text pt-2 border-t border-snitch-border/30'>
                                    <span>{prod.price.currency}</span>
                                    <span>{prod.price.amount}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='bg-snitch-surface rounded-xl overflow-hidden border border-snitch-border/40 flex flex-col shadow-sm'>
                        <div className='h-64 sm:h-72 flex justify-center items-center bg-cover bg-center relative p-4' style={{backgroundImage:'linear-gradient(to top, rgba(10,14,20,0.8), rgba(10,14,20,0.4)), url(https://images.unsplash.com/photo-1557545826-b2ac471c2bc7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
                            <Link to={'/seller/create-product'} className='flex flex-col gap-3 items-center group'>
                                <div className='p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl group-hover:scale-110 transition-transform'>
                                    <svg className='w-6 h-6 text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 10.9999L22.0002 10.9997L22.0002 12.9997L13.0001 12.9999L13.0001 21.9998L11.0001 21.9998L11.0001 12.9999L2.00004 13.0001L2 11.0001L11.0001 10.9999L11 2.00025L13 2.00024L13.0001 10.9999Z"></path></svg>
                                </div>
                                <p className='uppercase text-xs font-semibold tracking-[3px] text-white'>Add Product</p>
                            </Link>
                        </div>
                        <div className='p-4 text-snitch-text-muted flex flex-col gap-1 flex-1 justify-center border-t border-snitch-border/30 font-mono'>
                            <h3 className='text-sm font-bold text-snitch-text'>New Composition</h3>
                            <p className='text-xs italic'>Begin a new entry in your digital catalog.</p>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default SellerInventory
