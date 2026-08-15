import React from 'react'
import Footer from '../components/Footer'
import { Link } from 'react-router'

const Error = () => {
    return (
        <main className='min-h-screen w-full flex flex-col justify-between items-center text-white relative py-12 px-4 overflow-x-hidden'>
            <img className='bg-img' src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhO6FIuB1gc8CL9Zsxr1poumW_uFlWQqR5qGr_4Kdn3hQtlUo1XzQuZKRFyTp0IHMYdZ9mUjxzDS7ShOp3S5xMjKV0UYoK03QvMqGcNToeKcfHEMNFUo8y5wc2YXH8XZ1GLvLSSDxE-CECzcEHjdcVq3slIx2tHZqBodi1W7708o_i5eDb1ItgWrZpxXIG9TUNQItDn71fS3ZslKrU2vZeW8NnZUMwkTKe1boPI45NfoWl_Cw1QiCOH5DIIrCJErELBvOBht839w" alt="" />

            <div className='flex-1 flex items-center justify-center w-full my-auto'>
                <div className='flex flex-col gap-6 rounded-lg items-center bg-snitch-surface/80 backdrop-blur-md p-6 max-w-md w-full border border-snitch-border/40 shadow-2xl'>
                    <div className='relative px-4 sm:px-8'>
                        <img className='w-48 sm:w-60 rounded object-cover' src="https://images.unsplash.com/photo-1674930406583-bde79f7f2fc9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        <div className='absolute bottom-0 right-2 sm:right-4 text-right bg-black/60 p-2 rounded backdrop-blur-sm'>
                            <h2 className='text-4xl sm:text-6xl font-bold font-snitch-display'>404</h2>
                            <p className='text-xs uppercase tracking-widest text-snitch-text-muted'>Lost in the Void</p>
                        </div>
                    </div>
                    <div className='text-center flex flex-col gap-3'>
                        <h3 className='text-xl sm:text-2xl font-light font-snitch-display'>404 / The Unspoken Silhouette</h3>
                        <p className='text-xs text-snitch-text-muted leading-relaxed'>The path you seek has dissolved into the shadows. Like a thread pulled from the loom, this destination is no longer part of our current tapestry.</p>
                        <Link className='py-3 px-6 btn text-xs font-semibold mt-2 inline-block' to={'/home'}>Return to Home</Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    )
}

export default Error
