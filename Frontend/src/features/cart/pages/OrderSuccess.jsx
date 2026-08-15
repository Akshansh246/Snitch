import React from 'react'
import { useLocation, useNavigate } from 'react-router'

const OrderSuccess = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const queryParams = new URLSearchParams(location.search)
    const orderId = queryParams.get("order_id")

    return (
        <div className='w-full min-h-screen bg-snitch-bg text-white pt-24 pb-16 px-4 sm:px-8 lg:px-12 flex items-center justify-center overflow-x-hidden'>
            <div className='w-full max-w-6xl flex flex-col md:flex-row gap-8 lg:gap-12 items-center'>
                <div className='w-full md:w-1/2 flex flex-col justify-between gap-6 text-snitch-text-muted'>
                    <div className='flex flex-col gap-2'>
                        <p className='uppercase tracking-[5px] text-xs text-snitch-success font-semibold'>Payment Confirmed</p>
                        <h1 className='text-4xl sm:text-5xl lg:text-6xl text-white font-snitch-display leading-tight'>The Silhouette <br /> is Yours.</h1>
                    </div>
                    <div className='flex flex-col gap-3 text-xs sm:text-sm leading-relaxed'>
                        <p>Your order has been successfully placed. We are now preparing your selected pieces with the precision of our digital atelier.</p>
                        <p className='font-mono text-xs bg-snitch-surface p-3 rounded border border-snitch-border/40 w-fit'>ORDER ID: <span className='text-white font-semibold'>{orderId || 'ORDER-SNITCH-892'}</span></p>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <div className='w-full sm:w-1/2 p-4 sm:p-5 bg-snitch-surface text-sm flex flex-col gap-2 rounded-xl border border-snitch-border/30'>
                            <svg className='w-5 h-5 text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM5.49388 7.0777L12.0001 10.8444L18.5062 7.07774L12 3.311L5.49388 7.0777ZM4.5 8.81329V16.3469L11.0001 20.1101V12.5765L4.5 8.81329ZM13.0001 20.11L19.5 16.3469V8.81337L13.0001 12.5765V20.11Z"></path></svg>
                            <p className='uppercase text-white text-xs font-semibold tracking-wider'>Curating Order</p>
                            <p className='text-xs leading-relaxed text-snitch-text-muted'>Our artisans are currently selecting and inspecting your product for quality assurance.</p>
                        </div>
                        <div className='w-full sm:w-1/2 p-4 sm:p-5 bg-snitch-surface text-sm flex flex-col gap-2 rounded-xl border border-snitch-border/30'>
                            <svg className='w-5 h-5 text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z"></path></svg>
                            <p className='uppercase text-white text-xs font-semibold tracking-wider'>Express Delivery</p>
                            <p className='text-xs leading-relaxed text-snitch-text-muted'>Estimated arrival within 3-5 business days. A tracking link will be sent shortly.</p>
                        </div>
                    </div>
                    <div className='pt-2 flex flex-wrap gap-3'>
                        <button onClick={()=>{navigate(orderId ? `/orders/${orderId}/track` : '/orders')}} className='btn px-6 py-3.5 text-xs font-bold uppercase tracking-wider shadow-md'>
                            Track Order Live →
                        </button>
                        <button onClick={()=>{navigate('/orders')}} className='px-6 py-3.5 border border-snitch-border rounded-full text-xs font-bold uppercase tracking-wider text-snitch-text-muted hover:text-white transition-colors'>
                            My Orders
                        </button>
                        <button onClick={()=>{navigate('/home')}} className='px-6 py-3.5 border border-snitch-border rounded-full text-xs font-bold uppercase tracking-wider text-snitch-text-muted hover:text-white transition-colors'>
                            Continue Exploring
                        </button>
                    </div>
                </div>
                <div className='w-full md:w-1/2 h-[350px] sm:h-[450px] rounded-xl overflow-hidden relative bg-snitch-surface border border-snitch-border/30'>
                    <img className='w-full h-full object-cover' src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop" alt="Order confirmation" />
                    <div className='absolute bottom-4 left-4 p-4 bg-black/70 backdrop-blur-md rounded-lg border border-white/20 max-w-xs'>
                        <p className='text-xs uppercase tracking-widest text-snitch-text-dim'>Atelier Curation</p>
                        <p className='text-sm text-white font-medium mt-1'>Crafted for distinction</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess
