/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useCart } from '../hooks/useCart'
import Navbar from '../../shared/components/Navbar'

const OrdersPage = () => {
    const { handleGetUserOrders } = useCart()
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    async function fetchOrders() {
        setLoading(true)
        const res = await handleGetUserOrders()
        setOrders(res)
        setLoading(false)
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <div className='w-full min-h-screen bg-snitch-bg text-snitch-text font-mono overflow-x-hidden'>
            <Navbar />

            <div className='w-full max-w-6xl mx-auto pt-28 pb-20 px-4 sm:px-8 flex flex-col gap-8'>
                <div className='flex flex-col gap-2 border-b border-snitch-border/40 pb-4'>
                    <h1 className='text-4xl sm:text-5xl font-bold font-snitch-display text-snitch-text'>My Orders</h1>
                    <p className='uppercase text-snitch-text-muted text-xs tracking-wider'>{orders.length} Completed Transaction{(orders.length === 1)?'':'s'} — Digital Atelier Receipts</p>
                </div>

                {loading ? (
                    <div className='flex flex-col items-center justify-center py-20 gap-4 text-snitch-text-muted'>
                        <div className='w-8 h-8 border-2 border-snitch-text/30 border-t-snitch-text rounded-full animate-spin' />
                        <p className='text-xs uppercase tracking-widest'>Retrieving Order History...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className='bg-snitch-surface p-12 rounded-2xl border border-snitch-border/40 flex flex-col items-center justify-center gap-4 text-center my-8'>
                        <svg className='w-12 h-12 text-snitch-text-muted' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM5 7H19V19H5V7ZM7 9V11H17V9H7ZM7 13V15H14V13H7Z"/>
                        </svg>
                        <h3 className='text-xl font-bold font-snitch-display text-snitch-text'>No Orders Placed Yet</h3>
                        <p className='text-xs text-snitch-text-muted max-w-md'>You haven't completed any purchases yet. Your confirmed orders will appear here with live tracking.</p>
                        <Link to="/home" className='btn px-6 py-3 text-xs font-bold uppercase tracking-wider mt-2'>Browse Collection</Link>
                    </div>
                ) : (
                    <div className='flex flex-col gap-6'>
                        {orders.map((order, idx) => {
                            const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })

                            return (
                                <div key={idx} className='bg-snitch-surface rounded-2xl p-6 border border-snitch-border/40 flex flex-col gap-6 shadow-sm'>
                                    {/* Order Meta Header */}
                                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-snitch-border/30 pb-4'>
                                        <div className='flex flex-wrap gap-x-6 gap-y-2 text-xs'>
                                            <div>
                                                <span className='text-snitch-text-muted block text-[10px] uppercase font-bold'>Order Placed</span>
                                                <span className='font-bold text-snitch-text'>{orderDate}</span>
                                            </div>
                                            <div>
                                                <span className='text-snitch-text-muted block text-[10px] uppercase font-bold'>Total Amount</span>
                                                <span className='font-bold text-snitch-text'>{order.price?.currency || '₹'} {order.price?.amount}</span>
                                            </div>
                                            <div>
                                                <span className='text-snitch-text-muted block text-[10px] uppercase font-bold'>Payment ID</span>
                                                <span className='font-mono text-snitch-text text-[11px]'>{order.razorpay?.paymentId || order._id}</span>
                                            </div>
                                        </div>

                                        <div className='flex items-center gap-3'>
                                            <span className='px-3 py-1 bg-snitch-dark-hero text-white text-[10px] uppercase font-bold tracking-widest rounded-full'>
                                                {order.shippingStatus || 'In Transit'}
                                            </span>
                                            <button 
                                                onClick={() => navigate(`/orders/${order._id}/track`)}
                                                className='btn px-4 py-2 text-xs font-bold uppercase tracking-wider'
                                            >
                                                Track Order →
                                            </button>
                                        </div>
                                    </div>

                                    {/* Order Items Grid */}
                                    <div className='flex flex-col gap-4'>
                                        {order.orderItems?.map((item, i) => {
                                            const itemImg = item.images?.[0]?.url || item.images?.[0]?.preview || 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=700&auto=format&fit=crop'
                                            return (
                                                <div key={i} className='flex items-center gap-4 bg-snitch-bg p-3.5 rounded-xl border border-snitch-border/30'>
                                                    <div className='w-16 h-20 bg-snitch-card rounded-lg overflow-hidden shrink-0'>
                                                        <img src={itemImg} alt={item.title} className='w-full h-full object-cover object-top' />
                                                    </div>
                                                    <div className='flex flex-col gap-1 flex-1'>
                                                        <h4 className='font-bold text-sm text-snitch-text line-clamp-1'>{item.title}</h4>
                                                        <div className='flex gap-4 text-xs text-snitch-text-muted uppercase'>
                                                            <span>Size: <strong className='text-snitch-text'>{item.size || 'M'}</strong></span>
                                                            <span>Qty: <strong className='text-snitch-text'>{item.quantity}</strong></span>
                                                        </div>
                                                        <p className='text-xs font-bold text-snitch-text'>{item.price?.currency || '₹'} {item.price?.amount}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
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

export default OrdersPage
