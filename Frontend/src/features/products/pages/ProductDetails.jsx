/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router'
import { useProduct } from '../hooks/useProduct'
import Navbar from '../../auth/components/Navbar'
import Loading from '../../auth/pages/Loading'
import Footer from '../../auth/components/Footer'

const ProductDetails = () => {

    const {productId} = useParams()
    const [product, setProduct] = useState({});
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [discountData, setDiscountData] = useState({ finalAmt: 0, discount: 0 });
    const { handleGetProductById } = useProduct()

    async function getProduct() {
        const data = await handleGetProductById(productId)
        setProduct(data)
    }

    function convertCurrency(name){
        switch(name){
            case 'INR': return '₹'
            case 'USD': return '$'
            case 'EUR': return '€'
            case 'JBP': return '£'
            default: return '₹'
        }
    }

    function isEmpty(obj) {
        for (let key in obj) {
            if (Object.hasOwn(obj, key)) return false;
        }
        return true;
    }

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    function applyDiscount(amount){
        const discounts = [5, 10, 15, 20]; // more realistic
        const discount = discounts[Math.floor(Math.random() * discounts.length)];

        const finalAmt = Math.round(amount * (1 - discount / 100));

        return { finalAmt, discount };
    }
    
    useEffect(()=>{
        getProduct()
    },[productId])

    useEffect(() => {
        if (product.price && product.price.amount) {
            const discount = applyDiscount(product.price.amount);
            setDiscountData(discount);
        }
    }, [product.price?.amount])

    if(isEmpty(product)){
        return <Loading/>
    }

    console.log(product)

    return (
        <div className='text-white h-screen'>
            <Navbar/>
            <div className='w-full h-full py-15 px-2 lg:px-10 font-extralight'>
                <div className='flex flex-col lg:flex-row h-full'>
                    <div className='w-full lg:w-3/5 h-full flex items-center justify-center relative bg-snitch-surface/60'>
                        {product.images && product.images.length > 0 && (
                            <>
                                {product.images.length > 1 && (
                                    <div className='h-full py-4 px-3 flex flex-col gap-3 overflow-y-auto'>
                                        {product.images.map((img, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => setCurrentImageIndex(idx)}
                                                className='shrink-0 cursor-pointer relative group'
                                            >
                                                <img
                                                    src={img.url}
                                                    alt={`Thumbnail ${idx}`}
                                                    className={`h-20 w-20 object-cover rounded transition-all ${
                                                        idx === currentImageIndex
                                                            ? 'border-2 border-white'
                                                            : 'opacity-60 group-hover:opacity-90'
                                                    }`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                <div className='flex-1 h-full flex items-center justify-center relative' onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                                    <img 
                                        className='w-full h-full object-contain' 
                                        src={product.images[currentImageIndex].url} 
                                        alt={`Product ${currentImageIndex}`}
                                    />
                                    
                                    {product.images.length > 1 && isHovering && (
                                        <>
                                            <button
                                                onClick={handlePrevImage}
                                                className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full p-3 transition'
                                            >
                                                ❮
                                            </button>
                                            <button
                                                onClick={handleNextImage}
                                                className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full p-3 transition'
                                            >
                                                ❯
                                            </button>
                                            
                                            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 px-4 py-2 rounded'>
                                                {currentImageIndex + 1} / {product.images.length}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    <div className='w-full lg:w-2/5 h-full flex flex-col overflow-auto gap-10 px-5 py-5 lg:py-0 lg:px-10'>
                        <div className='flex flex-col gap-5'>
                            <p className='uppercase tracking-[4px] text-snitch-text-muted'>Snitch Atelier</p>
                            <p className='text-5xl font-snitch-display'>{product.title}</p>
                            <div className='flex items-center justify-between'>
                                <div className='flex gap-3 items-center'>
                                    <div className='flex gap-1 text-white text-2xl'>
                                        <p>{convertCurrency(product.price.currency)}</p>
                                        <p>{discountData.finalAmt}</p>
                                    </div>
                                    <strike className='flex gap-1'>
                                        <p>{convertCurrency(product.price.currency)}</p>
                                        <p className=''>{product.price.amount}</p>
                                    </strike>
                                    <p className='text-xl text-snitch-success'>({discountData.discount}% OFF)</p>
                                </div>
                                <p className='text-snitch-text-muted text-sm'>VAT INCLUDED</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='text-snitch-text-muted flex-col flex gap-2'>
                                <h3 className='text-sm text-white tracking-widest'>COLOR</h3>
                                <div className='flex flex-col gap-1 px-3 w-fit items-center'>
                                    <div className='w-8 h-8 rounded-full border border-white' style={{backgroundColor:product.color.swatch}} />
                                    <p className='text-xs'>{product.color.name}</p>
                                </div>
                            </div>
                            <div className='text-sm flex flex-col gap-1'>
                                <h3 className='tracking-widest'>SIZE</h3>
                                <div className='flex gap-2 '>
                                    {product.sizes[0].split(',').map((s,i)=>(
                                        <div className='p-5 cursor-pointer hover:bg-snitch-surface rounded' key={i}>
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <button className='btn p-4'>Add to cart</button>
                            <button className='p-4 cursor-pointer transition-all hover:scale-105 border border-snitch-border rounded-lg'>BUY NOW</button>
                        </div>

                        <div className='w-full border-b border-snitch-border/20 my-2' />

                        <div className='flex flex-col gap-4'>
                            <h5 className='uppercase tracking-widest text-sm text-snitch-text-muted'>Seller Information</h5>
                            <div className='flex gap-4'>
                                <div className='p-3 bg-snitch-card rounded-xl flex items-center justify-center'>
                                    <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598L12 1ZM12 3.04879L5 4.60434V13.7889C5 15.1263 5.6684 16.3752 6.7812 17.1171L12 20.5963L17.2188 17.1171C18.3316 16.3752 19 15.1263 19 13.7889V4.60434L12 3.04879ZM16.4524 8.22183L17.8666 9.63604L11.5026 16L7.25999 11.7574L8.67421 10.3431L11.5019 13.1709L16.4524 8.22183Z"></path></svg>
                                </div>
                                <div>
                                    <p className='font-snitch-display'>{product.seller.fullname} </p>
                                    <p className='text-xs uppercase text-snitch-text-muted'>Authorised Curator</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 text-snitch-text-muted'>
                                <svg className='w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path></svg>
                                <p className='text-xs'>{product.seller.email}</p>
                            </div>
                            <div className='flex items-center gap-3 text-snitch-text-muted'>
                                <svg className='w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"></path></svg>
                                <p className='text-xs'>+91 {product.seller.contact}</p>
                            </div>
                        </div>

                        <div className='w-full border-b border-snitch-border/20 my-2' />

                        <div className='text-snitch-text-muted'>
                            <i>"{product.description}"</i>
                        </div>
                    
                        <div className='flex flex-col gap-1'>
                            <h4 className='tracking-widest'>DELIVERY & RETURNS</h4>
                            <p className='text-snitch-text-muted text-sm'>Complimentary express shipping on all orders. Returns accepted within 14 days of delivery.</p>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
