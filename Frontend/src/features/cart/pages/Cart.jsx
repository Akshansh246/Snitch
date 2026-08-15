/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux'
import {useCart} from '../hooks/useCart'
import { useEffect } from 'react'
import EmptyCart from '../components/EmptyCart'
import { Link, useNavigate } from 'react-router'
import { useRazorpay } from 'react-razorpay'

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items)
    const totalPrice = useSelector(state => state.cart.totalPrice)
    const user = useSelector(state => state.auth.user)
    const currency = useSelector(state => state.cart.currency)

    const navigate = useNavigate()

    const {Razorpay} = useRazorpay()
    const { handleGetCart, handleIncrementCartItem, handleDecrementCartItem, handleCreateCartOrder, handleVerifyCartOrder } = useCart()

    function convertCurrency(name){
        switch(name){
            case 'INR': return '₹'
            case 'USD': return '$'
            case 'EUR': return '€'
            case 'JBP': return '£'
            default: return '$'
        }
    }

    async function handleCheckout() {
        if (!user) {
            navigate('/login')
            return
        }
        navigate('/checkout')
    }

    useEffect(()=>{
        handleGetCart()
    },[])

    return (
        <div className='w-full min-h-screen text-snitch-text bg-snitch-bg overflow-x-hidden'>
            {(cartItems.length === 0)? <EmptyCart/> 
            :
            (<div className='w-full max-w-7xl mx-auto pt-24 pb-16 px-4 sm:px-8 lg:px-12 flex flex-col gap-6 sm:gap-8'>
                <div className='flex flex-col gap-2 border-b border-snitch-border/40 pb-4'>
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-snitch-display font-bold leading-tight text-snitch-text'>Your Bag</h1>
                    <p className='uppercase text-snitch-text-muted text-xs tracking-wider font-mono'>{cartItems.length} Item{(cartItems.length === 1)?'':'s'} — Curating your digital wardrobe</p>
                </div>

                <div className='flex flex-col lg:flex-row gap-8 items-start w-full'>
                    {/* Items List */}
                    <div className='flex w-full lg:w-2/3 flex-col gap-4'>
                        {cartItems.map((item, idx) => {
                            const imageSrc = (item.variant && item.variant.images && item.variant.images.length > 0)
                                ? item.variant.images[0].url
                                : item.product?.images?.[0]?.url;

                            return (    
                            <div className='flex flex-col sm:flex-row w-full p-4 gap-4 sm:gap-6 bg-snitch-surface rounded-2xl border border-snitch-border/40 shadow-sm' key={idx}>
                                <div className='w-full sm:w-36 h-48 sm:h-44 shrink-0 rounded-xl overflow-hidden bg-snitch-card'>
                                    <img className='w-full h-full object-cover object-top' src={imageSrc} alt={item.product?.title} />
                                </div>
                                <div className='flex w-full flex-col justify-between gap-3 font-mono'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex justify-between items-start gap-2'>
                                            <h3 className='text-base sm:text-lg font-snitch-display font-bold text-snitch-text line-clamp-1'>{item.product?.title}</h3>
                                            <p className='text-snitch-text font-bold text-sm sm:text-base whitespace-nowrap'>{convertCurrency(item.price?.currency)} {item.product?.price?.amount}</p>
                                        </div>
                                        <div className='text-xs flex flex-wrap gap-x-4 gap-y-1 text-snitch-text-muted uppercase tracking-wider'>
                                            <p>COLOR: <span className='text-snitch-text font-semibold'>{(item.variant)?(item.variant.attributes?.value):item.product?.color?.name}</span></p>
                                            <p>SIZE: <span className='text-snitch-text font-semibold'>{item.size}</span></p>
                                        </div>
                                        <p className='uppercase text-snitch-text-muted text-[11px] tracking-widest'>{(item.variant)? item.variant.stock : item.product?.stock} left in stock</p>
                                        {
                                            item.price?.amount !== item.product?.price?.amount && (
                                                <>
                                                    {
                                                        item.price?.amount > item.product?.price?.amount
                                                        ? <p className='text-[11px] tracking-wider text-snitch-success uppercase font-medium'>Hurray! You saved {item.price.amount-item.product.price.amount}/-</p>
                                                        : <p className='text-[11px] tracking-wider text-snitch-danger uppercase font-medium'>Price updated</p>
                                                    }
                                                </>
                                            )
                                        }
                                    </div>
                                    <div className='flex items-center justify-between pt-2 border-t border-snitch-border/30'>
                                        <div className='flex items-center border border-snitch-border rounded-full bg-snitch-bg overflow-hidden'>
                                            <button
                                            onClick={()=>{handleDecrementCartItem({ productId: item.product._id, variantId: (item.variant)?item.variant._id:null, size:item.size })}} 
                                            className='px-3 py-1 bg-snitch-surface text-xs font-semibold cursor-pointer hover:bg-snitch-card transition-colors text-snitch-text'
                                            >-</button>

                                            <span className='px-3 py-1 text-xs font-bold text-snitch-text'>{item.quantity}</span>
                                            
                                            <button 
                                            onClick={()=>{handleIncrementCartItem({ productId: item.product._id, variantId: (item.variant)?item.variant._id:null })}}
                                            className='px-3 py-1 bg-snitch-surface text-xs font-semibold cursor-pointer hover:bg-snitch-card transition-colors text-snitch-text'
                                            >+</button>
                                        </div>
                                        <button 
                                            onClick={()=>{handleDecrementCartItem({ productId: item.product._id, variantId: (item.variant)?item.variant._id:null, size:item.size, removeAll: true })}} 
                                            className='flex items-center gap-1 text-snitch-danger hover:opacity-80 text-xs cursor-pointer transition-opacity font-semibold'
                                        >
                                            <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path></svg>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )})}
                    </div>

                    {/* Order Summary */}
                    <div className='w-full lg:w-1/3 bg-snitch-surface p-6 rounded-2xl border border-snitch-border/40 flex flex-col gap-6 sticky top-24 shadow-sm'>
                        <h2 className='uppercase tracking-[4px] text-xs font-bold text-snitch-text font-mono'>Order Summary</h2>
                        <div className='flex flex-col gap-3 text-snitch-text-muted text-xs uppercase tracking-wider font-mono'>
                            <div className='flex justify-between items-center'>
                                <p>Subtotal</p>
                                <p className='text-base text-snitch-text font-bold'>{convertCurrency(currency)}{totalPrice}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p>Shipping</p>
                                <p className='text-xs italic text-snitch-success font-semibold'>Complimentary</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p>Duties & Taxes</p>
                                <p className='text-xs italic text-snitch-text-muted'>Included</p>
                            </div>
                        </div>
                        <div className='border-b border-snitch-border/40' />
                        <div className='flex justify-between items-center font-mono'>
                            <p className='text-sm uppercase font-bold text-snitch-text'>Total Amount</p>
                            <p className='text-xl text-snitch-text font-bold'>{convertCurrency(currency)}{totalPrice}</p>
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                            <button 
                            onClick={handleCheckout}
                            className='btn py-3.5 text-xs font-bold uppercase tracking-widest w-full text-center'
                            >Proceed To Checkout</button>
                            <Link className='py-3 border border-snitch-border rounded-full text-center text-xs uppercase tracking-wider text-snitch-text-muted hover:text-snitch-text hover:border-snitch-text transition-colors font-mono' to={'/home'}>Continue Shopping</Link>
                        </div>
                        <div className='flex gap-2 justify-center items-center text-[11px] text-snitch-text-muted pt-2 border-t border-snitch-border/30 font-mono'>
                            <svg className='w-4 h-4 text-snitch-text-muted shrink-0' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.0049 2L18.3032 4.28071C18.7206 4.41117 19.0049 4.79781 19.0049 5.23519V7H21.0049C21.5572 7 22.0049 7.44772 22.0049 8V10H9.00488V8C9.00488 7.44772 9.4526 7 10.0049 7H17.0049V5.97L11.0049 4.094L5.00488 5.97V13.3744C5.00488 14.6193 5.58406 15.7884 6.56329 16.5428L6.75154 16.6793L11.0049 19.579L14.7869 17H10.0049C9.4526 17 9.00488 16.5523 9.00488 16V12H22.0049V16C22.0049 16.5523 21.5572 17 21.0049 17L17.7848 17.0011C17.3982 17.5108 16.9276 17.9618 16.3849 18.3318L11.0049 22L5.62486 18.3318C3.98563 17.2141 3.00488 15.3584 3.00488 13.3744V5.23519C3.00488 4.79781 3.28913 4.41117 3.70661 4.28071L11.0049 2Z"></path></svg>
                            <p>Secure payments by RazorPay</p>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default Cart
