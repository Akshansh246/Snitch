/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { useCart } from '../hooks/useCart'
import Navbar from '../../shared/components/Navbar'

const OrderTrackingPage = () => {
    const { orderId } = useParams()
    const { handleGetOrderTrackingDetails } = useCart()
    const navigate = useNavigate()

    const [orderData, setOrderData] = useState(null)
    const [trackingInfo, setTrackingInfo] = useState(null)
    const [loading, setLoading] = useState(true)

    // Countdown Timer State
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    const [isDelivered, setIsDelivered] = useState(false)

    async function fetchTracking() {
        setLoading(true)
        const res = await handleGetOrderTrackingDetails(orderId)
        if (res && res.success) {
            setOrderData(res.order)
            setTrackingInfo(res.tracking)
            setIsDelivered(res.tracking?.isDelivered)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchTracking()
    }, [orderId])

    useEffect(() => {
        if (!orderData?.estimatedDeliveryDate) return

        const targetDate = new Date(orderData.estimatedDeliveryDate).getTime()

        const interval = setInterval(() => {
            const now = new Date().getTime()
            const difference = targetDate - now

            if (difference <= 0) {
                setIsDelivered(true)
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                clearInterval(interval)
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24))
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((difference % (1000 * 60)) / 1000)

                setTimeLeft({ days, hours, minutes, seconds })
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [orderData])

    if (loading) {
        return (
            <div className='w-full min-h-screen bg-snitch-bg text-snitch-text flex items-center justify-center pt-24 font-mono'>
                <Navbar />
                <div className='flex flex-col items-center gap-4 text-snitch-text-muted'>
                    <div className='w-8 h-8 border-2 border-snitch-text/30 border-t-snitch-text rounded-full animate-spin' />
                    <p className='text-xs uppercase tracking-widest'>Locating Indian Transit Hubs...</p>
                </div>
            </div>
        )
    }

    if (!orderData) {
        return (
            <div className='w-full min-h-screen bg-snitch-bg text-snitch-text flex items-center justify-center pt-24 font-mono px-4'>
                <Navbar />
                <div className='bg-snitch-surface p-8 sm:p-12 rounded-2xl border border-snitch-border/40 flex flex-col items-center justify-center gap-4 text-center max-w-md shadow-sm'>
                    <div className='p-3 bg-snitch-bg rounded-full text-snitch-text-muted'>
                        <svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM5 7H19V19H5V7ZM7 9V11H17V9H7ZM7 13V15H14V13H7Z"/>
                        </svg>
                    </div>
                    <h2 className='text-2xl font-bold font-snitch-display text-snitch-text'>No Active Orders Found</h2>
                    <p className='text-xs text-snitch-text-muted leading-relaxed'>You currently have no completed transactions or tracking data available for this order ID.</p>
                    <div className='flex gap-3 pt-2'>
                        <Link to="/orders" className="px-5 py-2.5 rounded-full border border-snitch-border text-xs font-bold uppercase text-snitch-text hover:bg-snitch-bg transition-colors">
                            My Orders
                        </Link>
                        <Link to="/home" className="btn px-6 py-2.5 text-xs font-bold uppercase tracking-wider shadow-md">
                            Browse Collection →
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const hubs = trackingInfo?.transitHubs || [
        { name: "Mumbai Atelier Hub", city: "Mumbai" },
        { name: "Ahmedabad Transit Center", city: "Ahmedabad" },
        { name: "New Delhi Dispatch Center", city: "New Delhi" },
        { name: "Regional Fulfillment Hub", city: "Regional Hub" },
        { name: "Destination Delivery", city: "Delivered Address" }
    ]

    const activeIndex = isDelivered ? 4 : (trackingInfo?.currentHubIndex || 1)

    return (
        <div className='w-full min-h-screen bg-snitch-bg text-snitch-text font-mono overflow-x-hidden'>
            <Navbar />

            <div className='w-full max-w-5xl mx-auto pt-28 pb-20 px-4 sm:px-8 flex flex-col gap-8'>
                
                {/* Top Back Navigation */}
                <div className='flex justify-between items-center'>
                    <button onClick={() => navigate('/orders')} className='text-xs font-bold uppercase underline text-snitch-text-muted hover:text-snitch-text cursor-pointer'>
                        ← Back to My Orders
                    </button>
                    <span className='text-xs text-snitch-text-muted font-bold'>Order ID: {orderData._id}</span>
                </div>

                {/* Status Hero Card */}
                <div className={`p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm ${
                    isDelivered 
                        ? 'bg-snitch-surface border-snitch-success/50' 
                        : 'bg-snitch-dark-hero text-white border-black'
                }`}>
                    <div className='flex flex-col gap-2 text-center md:text-left'>
                        <div className='flex items-center justify-center md:justify-start gap-2'>
                            <span className={`w-3 h-3 rounded-full ${isDelivered ? 'bg-snitch-success animate-ping' : 'bg-amber-400 animate-pulse'}`} />
                            <span className='text-xs uppercase font-bold tracking-widest opacity-80'>Live Shipping Status</span>
                        </div>
                        <h1 className={`text-3xl sm:text-4xl font-bold font-snitch-display ${isDelivered ? 'text-snitch-text' : 'text-white'}`}>
                            {isDelivered ? 'PRODUCT DELIVERED 🎉' : (orderData.shippingStatus || 'IN TRANSIT')}
                        </h1>
                        <p className={`text-xs ${isDelivered ? 'text-snitch-text-muted' : 'text-white/80'}`}>
                            {isDelivered 
                                ? 'Package handed over to customer at destination address.' 
                                : `Current Checkpoint: ${orderData.shippingCity || 'Mumbai Atelier Hub'}`}
                        </p>
                    </div>

                    {/* Countdown Timer Display */}
                    {!isDelivered ? (
                        <div className='flex flex-col items-center bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shrink-0'>
                            <span className='text-[10px] uppercase font-bold text-white/70 tracking-widest mb-1'>Estimated Delivery Countdown</span>
                            <div className='flex gap-3 text-center'>
                                <div className='flex flex-col'>
                                    <span className='text-2xl font-bold text-white'>{String(timeLeft.days).padStart(2, '0')}</span>
                                    <span className='text-[9px] uppercase text-white/70'>Days</span>
                                </div>
                                <span className='text-xl font-bold text-white/50'>:</span>
                                <div className='flex flex-col'>
                                    <span className='text-2xl font-bold text-white'>{String(timeLeft.hours).padStart(2, '0')}</span>
                                    <span className='text-[9px] uppercase text-white/70'>Hrs</span>
                                </div>
                                <span className='text-xl font-bold text-white/50'>:</span>
                                <div className='flex flex-col'>
                                    <span className='text-2xl font-bold text-white'>{String(timeLeft.minutes).padStart(2, '0')}</span>
                                    <span className='text-[9px] uppercase text-white/70'>Mins</span>
                                </div>
                                <span className='text-xl font-bold text-white/50'>:</span>
                                <div className='flex flex-col'>
                                    <span className='text-2xl font-bold text-white'>{String(timeLeft.seconds).padStart(2, '0')}</span>
                                    <span className='text-[9px] uppercase text-white/70'>Secs</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='flex items-center gap-3 bg-snitch-bg px-6 py-3 rounded-full border border-snitch-border text-snitch-text font-bold text-sm'>
                            <svg className='w-6 h-6 text-snitch-success fill-current' viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            Delivered Successfully
                        </div>
                    )}
                </div>

                {/* Destination Shipping Address Card */}
                <div className='p-6 rounded-2xl bg-snitch-surface border border-snitch-border/40 flex flex-col gap-3 shadow-sm'>
                    <div className='flex items-center gap-2 border-b border-snitch-border/30 pb-3'>
                        <svg className='w-5 h-5 text-snitch-text' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <h3 className='text-xs uppercase font-bold text-snitch-text tracking-wider'>Destination Delivery Address</h3>
                    </div>
                    <div className='flex flex-col gap-1 text-xs text-snitch-text-muted'>
                        <p className='font-bold text-snitch-text text-sm capitalize'>{orderData.user?.fullname || 'Customer'}</p>
                        <p>{orderData.user?.address?.street || 'Primary Delivery Location'}</p>
                        <p>{orderData.user?.address?.city}{orderData.user?.address?.state ? `, ${orderData.user.address.state}` : ''} {orderData.user?.address?.zipcode || ''}</p>
                        <p className='pt-1 text-[11px] text-snitch-text-muted font-mono'>Contact: {orderData.user?.contact || 'Standard Order Verification'}</p>
                    </div>
                </div>

                {/* Simulated Indian Cities Timeline */}
                <div className='bg-snitch-surface p-6 sm:p-10 rounded-2xl border border-snitch-border/40 flex flex-col gap-8'>
                    <div className='flex justify-between items-center border-b border-snitch-border/40 pb-4'>
                        <h3 className='text-xl font-bold font-snitch-display text-snitch-text'>Delivery in Progress</h3>
                        <span className='text-xs font-bold text-snitch-text-muted uppercase'>Live Checkpoints</span>
                    </div>

                    {/* Progress Bar */}
                    <div className='w-full bg-snitch-bg h-2 rounded-full overflow-hidden border border-snitch-border/40 relative'>
                        <div 
                            className='bg-snitch-text h-full transition-all duration-1000'
                            style={{ width: `${isDelivered ? 100 : (trackingInfo?.progressPercent || 35)}%` }}
                        />
                    </div>

                    {/* Hub Steps */}
                    <div className='grid grid-cols-1 sm:grid-cols-5 gap-4 relative'>
                        {hubs.map((hub, idx) => {
                            const isPassed = isDelivered || idx <= activeIndex
                            const isCurrent = !isDelivered && idx === activeIndex

                            return (
                                <div key={idx} className={`flex flex-col items-center text-center gap-2 p-3 rounded-xl border transition-all ${
                                    isCurrent 
                                        ? 'bg-snitch-bg border-snitch-text shadow-md scale-105' 
                                        : isPassed 
                                            ? 'bg-snitch-surface border-snitch-border/60 opacity-90' 
                                            : 'bg-snitch-surface/40 border-snitch-border/30 opacity-40'
                                }`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                        isPassed ? 'bg-snitch-text text-snitch-bg' : 'bg-snitch-card text-snitch-text-muted'
                                    }`}>
                                        {isPassed ? '✓' : idx + 1}
                                    </div>

                                    <div className='flex flex-col gap-0.5'>
                                        <span className='text-xs font-bold text-snitch-text'>{hub.name}</span>
                                        <span className='text-[10px] text-snitch-text-muted uppercase font-semibold'>{hub.city}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Items in this shipment */}
                <div className='bg-snitch-surface p-6 rounded-2xl border border-snitch-border/40 flex flex-col gap-4'>
                    <h3 className='text-sm uppercase font-bold text-snitch-text tracking-wider border-b border-snitch-border/30 pb-3'>Shipment Package Items</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        {orderData.orderItems?.map((item, i) => (
                            <div key={i} className='flex items-center gap-3 bg-snitch-bg p-3 rounded-xl border border-snitch-border/30'>
                                <img src={item.images?.[0]?.url || item.images?.[0]?.preview} alt={item.title} className='w-14 h-16 object-cover rounded-lg bg-snitch-card' />
                                <div className='flex flex-col gap-0.5'>
                                    <h5 className='font-bold text-xs text-snitch-text line-clamp-1'>{item.title}</h5>
                                    <span className='text-[11px] text-snitch-text-muted'>Size: {item.size || 'M'} • Qty: {item.quantity}</span>
                                    <span className='text-xs font-bold text-snitch-text'>{item.price?.currency || '₹'} {item.price?.amount}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderTrackingPage
