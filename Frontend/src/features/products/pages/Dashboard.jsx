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
                totalStock += variant.stock
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
        <div className='bg-snitch-bg w-screen flex px-5 lg:px-0 py-20 justify-center text-white'>
            <SellerHeader/>  
            <div className='lg:w-2/3 flex flex-col gap-12'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-4xl font-snitch-display'>Dashboard</h1>
                    <p className='text-sm text-snitch-text-muted'>Manage your shop's inventory and performance at a glance through our curated digital atelier.</p>
                </div>

                <div className='flex justify-between flex-wrap gap-4'>
                    <div className='bg-snitch-surface w-43 lg:w-55 p-5 flex flex-col gap-3 rounded'>
                        <div className='flex justify-between text-snitch-text-muted text-sm'>
                            <h4 className='uppercase'>Expected SAles</h4>
                            <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.00488 3.00275H21.0049C21.5572 3.00275 22.0049 3.45046 22.0049 4.00275V20.0027C22.0049 20.555 21.5572 21.0027 21.0049 21.0027H3.00488C2.4526 21.0027 2.00488 20.555 2.00488 20.0027V4.00275C2.00488 3.45046 2.4526 3.00275 3.00488 3.00275ZM4.00488 5.00275V19.0027H20.0049V5.00275H4.00488ZM8.50488 14.0027H14.0049C14.281 14.0027 14.5049 13.7789 14.5049 13.5027C14.5049 13.2266 14.281 13.0027 14.0049 13.0027H10.0049C8.62417 13.0027 7.50488 11.8835 7.50488 10.5027C7.50488 9.12203 8.62417 8.00275 10.0049 8.00275H11.0049V6.00275H13.0049V8.00275H15.5049V10.0027H10.0049C9.72874 10.0027 9.50488 10.2266 9.50488 10.5027C9.50488 10.7789 9.72874 11.0027 10.0049 11.0027H14.0049C15.3856 11.0027 16.5049 12.122 16.5049 13.5027C16.5049 14.8835 15.3856 16.0027 14.0049 16.0027H13.0049V18.0027H11.0049V16.0027H8.50488V14.0027Z"></path></svg>
                        </div>
                        <p className='text-4xl text-snitch-success'>{totalPrice}</p>
                    </div>

                    <div className='bg-snitch-surface w-43 lg:w-55 p-5 flex flex-col gap-3 rounded'>
                        <div className='flex justify-between text-snitch-text-muted text-sm'>
                            <h4 className='uppercase'>Total Products</h4>
                            <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.99805 4V11L11.998 8.5L16.998 11V4H19.998C20.5503 4 20.998 4.44772 20.998 5V21C20.998 21.5523 20.5503 22 19.998 22H3.99805C3.44576 22 2.99805 21.5523 2.99805 21V5C2.99805 4.44772 3.44576 4 3.99805 4H6.99805ZM11.998 8L7.49805 3H16.498L11.998 8ZM12.998 11.2361L11.998 10.7361L10.998 11.2361V20H12.998V11.2361ZM14.998 14V16H18.998V14H14.998Z"></path></svg>
                        </div>
                        <p className='text-4xl text-snitch-success'>{sellerProducts.length}</p>
                    </div>

                    <div className='bg-snitch-surface w-43 lg:w-55 p-5 flex flex-col gap-3 rounded'>
                        <div className='flex justify-between text-snitch-text-muted text-sm'>
                            <h4 className='uppercase'>Drafts</h4>
                            <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2C20.5523 2 21 2.44772 21 3V6.757L19 8.757V4H5V20H19V17.242L21 15.242V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20ZM21.7782 8.80761L23.1924 10.2218L15.4142 18L13.9979 17.9979L14 16.5858L21.7782 8.80761ZM13 12V14H8V12H13ZM16 8V10H8V8H16Z"></path></svg>
                        </div>
                        <p className='text-4xl text-snitch-success'>{drafts.length}</p>
                    </div>

                    <div className='bg-snitch-surface w-43 lg:w-55 p-5 flex flex-col gap-3 rounded'>
                        <div className='flex justify-between text-snitch-text-muted text-sm'>
                            <h4 className='uppercase'>Stocks Left</h4>
                            <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path></svg>
                        </div>
                        <p className='text-4xl text-snitch-success'>{totalStocks}</p>
                    </div>
                </div>


                <div className='flex-col md:flex-row flex gap-10'>
                    <div className='w-full md:w-2/3 bg-snitch-surface rounded'>
                        <div className='bg-cover w-[90%] h-80 bg-top rounded p-8 flex flex-col gap-4 justify-end' style={{backgroundImage:'url(https://images.unsplash.com/photo-1727515192207-3dc860bfd773?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
                            <h3 className='font-bold uppercase text-2xl'>Expand The Collection</h3>
                            <p className='text-sm text-snitch-text-muted'>Introducing the fall/winter curation. Showcase your newest signature pieces to our global network of elite collectors.</p>
                            <Link className='btn px-4 py-2 w-fit' to={'/seller/create-product'}>+ Add New Product</Link>
                        </div>
                    </div>

                    <div className='w-full md:w-1/3 gap-5 flex md:flex-col justify-between'>
                        <div className='bg-snitch-card p-5 rounded flex flex-col gap-2'>
                            <p className='italic font-snitch-display'>"Dress shabbily and they remember the dress; dress impeccably and they remember the woman." </p>
                            <p className='text-right text-snitch-text-muted italic'>~ Coco Chanel</p>
                        </div>
                        <div className='bg-snitch-surface p-5 flex flex-col gap-4'>
                            <p className='font-extralight uppercase text-sm'>Inventory Management</p>
                            <button className='flex gap-4 justify-evenly text-xs px-4 py-4 bg-snitch-card uppercase'>
                                <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg>
                                Edit Existing products
                            </button>
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col gap-10'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h2 className='uppercase text-2xl'>Recent Inventory</h2>
                            <p className='text-snitch-text-muted text-sm'>Manage your published and draft collections</p>
                        </div>
                        <Link className='py-2 px-4 btn hidden md:block' to={'/seller/all-products'}>View all inventory →</Link>
                        <Link className='md:hidden' to={'/seller/all-products'}>
                            <svg className='w-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path></svg>
                        </Link>
                    </div>
                    <div className='flex justify-between flex-wrap w-full'>
                        {sellerProducts.slice(-4).map((product, idx) =>(
                            <div key={idx} className='w-45 md:w-55 flex flex-col gap-2 mt-5 transition-all hover:scale-105' onClick={()=>{navigate(`/seller/product/${product._id}`)}}>
                                <div className='relative'>
                                    <img className='w-full h-65 object-cover rounded object-top' src={product.images[0].url} alt="" />
                                    <p className='absolute text-xs uppercase right-2 top-2 bg-snitch-card/60 backdrop-blur-lg px-2 py-1 rounded'>{product.type}</p>                                
                                </div>
                                <div>
                                    <p className=' font-light'>{product.title}</p>
                                    <div className='flex gap-1 text-snitch-text-muted text-sm'>
                                        <p>{product.price.currency}</p>
                                        <p className='text-snitch-success'>{product.price.amount}</p>
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
