import React from 'react'
import Footer from '../components/Footer'

const Loading = () => {
    return (
        <main className='h-screen w-screen flex items-center justify-center text-white'>
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
