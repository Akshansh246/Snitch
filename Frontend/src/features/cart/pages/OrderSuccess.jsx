import React from 'react'
import { useLocation, useNavigate } from 'react-router'

const OrderSuccess = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const queryParams = new URLSearchParams(location.search)
    const orderId = queryParams.get("order_id")

    console.log(orderId)

    return (
        <div className='w-screen h-screen text-white py-20 px-10 flex'>
            <div className='w-full md:w-1/2 md:p-5 flex flex-col justify-between gap-5 text-snitch-text-muted'>
                <div className='flex flex-col gap-1'>
                    <p className='uppercase tracking-[5px] text-xs'>Payment Confirmed</p>
                    <h1 className='text-6xl text-white'>The Silhouette <br /> is Yours.</h1>
                </div>
                <div className='flex flex-col gap-4 text-sm'>
                    <p>Your order has been successfully placed. We are now preparing your selected pieces with the precision of our digital atelier.</p>
                    <p>ORDER ID: <span className='text-white'>{orderId}</span></p>
                </div>
                <div className='flex gap-5'>
                    <div className='w-1/2 p-5 bg-snitch-surface text-sm flex flex-col gap-2 rounded'>
                        <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM5.49388 7.0777L12.0001 10.8444L18.5062 7.07774L12 3.311L5.49388 7.0777ZM4.5 8.81329V16.3469L11.0001 20.1101V12.5765L4.5 8.81329ZM13.0001 20.11L19.5 16.3469V8.81337L13.0001 12.5765V20.11Z"></path></svg>
                        <p className='uppercase text-white font-bold'>Curating Order</p>
                        <p className='text-xs'>Our artisans are currently selecting and inspecting your product for quality assurance.</p>
                    </div>
                    <div className='w-1/2 p-5 bg-snitch-surface text-sm flex flex-col gap-2 rounded'>
                        <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z"></path></svg>
                        <p className='uppercase text-white font-bold'>Delivery</p>
                        <p className='text-xs'>Estimated arrival within 10-15 buisness days. A tracking link will be sent shortly.</p>
                    </div>

                </div>
                <div>
                    <button onClick={()=>{navigate('/home')}} className='btn px-6 py-4'>Continue Exploring</button>
                </div>
            </div>
            <div className='hidden md:block w-1/2 h-full px-20 relative'>
                <img className='w-full h-full object-cover' src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqSdkT8q0_xl8qKVd8qr9cFR6v-vZkyhdzZYkKB6u3LDHVWWOD2v8TA1AnCFXvuZCrDf78O5NjSZKBge9x-pIw9X_NQ1H1Uo_pxXJs2BZE05URuKQH-wppTH244pU1dNXqMAPdswMOLFCzm3GEeUBmRwi8fY6nv1l-fv-QwoURnWljopStt1TdZV-yHrC4r1xQ7IZurW8LCmPBR8YffixlpyT1rT5K6t-QEAD4Z-Jva65j1zBzAL2NOfoCc6EFPxxt3-BxdHs0Eg" alt="" />
                <div className='w-50 h-50 absolute -bottom-10 left-0 border border-snitch-border/50'>
                    <img className='w-full h-full object-cover' src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrGV-xMRWZLJQenyD4HIzKzD9TEgm5ojUgh0BVXztUWQTjL3c8LI28drC28gMdIR1xizNxmT3CNQrVc5mKCefllQ81QAUd0I3QpynpNCfhO77JdF2MMxkdM_4XK-MJysQND-gTQ29QcdhM8m2MaK9StKGEl6-rBKozilug46rghCsDlAZZtRTtrerb9hgbMG8BcmZuE8PHJv2IJQtf2mTJ5tt7TPtdhR8X48z2kQB-a8CwTclch3hH5ngTeOtkiF21QkGDPNYyHw" alt="" />
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess
