import React from 'react'

const Footer = () => {
    return (
        <footer className='w-full bg-snitch-bg/70 backdrop-blur-2xl flex flex-col sm:flex-row items-center justify-between py-3 px-6 border-t border-snitch-border/30 gap-2'>
            <h2 className='font-snitch-display font-bold text-xl sm:text-2xl'>Snitch</h2>

            <div className='flex gap-4 text-snitch-text-muted text-xs sm:text-sm tracking-wider uppercase'>
                <p className='cursor-pointer hover:text-white transition-colors'>PRIVACY POLICY</p>
                <p className='cursor-pointer hover:text-white transition-colors'>TERMS OF SERVICE</p>
                <p className='cursor-pointer hover:text-white transition-colors'>CONTACT</p>
            </div>

            <p className='text-snitch-text-dim text-[11px] sm:text-xs'>©2026 Snitch ALL RIGHTS RESERVED.</p>
        </footer>
    )
}

export default Footer
