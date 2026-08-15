import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import Navbar from '../../shared/components/Navbar'
import { removeFromWishlist } from '../states/wishlist.slice'
import { useCart } from '../../cart/hooks/useCart'
import { toast } from 'react-toastify'

const WishlistPage = () => {
    const wishlistItems = useSelector(state => state.wishlist?.items || [])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { handleAddItem } = useCart()

    async function moveToCart(product) {
        try {
            await handleAddItem({
                productId: product._id || product.id,
                variantId: null,
                size: 'M'
            })
            dispatch(removeFromWishlist(product._id || product.id))
            toast.success(`${product.title || product.name} moved to Bag!`)
        } catch (err) {
            toast.error('Failed to move item to bag.')
        }
    }

    return (
        <div className='w-full min-h-screen bg-snitch-bg text-snitch-text font-mono overflow-x-hidden'>
            <Navbar />

            <div className='w-full max-w-7xl mx-auto pt-28 pb-20 px-4 sm:px-8 flex flex-col gap-8'>
                <div className='flex flex-col gap-2 border-b border-snitch-border/40 pb-4'>
                    <h1 className='text-4xl sm:text-5xl font-bold font-snitch-display text-snitch-text'>Your Wishlist</h1>
                    <p className='uppercase text-snitch-text-muted text-xs tracking-wider'>{wishlistItems.length} Saved Piece{(wishlistItems.length === 1)?'':'s'} — Curating your private wardrobe</p>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className='bg-snitch-surface p-12 rounded-2xl border border-snitch-border/40 flex flex-col items-center justify-center gap-4 text-center my-8'>
                        <svg className='w-12 h-12 text-snitch-text-muted' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <h3 className='text-xl font-bold font-snitch-display text-snitch-text'>Your Wishlist is Empty</h3>
                        <p className='text-xs text-snitch-text-muted max-w-md'>Explore our curated digital atelier and save your favorite garments for later.</p>
                        <Link to="/home" className='btn px-6 py-3 text-xs font-bold uppercase tracking-wider mt-2'>Explore Atelier</Link>
                    </div>
                ) : (
                    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {wishlistItems.map((item, idx) => {
                            const imageSrc = item.images?.[0]?.url || item.image || 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=700&auto=format&fit=crop'
                            const itemTitle = item.title || item.name || 'Atelier Garment'
                            const itemPrice = item.price?.amount ? `$${item.price.amount}` : item.price || '$999'

                            return (
                                <div key={idx} className='bg-snitch-surface rounded-2xl overflow-hidden border border-snitch-border/40 flex flex-col group shadow-sm'>
                                    <div className='w-full aspect-[3/4] bg-snitch-card relative overflow-hidden cursor-pointer' onClick={() => navigate(`/product/${item._id || item.id}`)}>
                                        <img src={imageSrc} alt={itemTitle} className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500' />
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); dispatch(removeFromWishlist(item._id || item.id)); }}
                                            className='absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md text-red-500 rounded-full hover:bg-white transition-colors cursor-pointer shadow-md'
                                            title="Remove from wishlist"
                                        >
                                            <svg className='w-4 h-4 fill-current' viewBox="0 0 24 24">
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                            </svg>
                                        </button>
                                    </div>

                                    <div className='p-4 flex flex-col gap-3 flex-1 justify-between'>
                                        <div className='flex flex-col gap-1'>
                                            <h3 className='font-bold text-sm text-snitch-text line-clamp-1'>{itemTitle}</h3>
                                            <p className='text-xs text-snitch-text-muted font-bold'>{itemPrice}</p>
                                        </div>

                                        <button 
                                            onClick={() => moveToCart(item)}
                                            className='btn w-full py-2.5 text-xs font-bold uppercase tracking-wider text-center'
                                        >
                                            Move to Bag
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default WishlistPage
