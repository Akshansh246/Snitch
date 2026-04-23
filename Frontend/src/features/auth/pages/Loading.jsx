import React from 'react'
import Footer from '../components/Footer'

const Loading = () => {
    return (
        <main className='h-screen w-screen flex items-center justify-center text-white'>
            <img className='bg-img' src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhO6FIuB1gc8CL9Zsxr1poumW_uFlWQqR5qGr_4Kdn3hQtlUo1XzQuZKRFyTp0IHMYdZ9mUjxzDS7ShOp3S5xMjKV0UYoK03QvMqGcNToeKcfHEMNFUo8y5wc2YXH8XZ1GLvLSSDxE-CECzcEHjdcVq3slIx2tHZqBodi1W7708o_i5eDb1ItgWrZpxXIG9TUNQItDn71fS3ZslKrU2vZeW8NnZUMwkTKe1boPI45NfoWl_Cw1QiCOH5DIIrCJErELBvOBht839w" alt="" />

            <div className='flex flex-col items-center gap-8'>
                <img className='w-20 animate-bounce' src="https://ik.imagekit.io/devakshu/img.png" alt="" />
                <p className='tracking-[8px] uppercase text-snitch-text-muted text-sm'>Preparing Experience</p>
                <p className='italic'>Entering the Snitch</p>
            </div>
            <Footer/>
        </main>
    )
}

export default Loading
