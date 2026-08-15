/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { useCart } from '../hooks/useCart'
import useAuth from '../../auth/hooks/useAuth'
import { useRazorpay } from 'react-razorpay'
import { toast } from 'react-toastify'
import { getFixedDiscount } from '../../products/utils/discount.utils'

const CheckoutConfirmationPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    const cartItems = useSelector(state => state.cart.items)
    const { handleCreateCartOrder, handleCreateBuyNowOrder, handleVerifyCartOrder, handleGetCart } = useCart()
    const { handleUpdateProfile } = useAuth()
    const { Razorpay } = useRazorpay()

    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
    const [addressForm, setAddressForm] = useState({
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        zipcode: user?.address?.zipcode || '',
        country: user?.address?.country || 'India',
        fullname: user?.fullname || '',
        contact: user?.contact || ''
    })
    const [isSubmittingAddress, setIsSubmittingAddress] = useState(false)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)

    // Determine checkout mode: direct Buy Now or Cart checkout
    const buyNowData = location.state?.buyNowData

    useEffect(() => {
        if (!user) {
            toast.info('Please sign in to access checkout.')
            navigate('/login')
            return
        }
        if (!buyNowData && cartItems.length === 0) {
            handleGetCart()
        }
    }, [user])

    // Normalize items array
    const checkoutItems = buyNowData ? [
        {
            product: buyNowData.product,
            variant: buyNowData.selectedVariant,
            size: buyNowData.size,
            quantity: 1,
            price: buyNowData.product?.price
        }
    ] : cartItems

    // Compute prices with deterministic fixed discount
    let totalOriginal = 0
    let totalFinal = 0
    let totalSavings = 0

    checkoutItems.forEach(item => {
        const amt = item.product?.price?.amount || 0
        const qty = item.quantity || 1
        const disc = getFixedDiscount(item.product?._id, amt)
        totalOriginal += amt * qty
        totalFinal += disc.finalAmt * qty
        totalSavings += disc.savings * qty
    })

    const currencySymbol = '₹'

    // Check address completeness
    const hasValidAddress = Boolean(
        user?.address?.street?.trim() &&
        user?.address?.city?.trim() &&
        user?.address?.zipcode?.trim()
    )

    const handleSaveAddress = async (e) => {
        e.preventDefault()
        if (!addressForm.street.trim() || !addressForm.city.trim() || !addressForm.zipcode.trim()) {
            toast.warn('Please complete all street, city, and pincode fields.')
            return
        }
        setIsSubmittingAddress(true)
        const res = await handleUpdateProfile({
            fullname: addressForm.fullname,
            contact: addressForm.contact,
            address: {
                street: addressForm.street,
                city: addressForm.city,
                state: addressForm.state,
                zipcode: addressForm.zipcode,
                country: addressForm.country
            }
        })
        setIsSubmittingAddress(false)
        if (res) {
            setIsAddressModalOpen(false)
            toast.success('Shipping address saved successfully!')
        }
    }

    const handleProceedToPayment = async () => {
        if (!hasValidAddress) {
            toast.error('Please add your shipping address before placing an order.')
            setIsAddressModalOpen(true)
            return
        }

        setIsProcessingPayment(true)
        try {
            let order;
            if (buyNowData) {
                order = await handleCreateBuyNowOrder({
                    productId: buyNowData.product._id,
                    variantId: buyNowData.selectedVariant?._id || null,
                    size: buyNowData.size,
                    quantity: 1
                })
            } else {
                order = await handleCreateCartOrder()
            }

            if (!order) {
                setIsProcessingPayment(false)
                return
            }

            const options = {
                key: "rzp_test_Sk4OElagSy3nZv",
                amount: order.amount,
                currency: order.currency || "INR",
                name: "Snitch Atelier",
                description: "Order Checkout Review",
                order_id: order.id,
                handler: async (response) => {
                    const isValid = await handleVerifyCartOrder(response)
                    setIsProcessingPayment(false)
                    if (isValid) {
                        toast.success('Order placed successfully! Track shipment in My Orders.')
                        navigate('/orders')
                    }
                },
                prefill: {
                    name: user?.fullname,
                    email: user?.email,
                    contact: user?.contact,
                },
                theme: {
                    color: "#0A0A0A",
                },
            };

            const razorpayInstance = new Razorpay(options);
            razorpayInstance.open();
        } catch (error) {
            setIsProcessingPayment(false)
            toast.error('Failed to initiate payment. Please try again.')
        }
    }

    return (
        <div className='w-full min-h-screen text-snitch-text bg-snitch-bg font-mono overflow-x-hidden pt-24 pb-20 px-4 sm:px-8 lg:px-12'>
            <div className='max-w-6xl mx-auto flex flex-col gap-8'>
                
                {/* Step Header */}
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-snitch-border/40 pb-6'>
                    <div>
                        <span className='text-[10px] uppercase font-bold tracking-[4px] text-snitch-text-muted mb-1 block'>Checkout Step 2 of 2</span>
                        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold font-snitch-display text-snitch-text'>Order Confirmation</h1>
                    </div>
                    <button 
                        onClick={() => navigate(-1)} 
                        className='text-xs uppercase tracking-wider font-semibold text-snitch-text-muted hover:text-snitch-text transition-colors'
                    >
                        ← Back
                    </button>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
                    
                    {/* Left Column: Address & Items */}
                    <div className='lg:col-span-7 flex flex-col gap-6'>
                        
                        {/* 1. Delivery Address Card */}
                        <div className={`p-6 rounded-2xl border ${hasValidAddress ? 'bg-snitch-surface border-snitch-border/40' : 'bg-red-500/10 border-red-500/30'} flex flex-col gap-4 shadow-sm`}>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-2'>
                                    <svg className='w-5 h-5 text-snitch-text' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                    </svg>
                                    <h3 className='text-sm font-bold uppercase tracking-wider text-snitch-text'>Shipping Address</h3>
                                </div>
                                <button 
                                    onClick={() => setIsAddressModalOpen(true)}
                                    className='text-xs font-bold text-snitch-text underline hover:opacity-70 transition-opacity cursor-pointer'
                                >
                                    {hasValidAddress ? 'Change Address' : '+ Add Address'}
                                </button>
                            </div>

                            {hasValidAddress ? (
                                <div className='flex flex-col gap-1 text-xs text-snitch-text-muted bg-snitch-bg/60 p-4 rounded-xl border border-snitch-border/30'>
                                    <p className='font-bold text-snitch-text text-sm capitalize'>{user.fullname}</p>
                                    <p>{user.address.street}</p>
                                    <p>{user.address.city}, {user.address.state} {user.address.zipcode}</p>
                                    <p>{user.address.country || 'India'}</p>
                                    <p className='pt-1 text-[11px] text-snitch-text-muted font-mono'>Phone: {user.contact || 'Not provided'}</p>
                                </div>
                            ) : (
                                <div className='flex flex-col gap-2 p-4 bg-red-500/10 rounded-xl text-red-600 text-xs'>
                                    <p className='font-bold'>⚠️ No delivery address saved.</p>
                                    <p>Please add your primary shipping address to proceed with order placement.</p>
                                    <button 
                                        onClick={() => setIsAddressModalOpen(true)} 
                                        className='btn py-2 px-4 text-[10px] w-fit font-bold mt-1'
                                    >
                                        + Add Shipping Address Now
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* 2. Items Review */}
                        <div className='p-6 rounded-2xl bg-snitch-surface border border-snitch-border/40 flex flex-col gap-4 shadow-sm'>
                            <h3 className='text-sm font-bold uppercase tracking-wider text-snitch-text border-b border-snitch-border/30 pb-3'>
                                Review Items ({checkoutItems.length})
                            </h3>
                            <div className='flex flex-col gap-4'>
                                {checkoutItems.map((item, idx) => {
                                    const imgUrl = item.variant?.images?.[0]?.url || item.product?.images?.[0]?.url
                                    const disc = getFixedDiscount(item.product?._id, item.product?.price?.amount)

                                    return (
                                        <div key={idx} className='flex gap-4 p-3 bg-snitch-bg/70 rounded-xl border border-snitch-border/30 items-center'>
                                            <div className='w-16 h-20 rounded-lg overflow-hidden bg-snitch-card shrink-0'>
                                                <img src={imgUrl} alt={item.product?.title} className='w-full h-full object-cover object-top' />
                                            </div>
                                            <div className='flex-1 flex flex-col gap-1 text-xs'>
                                                <h4 className='font-bold text-snitch-text text-sm line-clamp-1'>{item.product?.title}</h4>
                                                <p className='text-snitch-text-muted text-[11px] uppercase'>Size: <span className='font-bold text-snitch-text'>{item.size}</span> | Qty: <span className='font-bold text-snitch-text'>{item.quantity}</span></p>
                                                <div className='flex items-center gap-2 pt-0.5'>
                                                    <span className='line-through text-snitch-text-muted text-[11px]'>{currencySymbol}{item.product?.price?.amount}</span>
                                                    <span className='font-bold text-snitch-text text-sm'>{currencySymbol}{disc.finalAmt}</span>
                                                    <span className='text-[10px] bg-snitch-dark-hero text-white px-2 py-0.5 rounded font-bold'>{disc.discount}% OFF</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* 3. Shipping Timeline Simulation Card */}
                        <div className='p-6 rounded-2xl bg-snitch-surface border border-snitch-border/40 flex flex-col gap-3 shadow-sm'>
                            <div className='flex items-center gap-2'>
                                <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
                                <h3 className='text-xs font-bold uppercase tracking-wider text-snitch-text'>Estimated Dispatch Timeline</h3>
                            </div>
                            <p className='text-xs text-snitch-text-muted'>
                                Guaranteed delivery within <span className='font-bold text-snitch-text'>8 to 10 Business Days</span> via Indian express couriers (Mumbai Hub → Regional Center → Destination).
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Price Summary & Payment CTA */}
                    <div className='lg:col-span-5 bg-snitch-surface p-6 sm:p-8 rounded-2xl border border-snitch-border/40 flex flex-col gap-6 sticky top-24 shadow-sm'>
                        <h2 className='uppercase tracking-[4px] text-xs font-bold text-snitch-text border-b border-snitch-border/30 pb-4'>
                            Payment Breakdown
                        </h2>

                        <div className='flex flex-col gap-3 text-xs text-snitch-text-muted uppercase tracking-wider'>
                            <div className='flex justify-between items-center'>
                                <span>Bag Original Total</span>
                                <span className='line-through font-bold text-snitch-text'>{currencySymbol}{totalOriginal}</span>
                            </div>
                            <div className='flex justify-between items-center text-emerald-700 font-bold'>
                                <span>Fixed Atelier Discount</span>
                                <span>- {currencySymbol}{totalSavings}</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span>Shipping Fee</span>
                                <span className='text-emerald-700 font-bold italic'>FREE (Complimentary)</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span>Duties & Taxes</span>
                                <span>Included</span>
                            </div>
                        </div>

                        <div className='border-b border-snitch-border/40' />

                        <div className='flex justify-between items-center'>
                            <span className='text-sm uppercase font-bold text-snitch-text'>Final Amount Payable</span>
                            <span className='text-2xl font-bold text-snitch-text'>{currencySymbol}{totalFinal}</span>
                        </div>

                        <button 
                            onClick={handleProceedToPayment}
                            disabled={isProcessingPayment}
                            className={`btn py-4 text-xs font-bold uppercase tracking-widest w-full text-center shadow-md flex items-center justify-center gap-2 ${isProcessingPayment ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isProcessingPayment ? (
                                <span>Processing Payment...</span>
                            ) : (
                                <span>CONFIRM ORDER & PAY {currencySymbol}{totalFinal} →</span>
                            )}
                        </button>

                        <p className='text-[10px] text-center text-snitch-text-muted tracking-wider uppercase'>
                            🔒 256-bit Encrypted Checkout via Razorpay
                        </p>
                    </div>

                </div>

            </div>

            {/* Address Edit Modal */}
            {isAddressModalOpen && (
                <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'>
                    <div className='bg-snitch-surface rounded-2xl border border-snitch-border p-6 sm:p-8 w-full max-w-lg shadow-2xl flex flex-col gap-5'>
                        <div className='flex justify-between items-center border-b border-snitch-border/30 pb-3'>
                            <h3 className='text-lg font-bold font-snitch-display text-snitch-text'>Shipping Address</h3>
                            <button onClick={() => setIsAddressModalOpen(false)} className='text-snitch-text-muted hover:text-snitch-text p-1 font-bold'>✕</button>
                        </div>
                        <form onSubmit={handleSaveAddress} className='flex flex-col gap-4 text-xs'>
                            <div className='flex flex-col gap-1'>
                                <label className='font-bold uppercase text-snitch-text-muted'>Full Name</label>
                                <input 
                                    value={addressForm.fullname} 
                                    onChange={e => setAddressForm({ ...addressForm, fullname: e.target.value })} 
                                    className='p-3 bg-snitch-bg border border-snitch-border rounded-lg text-snitch-text'
                                    placeholder='John Doe'
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='font-bold uppercase text-snitch-text-muted'>Phone / Contact</label>
                                <input 
                                    value={addressForm.contact} 
                                    onChange={e => setAddressForm({ ...addressForm, contact: e.target.value })} 
                                    className='p-3 bg-snitch-bg border border-snitch-border rounded-lg text-snitch-text'
                                    placeholder='+91 98765 43210'
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='font-bold uppercase text-snitch-text-muted'>Street Address</label>
                                <input 
                                    value={addressForm.street} 
                                    onChange={e => setAddressForm({ ...addressForm, street: e.target.value })} 
                                    className='p-3 bg-snitch-bg border border-snitch-border rounded-lg text-snitch-text'
                                    placeholder='Flat 4B, Emerald Heights, MG Road'
                                    required
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-3'>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold uppercase text-snitch-text-muted'>City</label>
                                    <input 
                                        value={addressForm.city} 
                                        onChange={e => setAddressForm({ ...addressForm, city: e.target.value })} 
                                        className='p-3 bg-snitch-bg border border-snitch-border rounded-lg text-snitch-text'
                                        placeholder='Mumbai'
                                        required
                                    />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold uppercase text-snitch-text-muted'>Pincode / Zipcode</label>
                                    <input 
                                        value={addressForm.zipcode} 
                                        onChange={e => setAddressForm({ ...addressForm, zipcode: e.target.value })} 
                                        className='p-3 bg-snitch-bg border border-snitch-border rounded-lg text-snitch-text'
                                        placeholder='400001'
                                        required
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-3'>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold uppercase text-snitch-text-muted'>State</label>
                                    <input 
                                        value={addressForm.state} 
                                        onChange={e => setAddressForm({ ...addressForm, state: e.target.value })} 
                                        className='p-3 bg-snitch-bg border border-snitch-border rounded-lg text-snitch-text'
                                        placeholder='Maharashtra'
                                    />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold uppercase text-snitch-text-muted'>Country</label>
                                    <input 
                                        value={addressForm.country} 
                                        onChange={e => setAddressForm({ ...addressForm, country: e.target.value })} 
                                        className='p-3 bg-snitch-bg border border-snitch-border rounded-lg text-snitch-text'
                                        placeholder='India'
                                    />
                                </div>
                            </div>

                            <div className='flex justify-end gap-3 pt-2'>
                                <button type='button' onClick={() => setIsAddressModalOpen(false)} className='px-4 py-2 text-snitch-text-muted font-bold'>Cancel</button>
                                <button type='submit' disabled={isSubmittingAddress} className='btn px-6 py-2.5 text-xs font-bold'>
                                    {isSubmittingAddress ? 'Saving...' : 'Save & Continue'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CheckoutConfirmationPage
