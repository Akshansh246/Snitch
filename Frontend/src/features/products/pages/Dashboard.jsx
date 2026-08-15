/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useProduct } from '../hooks/useProduct'
import { useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router'
import SellerHeader from '../components/SellerHeader'

const Dashboard = () => {
    
    const {handleGetSellerProducts, handleGetSellerDrafts} = useProduct()
    const [drafts, setDrafts] = useState([]);
    const [totalPrice, settotalPrice] = useState(0);
    const [totalStocks, settotalStocks] = useState(0);
    const sellerProducts = useSelector(state => state.product.sellerProducts)
    const navigate = useNavigate()

    async function getDrafts() {
        setDrafts( await handleGetSellerDrafts())
    }

    function getTotalPrice(){
        let totalPrice = 0
        for(let prod of sellerProducts){
            totalPrice += prod.price.amount 
        } 

        settotalPrice(totalPrice)
    }

    function getTotalStock(){
        let totalStock = 0
        for(let prod of sellerProducts){
            prod.variants.forEach(variant => {
                totalStock += variant.stock + prod.stock
            });
        } 

        settotalStocks(totalStock)
    }


    useEffect(()=>{
        handleGetSellerProducts()
        getDrafts()
    },[])

    useEffect(()=>{
        getTotalPrice()
        getTotalStock()
    },[handleGetSellerProducts])


    return (
        <div className='bg-snitch-bg w-full min-h-screen flex px-4 sm:px-8 lg:px-12 pt-24 pb-16 justify-center text-snitch-text overflow-x-hidden'>
            <SellerHeader/>  
            <div className='w-full max-w-7xl flex flex-col gap-8 sm:gap-12'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-3xl sm:text-4xl font-snitch-display text-snitch-text font-bold'>Dashboard</h1>
                    <p className='text-xs sm:text-sm text-snitch-text-muted'>Manage your shop's inventory and performance at a glance through our curated digital atelier.</p>
                </div>

                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                    <div className='bg-snitch-surface p-4 sm:p-5 flex flex-col justify-between gap-3 rounded-xl border border-snitch-border/40 shadow-sm'>
                        <div className='flex justify-between items-center text-snitch-text-muted text-xs sm:text-sm'>
                            <h4 className='uppercase tracking-wider font-bold'>Expected Sales</h4>
                            <svg className='w-5 h-5 shrink-0 text-snitch-text-muted' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.00488 3.00275H21.0049C21.5572 3.00275 22.0049 3.45046 22.0049 4.00275V20.0027C22.0049 20.555 21.5572 21.0027 21.0049 21.0027H3.00488C2.4526 21.0027 2.00488 20.555 2.00488 20.0027V4.00275C2.00488 3.45046 2.4526 3.00275 3.00488 3.00275ZM4.00488 5.00275V19.0027H20.0049V5.00275H4.00488ZM8.50488 14.0027H14.0049C14.281 14.0027 14.5049 13.7789 14.5049 13.5027C14.5049 13.2266 14.281 13.0027 14.0049 13.0027H10.0049C8.62417 13.0027 7.50488 11.8835 7.50488 10.5027C7.50488 9.12203 8.62417 8.00275 10.0049 8.00275H11.0049V6.00275H13.0049V8.00275H15.5049V10.0027H10.0049C9.72874 10.0027 9.50488 10.2266 9.50488 10.5027C9.50488 10.7789 9.72874 11.0027 10.0049 11.0027H14.0049C15.3856 11.0027 16.5049 12.122 16.5049 13.5027C16.5049 14.8835 15.3856 16.0027 14.0049 16.0027H13.0049V18.0027H11.0049V16.0027H8.50488V14.0027Z"></path></svg>
                        </div>
                        <p className='text-2xl sm:text-4xl text-snitch-text font-bold'>₹{totalPrice}</p>
                    </div>

                    <div className='bg-snitch-surface p-4 sm:p-5 flex flex-col justify-between gap-3 rounded-xl border border-snitch-border/40 shadow-sm'>
                        <div className='flex justify-between items-center text-snitch-text-muted text-xs sm:text-sm'>
                            <h4 className='uppercase tracking-wider font-bold'>Total Products</h4>
                            <svg className='w-5 h-5 shrink-0 text-snitch-text-muted' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.99805 4V11L11.998 8.5L16.998 11V4H19.998C20.5503 4 20.998 4.44772 20.998 5V21C20.998 21.5523 20.5503 22 19.998 22H3.99805C3.44576 22 2.99805 21.5523 2.99805 21V5C2.99805 4.44772 3.44576 4 3.99805 4H6.99805ZM11.998 8L7.49805 3H16.498L11.998 8ZM12.998 11.2361L11.998 10.7361L10.998 11.2361V20H12.998V11.2361ZM14.998 14V16H18.998V14H14.998Z"></path></svg>
                        </div>
                        <p className='text-2xl sm:text-4xl text-snitch-text font-bold'>{sellerProducts.length}</p>
                    </div>

                    <div className='bg-snitch-surface p-4 sm:p-5 flex flex-col justify-between gap-3 rounded-xl border border-snitch-border/40 shadow-sm'>
                        <div className='flex justify-between items-center text-snitch-text-muted text-xs sm:text-sm'>
                            <h4 className='uppercase tracking-wider font-bold'>Drafts</h4>
                            <svg className='w-5 h-5 shrink-0 text-snitch-text-muted' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2C20.5523 2 21 2.44772 21 3V6.757L19 8.757V4H5V20H19V17.242L21 15.242V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20ZM21.7782 8.80761L23.1924 10.2218L15.4142 18L13.9979 17.9979L14 16.5858L21.7782 8.80761ZM13 12V14H8V12H13ZM16 8V10H8V8H16Z"></path></svg>
                        </div>
                        <p className='text-2xl sm:text-4xl text-snitch-text font-bold'>{drafts.length}</p>
                    </div>

                    <div className='bg-snitch-surface p-4 sm:p-5 flex flex-col justify-between gap-3 rounded-xl border border-snitch-border/40 shadow-sm'>
                        <div className='flex justify-between items-center text-snitch-text-muted text-xs sm:text-sm'>
                            <h4 className='uppercase tracking-wider font-bold'>Stocks Left</h4>
                            <svg className='w-5 h-5 shrink-0 text-snitch-text-muted' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path></svg>
                        </div>
                        <p className='text-2xl sm:text-4xl text-snitch-text font-bold'>{totalStocks}</p>
                    </div>
                </div>


                <div className='flex flex-col lg:flex-row gap-6'>
                    <div className='w-full lg:w-2/3 bg-snitch-surface rounded-xl overflow-hidden border border-snitch-border/40 shadow-sm'>
                        <div className='bg-cover bg-center w-full min-h-[280px] sm:min-h-[340px] p-6 sm:p-8 flex flex-col justify-end gap-3 relative' style={{backgroundImage:'linear-gradient(to top, rgba(10,14,20,0.9), rgba(10,14,20,0.4)), url(https://images.unsplash.com/photo-1727515192207-3dc860bfd773?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
                            <h3 className='font-bold uppercase text-xl sm:text-2xl font-snitch-display text-white'>Expand The Collection</h3>
                            <p className='text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed'>Introducing the fall/winter curation. Showcase your newest signature pieces to our global network of elite collectors.</p>
                            <Link className='btn px-5 py-3 text-xs font-bold uppercase w-fit mt-2' to={'/seller/create-product'}>+ Add New Product</Link>
                        </div>
                    </div>

                    <div className='w-full lg:w-1/3 flex flex-col sm:flex-row lg:flex-col gap-4 justify-between'>
                        <div className='bg-snitch-surface p-5 rounded-xl border border-snitch-border/40 flex flex-col gap-2 flex-1 shadow-sm'>
                            <p className='italic font-snitch-display text-sm sm:text-base text-snitch-text'>"Dress shabbily and they remember the dress; dress impeccably and they remember the woman." </p>
                            <p className='text-right text-snitch-text-muted italic text-xs'>~ Coco Chanel</p>
                        </div>
                        <div className='bg-snitch-surface p-5 rounded-xl border border-snitch-border/40 flex flex-col gap-3 flex-1 justify-center shadow-sm'>
                            <p className='font-light uppercase text-xs text-snitch-text-muted tracking-wider font-bold'>Inventory Management</p>
                            <Link to={'/seller/all-products'} className='flex items-center justify-center gap-3 text-xs px-4 py-3 bg-snitch-bg hover:bg-snitch-card text-snitch-text uppercase transition-colors rounded-full border border-snitch-border/60 text-center font-bold'>
                                <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg>
                                Edit Existing Products
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col gap-6 pt-4'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h2 className='uppercase text-xl sm:text-2xl font-snitch-display text-snitch-text font-bold'>Recent Inventory</h2>
                            <p className='text-snitch-text-muted text-xs sm:text-sm'>Manage your published and draft collections</p>
                        </div>
                        <Link className='py-2 px-4 btn text-xs font-bold uppercase' to={'/seller/all-products'}>View All →</Link>
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                        {sellerProducts.slice(-4).map((product, idx) =>(
                            <div key={idx} className='bg-snitch-surface rounded-xl overflow-hidden border border-snitch-border/40 flex flex-col cursor-pointer hover:scale-[1.02] transition-all group shadow-sm' onClick={()=>{navigate(`/seller/product/${product._id}`)}}>
                                <div className='relative w-full h-48 sm:h-60 overflow-hidden bg-snitch-card'>
                                    <img className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500' src={product.images[0]?.url} alt={product.title} />
                                    <p className='absolute text-[10px] uppercase right-2 top-2 bg-snitch-dark-hero/90 backdrop-blur-md px-2 py-0.5 rounded text-white font-medium'>{product.type || 'Published'}</p>                                
                                </div>
                                <div className='p-3 flex flex-col gap-1 justify-between flex-1 font-mono'>
                                    <p className='font-bold text-xs sm:text-sm text-snitch-text line-clamp-1'>{product.title}</p>
                                    <div className='flex items-center gap-1 text-snitch-text-muted text-xs font-semibold'>
                                        <span>{product.price.currency}</span>
                                        <span className='text-snitch-text font-bold'>{product.price.amount}</span>
                                    </div>
                                </div>
                            </div>
                        ) )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard
