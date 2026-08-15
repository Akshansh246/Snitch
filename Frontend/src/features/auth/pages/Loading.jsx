import React from 'react'
import Footer from '../components/Footer'

const Loading = () => {
    return (
        <main className='min-h-screen w-full flex flex-col justify-between items-center text-white relative py-12 px-4 overflow-x-hidden'>
            <img className='bg-img' src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhO6FIuB1gc8CL9Zsxr1poumW_uFlWQqR5qGr_4Kdn3hQtlUo1XzQuZKRFyTp0IHMYdZ9mUjxzDS7ShOp3S5xMjKV0UYoK03QvMqGcNToeKcfHEMNFUo8y5wc2YXH8XZ1GLvLSSDxE-CECzcEHjdcVq3slIx2tHZqBodi1W7708o_i5eDb1ItgWrZpxXIG9TUNQItDn71fS3ZslKrU2vZeW8NnZUMwkTKe1boPI45NfoWl_Cw1QiCOH5DIIrCJErELBvOBht839w" alt="" />

            <div className='flex-1 flex flex-col items-center justify-center gap-6 my-auto text-center'>
                <img className='w-16 sm:w-20 animate-bounce' src="https://ik.imagekit.io/devakshu/img.png" alt="" />
                <p className='tracking-[6px] sm:tracking-[8px] uppercase text-snitch-text-muted text-xs sm:text-sm'>Preparing Experience</p>
                <p className='italic text-sm text-snitch-text-dim'>Entering the Snitch</p>
            </div>
            <Footer/>
        </main>
    )
}

export default Loading
