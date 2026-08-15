import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct'
import { useNavigate } from 'react-router'
import { getFixedDiscount } from '../utils/discount.utils'

const HomePage = () => {
    
    const { handleGetAllProducts } = useProduct()
    const products = useSelector(state => state.product.products)
    const navigate = useNavigate()
    const [wishlist, setWishlist] = useState({})
    const [sortOption, setSortOption] = useState('newest')

    const toggleWishlist = (e, id) => {
        e.stopPropagation()
        setWishlist(prev => ({ ...prev, [id]: !prev[id] }))
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

    useEffect(()=>{
        handleGetAllProducts()
    },[])

    // Filter products created within the last 5 days (or fallback to top recent products)
    const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    let filteredProducts = products.filter(product => {
        if (!product.createdAt) return true
        return new Date(product.createdAt) >= fiveDaysAgo
    })

    if (filteredProducts.length === 0) {
        filteredProducts = products
    }

    if (sortOption === 'oldest') {
        filteredProducts = [...filteredProducts].reverse()
    }

    return (
        <div className='w-full min-h-screen bg-snitch-bg text-snitch-text pt-24 pb-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto font-mono'>
            <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12 border-b border-snitch-border/40 pb-6'>
                <div className='flex flex-col gap-1'>
                    <div className='flex items-center gap-2'>
                        <span className='px-2.5 py-0.5 bg-snitch-dark-hero text-white text-[10px] uppercase font-bold tracking-widest rounded-full'>New Drop</span>
                        <p className='uppercase text-xs tracking-[4px] text-snitch-text-muted font-semibold'>Last 5 Days Collection</p>
                    </div>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-snitch-display font-bold leading-tight text-snitch-text'>The Silhouette Of Silence</h1>
                </div>
                <div className='uppercase self-end sm:self-auto'>
                    <select 
                        name="sort" 
                        id="sort" 
                        value={sortOption}
                        onChange={e => setSortOption(e.target.value)}
                        className='bg-snitch-surface text-snitch-text text-xs px-4 py-2 rounded-full border border-snitch-border focus:outline-none cursor-pointer font-bold'
                    >
                        <option value="newest">Sort: Newest</option>
                        <option value="oldest">Sort: Oldest</option>
                    </select>
                </div>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
                {filteredProducts.map((product, idx) => {
                    const { finalAmt, discount } = getFixedDiscount(product._id, product.price.amount)
                    return (
                        <div 
                            onClick={() => {navigate(`/product/${product._id}`)}} 
                            key={product._id || idx} 
                            className='bg-snitch-surface cursor-pointer rounded-xl overflow-hidden hover:shadow-lg transition-all border border-snitch-border/40 flex flex-col group relative'
                        >
                            <div className='w-full h-52 sm:h-72 md:h-80 overflow-hidden bg-snitch-card relative'>
                                <img className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500' src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=700'} alt={product.title} />
                                
                                {/* Wishlist Heart Icon overlay (Matching reference image) */}
                                <button 
                                    onClick={(e) => toggleWishlist(e, product._id || idx)}
                                    className='absolute top-3 right-3 text-snitch-text/80 hover:text-red-500 transition-colors p-1 cursor-pointer z-10'
                                    aria-label="Wishlist"
                                >
                                    <svg className={`w-5 h-5 ${wishlist[product._id || idx] ? 'fill-red-500 text-red-500' : 'fill-none stroke-current'}`} viewBox="0 0 24 24" strokeWidth="2">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                    </svg>
                                </button>
                            </div>

                            <div className='p-3 sm:p-4 flex flex-col gap-2 flex-1 justify-between font-mono'>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex justify-between items-start gap-2'>
                                        <p className='text-xs sm:text-sm font-semibold text-snitch-text line-clamp-1 uppercase tracking-wider'>{product.title}</p>
                                        {product.color && (
                                            <div className='w-3 h-3 shrink-0 rounded-full border border-black/20 mt-1' style={{backgroundColor: product.color.swatch}} title={product.color.name} />
                                        )}
                                    </div>
                                    {product.color && (
                                        <p className='text-[10px] text-snitch-text-muted uppercase tracking-wider'>{product.color.name}</p>
                                    )}
                                </div>
                                <div className='flex items-center justify-between pt-2 border-t border-snitch-border/30 text-xs'>
                                    <div className='flex items-baseline gap-1 text-snitch-text font-bold'>
                                        <span>{convertCurrency(product.price.currency)}</span>
                                        <span>{finalAmt}</span>
                                    </div>
                                    <div className='flex items-center gap-1 text-[10px] text-snitch-text-muted'>
                                        <strike>
                                            {convertCurrency(product.price.currency)}{product.price.amount}
                                        </strike>
                                        <span className='text-snitch-success font-medium'>({discount}% OFF)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HomePage
