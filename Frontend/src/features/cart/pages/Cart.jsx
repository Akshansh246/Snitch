/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux'
import {useCart} from '../hooks/useCart'
import { useEffect } from 'react'
import EmptyCart from '../components/EmptyCart'
import { Link } from 'react-router'

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items)

    const { handleGetCart, handleIncrementCartItem } = useCart()

    function calculateTotalAmount(){
        let totalAmt = 0
        for(let item of cartItems){
            totalAmt += item.price.amount * item.quantity
        }

        return totalAmt
    }

    function applyDiscount(amount){
        const discounts = [5, 10, 15, 20]; 
        const discount = discounts[Math.floor(Math.random() * discounts.length)];

        const finalAmt = Math.round(amount * (1 - discount / 100));

        return { finalAmt, discount };
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

    useEffect(()=>{
        handleGetCart()
    },[])

    console.log(cartItems)

    return (
        <div className='w-screen h-screen text-white'>
            {(cartItems.length === 0)? <EmptyCart/> 
            :
            (<div className='w-full md:h-screen flex flex-col gap-5 py-15 px-5 md:px-10'>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-6xl font-snitch-display'>Your Bag</h1>
                    <p className='uppercase text-snitch-text-muted text-xs'>{cartItems.length} Item{(cartItems.length === 1)?'':'s'} - Curating your digital wardrobe</p>
                </div>
                <div className='flex-col md:flex-row flex gap-2 justify-between w-full md:h-130'>
                    <div className='flex w-full md:w-2/3 flex-col gap-2 md:overflow-auto'>
                        {cartItems.map((item, idx) => {
                            return (    
                            <div className='flex-col md:flex-row flex w-full p-4 gap-5 bg-snitch-surface' key={idx}>
                                <img className='h-65 md:w-45 md:h-55 object-cover' src={(item.variant)? item.variant.images[0].url : item.product.images[0].url} alt="" />
                                <div className='flex w-full flex-col gap-4 justify-between'>
                                    <div className='flex flex-col gap-4 md:gap-2'>
                                        <div className='flex justify-between'>
                                            <h3 className='md:text-xl'>{item.product.title}</h3>
                                            <p className='text-snitch-text-muted'>{convertCurrency(item.product.price.currency)} {item.product.price.amount}</p>
                                        </div>
                                        <div className='text-xs text-snitch-text-muted uppercase'>
                                            <p>COLOR: {(item.variant)?(item.variant.attributes.value):item.product.color.name}</p>
                                            <p>SIZE: {item.size}</p>
                                        </div>
                                        <p className='uppercase text-snitch-success text-xs tracking-widest'>{(item.variant)? item.variant.stock : item.product.stock} left in stock</p>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <button className='px-2 bg-snitch-neutral cursor-pointer'>-</button>
                                            <button className='px-2 bg-snitch-neutral'>{item.quantity}</button>
                                            <button 
                                            onClick={()=>{handleIncrementCartItem({ productId: item.product._id, variantId: (item.variant)?item.variant._id:null })}}
                                            className='px-2 bg-snitch-neutral cursor-pointer'
                                            >+</button>
                                        </div>
                                        <button className='flex gap-1 text-snitch-danger cursor-pointer'>
                                            <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path></svg>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )})}
                    </div>
                    <div className='w-full md:w-1/4 h-fit bg-snitch-card p-5 rounded flex flex-col gap-8'>
                        <h1 className='uppercase tracking-[5px]'>Order Summary</h1>
                        <div className='flex flex-col gap-2 text-snitch-text-muted text-sm uppercase'>
                            <div className='flex justify-between '>
                                <p>Subtotal</p>
                                <p className='text-lg text-white'>{convertCurrency()}{calculateTotalAmount()}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Shipping</p>
                                <p className='text-xs italic'>calculated at checkout</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Discount</p>
                                <p className='text-snitch-success'>{applyDiscount(calculateTotalAmount()).discount}%</p>
                            </div>
                        </div>
                        <div className='border-b border-snitch-text-dim/50' />
                        <div className='flex justify-between'>
                            <p className='text-lg uppercase'>Total</p>
                            <p className='text-lg text-snitch-success'>{convertCurrency()}{applyDiscount(calculateTotalAmount()).finalAmt}</p>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <button className='px-4 py-3 btn'>Proceed To checkOut</button>
                            <Link className='px-4 py-3 border rounded-lg text-center' to={'/home'}>Continue Shopping</Link>
                        </div>
                        <div className='flex gap-1 justify-center items-center text-xs text-snitch-text-muted'>
                            <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.0049 2L18.3032 4.28071C18.7206 4.41117 19.0049 4.79781 19.0049 5.23519V7H21.0049C21.5572 7 22.0049 7.44772 22.0049 8V10H9.00488V8C9.00488 7.44772 9.4526 7 10.0049 7H17.0049V5.97L11.0049 4.094L5.00488 5.97V13.3744C5.00488 14.6193 5.58406 15.7884 6.56329 16.5428L6.75154 16.6793L11.0049 19.579L14.7869 17H10.0049C9.4526 17 9.00488 16.5523 9.00488 16V12H22.0049V16C22.0049 16.5523 21.5572 17 21.0049 17L17.7848 17.0011C17.3982 17.5108 16.9276 17.9618 16.3849 18.3318L11.0049 22L5.62486 18.3318C3.98563 17.2141 3.00488 15.3584 3.00488 13.3744V5.23519C3.00488 4.79781 3.28913 4.41117 3.70661 4.28071L11.0049 2Z"></path></svg>
                            <p>Secure payments by RazorPay</p>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default Cart
