import React from 'react'

const Footer = () => {
    return (
        <footer className='w-screen bg-snitch-bg/40 backdrop-blur-2xl flex items-center justify-between py-2 px-4 absolute bottom-0 left-0'>
            <h2 className='font-snitch-display font-bold text-2xl'>Snitch</h2>

            <div className='hidden md:flex gap-4 text-snitch-accent text-sm'>
                <p className='cursor-pointer'>PRIVACY POLICY</p>
                <p className='cursor-pointer'>TERMS OF SERVICE</p>
                <p className='cursor-pointer'>CONTACT</p>
            </div>

            <p className='text-snitch-text-dim text-xs'>©2026 Snitch ALL RIGHTS RESERVED.</p>
        </footer>
    )
}

export default Footer
