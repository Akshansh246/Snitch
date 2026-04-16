import React from 'react'

const Header = () => {


    return (
        <nav className='fixed left-0 top-0 w-screen p-5 bg-snitch-bg/40 backdrop-blur-lg text-white flex justify-between'>
            <h2 className='tracking-[8px] uppercase'>Snitch Seller</h2>

            <div className='flex gap-5'>
                <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM12 2C16.9706 2 21 6.04348 21 11.0314V20H3V11.0314C3 6.04348 7.02944 2 12 2ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path></svg>
                <div className='flex flex-col items-end'>
                    <p className='text-sm uppercase'>Akshansh</p>
                    <p className='text-xs text-snitch-text-muted'>PREMIUM</p>
                </div>
            </div>
        </nav>
    )
}

export default Header
