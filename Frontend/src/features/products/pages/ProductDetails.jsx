/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useProduct } from '../hooks/useProduct'
import Loading from '../../auth/pages/Loading'
import { useCart } from '../../cart/hooks/useCart'
import { toast } from 'react-toastify'
import { useRazorpay } from 'react-razorpay'
import { getFixedDiscount } from '../utils/discount.utils'
import { toggleWishlistProduct } from '../states/wishlist.slice'

const ProductDetails = () => {

    const { handleAddItem, handleCreateBuyNowOrder, handleVerifyCartOrder } = useCart()
    const { productId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { Razorpay } = useRazorpay()

    const user = useSelector(state => state.auth.user)
    const wishlistItems = useSelector(state => state.wishlist?.items || [])

    const [product, setProduct] = useState({});
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [discountData, setDiscountData] = useState({ finalAmt: 0, discount: 0 });
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [size, setSize] = useState(null);
    const { handleGetProductById } = useProduct()

    const isWishlisted = wishlistItems.some(item => (item._id || item.id) === product?._id)

    async function getProduct() {
        const data = await handleGetProductById(productId)
        setProduct(data)
    }

    async function handleBuyNow() {
        if (!user) {
            toast.info('Please sign in to proceed with checkout.')
            navigate('/login')
            return
        }
        if (!size) {
            toast.warn('Please select a size first.')
            return
        }
        if (!user?.address?.street?.trim() || !user?.address?.city?.trim() || !user?.address?.zipcode?.trim()) {
            toast.warn('Please complete your shipping address before placing an order.')
        }
        navigate('/checkout', {
            state: {
                buyNowData: {
                    product,
                    selectedVariant,
                    size
                }
            }
        })
    }

    function convertCurrency(name){
        switch(name){
            case 'INR': return '₹'
            case 'USD': return '$'
            case 'EUR': return '€'
            case 'JBP': return '£'
            default: return '$'
        }
    }

    function isEmpty(obj) {
        for (let key in obj) {
            if (Object.hasOwn(obj, key)) return false;
        }
        return true;
    }

    const activeImages = selectedVariant && selectedVariant.images && selectedVariant.images.length > 0
        ? selectedVariant.images
        : (product.images || []);

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? activeImages.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === activeImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleVariantSelect = (variant) => {
        if (selectedVariant && selectedVariant._id === variant._id) {
            setSelectedVariant(null);
        } else {
            setSelectedVariant(variant);
        }
        setCurrentImageIndex(0);
    };

    useEffect(() => {
        getProduct()
    }, [productId])

    const activePrice = (selectedVariant && selectedVariant.price && selectedVariant.price.amount)
        ? selectedVariant.price
        : product.price;

    useEffect(() => {
        if (activePrice && activePrice.amount) {
            const discount = getFixedDiscount(product._id || productId, activePrice.amount);
            setDiscountData(discount);
        }
    }, [activePrice?.amount, product?._id, productId])

    if(isEmpty(product)){
        return <Loading/>
    }

    const sizesList = typeof product.sizes?.[0] === 'string'
        ? product.sizes[0].split(',').map(s => s.trim()).filter(Boolean)
        : (product.sizes || []);

    return (
        <div className='text-snitch-text min-h-screen bg-snitch-bg w-full overflow-x-hidden'>
            <div className='w-full pt-24 pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto'>
                <div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
                    {/* Gallery Container */}
                    <div className='w-full lg:w-3/5 flex flex-col-reverse lg:flex-row gap-4 bg-snitch-surface p-4 rounded-2xl border border-snitch-border/40 shadow-sm'>
                        {activeImages.length > 1 && (
                            <div className='flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-none lg:max-h-[500px] shrink-0 py-2 lg:py-0'>
                                {activeImages.map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className='shrink-0 cursor-pointer relative group'
                                    >
                                        <img
                                            src={img.url}
                                            alt={`Thumbnail ${idx}`}
                                            className={`h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-xl transition-all ${
                                                idx === currentImageIndex
                                                    ? 'border-2 border-snitch-text opacity-100 scale-105'
                                                    : 'opacity-60 group-hover:opacity-100'
                                            }`}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        <div className='flex-1 min-h-[320px] sm:min-h-[450px] lg:min-h-[520px] flex items-center justify-center relative rounded-xl overflow-hidden bg-snitch-card/50'>
                            <img 
                                className='w-full h-full max-h-[550px] object-contain' 
                                src={activeImages[currentImageIndex]?.url} 
                                alt={`Product ${currentImageIndex}`}
                            />
                            
                            {activeImages.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrevImage}
                                        className='absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black text-white rounded-full w-10 h-10 flex items-center justify-center transition cursor-pointer z-10'
                                        aria-label="Previous image"
                                    >
                                        ❮
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className='absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black text-white rounded-full w-10 h-10 flex items-center justify-center transition cursor-pointer z-10'
                                        aria-label="Next image"
                                    >
                                        ❯
                                    </button>
                                    
                                    <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/70 text-xs px-3 py-1 rounded-full text-white font-mono'>
                                        {currentImageIndex + 1} / {activeImages.length}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Details Container */}
                    <div className='w-full lg:w-2/5 flex flex-col gap-6'>
                        <div className='flex flex-col gap-3'>
                            <p className='uppercase tracking-[4px] text-xs font-semibold text-snitch-text-muted'>Snitch Atelier</p>
                            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-snitch-display font-bold leading-tight text-snitch-text'>{product.title}</h1>
                            <div className='flex items-center justify-between flex-wrap gap-2 pt-2 font-mono'>
                                <div className='flex gap-3 items-baseline'>
                                    <div className='flex gap-1 text-snitch-text text-2xl font-bold'>
                                        <span>{convertCurrency(activePrice?.currency)}</span>
                                        <span>{discountData.finalAmt}</span>
                                    </div>
                                    <strike className='flex gap-1 text-snitch-text-muted text-sm'>
                                        <span>{convertCurrency(activePrice?.currency)}</span>
                                        <span>{activePrice?.amount}</span>
                                    </strike>
                                    <span className='text-sm text-snitch-success font-semibold'>({discountData.discount}% OFF)</span>
                                </div>
                                <span className='text-snitch-text-muted text-xs tracking-widest uppercase'>VAT INCLUDED</span>
                            </div>
                        </div>

                        <div className='flex flex-col gap-5 border-t border-b border-snitch-border/40 py-6'>
                            {/* Base color */}
                            {product.color && (
                                <div className='flex flex-col gap-2'>
                                    <h3 className='text-xs uppercase text-snitch-text tracking-widest font-bold font-mono'>COLOR</h3>
                                    <div className='flex gap-2 items-center'>
                                        <div className='w-6 h-6 rounded-full border border-black/30' style={{backgroundColor: product.color.swatch}} />
                                        <span className='text-xs text-snitch-text capitalize font-medium'>{product.color.name}</span>
                                    </div>
                                </div>
                            )}

                            {/* Variants */}
                            {product.variants && product.variants.length > 0 && (
                                <div className='flex flex-col gap-3'>
                                    <h3 className='text-xs uppercase text-snitch-text tracking-widest font-bold font-mono'>VARIANTS</h3>
                                    <div className='flex flex-wrap gap-2.5'>
                                        {product.variants.map((variant) => {
                                            const isSelected = selectedVariant && selectedVariant._id === variant._id;
                                            const thumbUrl = variant.images && variant.images.length > 0
                                                ? variant.images[0].url
                                                : null;
                                            const attrs = variant.attributes
                                                ? Object.entries(variant.attributes)
                                                : [];
                                            return (
                                                <button
                                                    key={variant._id}
                                                    onClick={() => handleVariantSelect(variant)}
                                                    className={`flex flex-col gap-1.5 p-2 rounded-xl border transition-all w-24 text-left cursor-pointer ${
                                                        isSelected
                                                            ? 'border-snitch-text bg-snitch-card scale-105 shadow-md'
                                                            : 'border-snitch-border/40 bg-snitch-surface hover:border-snitch-border'
                                                    }`}
                                                >
                                                    {thumbUrl ? (
                                                        <div className='relative w-full aspect-square rounded-lg overflow-hidden'>
                                                            <img
                                                                src={thumbUrl}
                                                                alt='Variant thumbnail'
                                                                className='w-full h-full object-cover'
                                                            />
                                                            {isSelected && (
                                                                <div className='absolute inset-0 bg-black/20 flex items-center justify-center'>
                                                                    <svg className='w-4 h-4 text-white drop-shadow' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
                                                                        <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/>
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className='w-full aspect-square rounded-lg bg-snitch-card flex items-center justify-center text-[10px] text-snitch-text-muted'>
                                                            Option
                                                        </div>
                                                    )}
                                                    <div className='flex flex-col gap-0.5 font-mono'>
                                                        {attrs.length > 0 ? attrs.map(([key, val]) => (
                                                            <span key={key} className='text-[10px] text-snitch-text-muted truncate'>
                                                                <span className='text-snitch-text font-semibold'>{val}</span>
                                                            </span>
                                                        )) : (
                                                            <p className='text-[10px] text-snitch-text-muted'>Variant</p>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Size selector */}
                            {sizesList.length > 0 && (
                                <div className='flex flex-col gap-2'>
                                    <h3 className='text-xs uppercase text-snitch-text tracking-widest font-bold font-mono'>SELECT SIZE</h3>
                                    <div className='flex flex-wrap gap-2'>
                                        {sizesList.map((s, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSize(prev => prev === s ? null : s)}
                                                className={`min-w-[48px] px-4 py-2.5 text-xs font-semibold cursor-pointer rounded-full border transition-all ${
                                                    size === s
                                                        ? 'bg-snitch-text text-snitch-bg border-snitch-text shadow-md'
                                                        : 'border-snitch-border/60 hover:border-snitch-text text-snitch-text bg-snitch-surface'
                                                }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* CTA Buttons */}
                        <div className='flex flex-col sm:flex-row items-center gap-3'>
                            <button
                                className={`btn py-4 flex-1 text-center text-xs font-bold tracking-widest uppercase transition-all ${!size ? 'opacity-40 cursor-not-allowed' : 'hover:scale-[1.01]'}`}
                                disabled={!size}
                                onClick={() => {
                                    if (!user) {
                                        toast.info('Please sign in to add items to your bag.')
                                        navigate('/login')
                                        return
                                    }
                                    handleAddItem({
                                        productId: product._id,
                                        ...(selectedVariant && { variantId: selectedVariant._id }),
                                        size
                                    })
                                    toast.success('Product added to bag successfully!')
                                }}
                            >
                                {size ? 'Add to Bag' : 'Select Size'}
                            </button>

                            <button
                                className={`py-4 px-6 rounded-full bg-snitch-dark-hero text-white border border-black text-xs font-bold tracking-widest uppercase transition-all shadow-md ${!size ? 'opacity-40 cursor-not-allowed' : 'hover:scale-[1.02] cursor-pointer'}`}
                                disabled={!size}
                                onClick={handleBuyNow}
                            >
                                Buy Now →
                            </button>

                            <button 
                                onClick={() => {
                                    dispatch(toggleWishlistProduct(product))
                                    toast.info(isWishlisted ? 'Removed from Wishlist' : 'Saved to Wishlist!')
                                }}
                                className={`p-3.5 rounded-full border transition-all cursor-pointer ${
                                    isWishlisted ? 'bg-red-50 text-red-500 border-red-200' : 'bg-snitch-surface text-snitch-text border-snitch-border hover:border-snitch-text'
                                }`}
                                title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
                            >
                                <svg className={`w-5 h-5 ${isWishlisted ? 'fill-current' : 'fill-none stroke-current stroke-2'}`} viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                            </button>
                        </div>

                        {/* Delivery Location & Timeline Widget */}
                        <div className='flex flex-col gap-3 p-4 bg-snitch-surface rounded-2xl border border-snitch-border/40 font-mono shadow-xs mt-2'>
                            <div className='flex justify-between items-center border-b border-snitch-border/30 pb-2'>
                                <div className='flex items-center gap-2'>
                                    <svg className='w-4 h-4 text-snitch-text' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                    </svg>
                                    <span className='text-xs uppercase font-bold text-snitch-text tracking-wider'>Deliver To Location</span>
                                </div>
                                <button 
                                    onClick={() => {
                                        if (!user) {
                                            navigate('/login')
                                        } else {
                                            navigate('/checkout', { state: { buyNowData: { product, selectedVariant, size: size || 'M' } } })
                                        }
                                    }} 
                                    className='text-[11px] font-bold text-snitch-text underline hover:opacity-70 transition-opacity'
                                >
                                    {user?.address?.city ? 'Change' : '+ Add Address'}
                                </button>
                            </div>

                            {user?.address?.city ? (
                                <div className='flex flex-col gap-1 text-xs'>
                                    <p className='font-bold text-snitch-text truncate'>
                                        {user.address.street ? `${user.address.street}, ` : ''}{user.address.city}, {user.address.state || ''} {user.address.zipcode || ''}
                                    </p>
                                    <div className='flex items-center gap-2 pt-1'>
                                        <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
                                        <span className='text-[11px] text-emerald-800 font-bold uppercase tracking-wider'>
                                            Express Delivery in 8–10 Days
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex flex-col gap-1.5 text-xs text-snitch-text-muted'>
                                    <p className='italic'>No saved shipping address added yet.</p>
                                    <p className='text-[10px] text-red-500 font-semibold uppercase tracking-wider'>
                                        ⚠️ Address required to place orders.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Seller Information */}
                        {product.seller && (
                            <div className='flex flex-col gap-3 p-4 bg-snitch-surface rounded-xl border border-snitch-border/40 mt-2'>
                                <h5 className='uppercase tracking-widest text-xs text-snitch-text-muted font-bold font-mono'>Curator Details</h5>
                                <div className='flex items-center gap-3'>
                                    <div className='p-2.5 bg-snitch-card rounded-xl flex items-center justify-center text-snitch-text'>
                                        <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598L12 1ZM12 3.04879L5 4.60434V13.7889C5 15.1263 5.6684 16.3752 6.7812 17.1171L12 20.5963L17.2188 17.1171C18.3316 16.3752 19 15.1263 19 13.7889V4.60434L12 3.04879ZM16.4524 8.22183L17.8666 9.63604L11.5026 16L7.25999 11.7574L8.67421 10.3431L11.5019 13.1709L16.4524 8.22183Z"></path></svg>
                                    </div>
                                    <div>
                                        <p className='font-snitch-display text-sm font-semibold text-snitch-text'>{product.seller.fullname}</p>
                                        <p className='text-[10px] uppercase text-snitch-text-muted font-mono'>Authorised Atelier Curator</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className='text-snitch-text-muted text-xs italic leading-relaxed pt-2'>
                            "{product.description}"
                        </div>
                    
                        <div className='flex flex-col gap-1 text-xs text-snitch-text-muted pt-2 border-t border-snitch-border/30'>
                            <h4 className='tracking-widest uppercase text-snitch-text font-bold text-[11px] font-mono'>DELIVERY & RETURNS</h4>
                            <p className='leading-relaxed'>Complimentary express shipping on all orders. Returns accepted within 14 days of delivery.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
