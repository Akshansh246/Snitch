import React from 'react'
import Footer from '../components/Footer'
import { Link } from 'react-router'

const Error = () => {
    return (
        <main className='h-screen w-screen flex items-center justify-center text-white'>
            <div className='flex flex-col gap-7 rounded items-center bg-snitch-surface p-5'>
                <div className='relative px-8'>
                    <img className='w-60 rounded' src="https://images.unsplash.com/photo-1674930406583-bde79f7f2fc9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <div className='absolute bottom-0 right-0 text-right'>
                        <h2 className='text-6xl'>404</h2>
                        <p>Lost in the Void</p>
                    </div>
                </div>
                <div className='text-center flex flex-col gap-4'>
                    <h3 className='text-3xl font-light'>404/The Unspoken Silhouette</h3>
                    <p className='text-xs text-snitch-text-muted'>The path you seek has dissolved into the shadows. Like a <br /> thread pulled from the loom, this destination is no longer <br /> part of our current tapestry.</p>
                    <Link className='py-2 px-3 btn' to={'/home'}>Return to home</Link>
                </div>
            </div>
            <Footer/>
        </main>
    )
}

export default Error
