import React from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
    return (
        <nav className='bg-snitch-bg/50 backdrop-blur-2xl z-50 w-screen fixed left-0 top-0 text-white flex items-center justify-between px-5 py-3'>
            <h2 className='text-xl uppercase tracking-[8px] font-light font-snitch-display items-center gap-1 flex'>
                <img className='w-6' src="https://ik.imagekit.io/devakshu/img.png" alt="" />
                Snitch
            </h2>
            <div className='hidden md:flex gap-5 uppercase text-sm font-extralight'>
                <a href='#collection'>Collections</a>
                <NavLink to={'/login'}>Snitch</NavLink>
                <NavLink>Archive</NavLink>
                <a href='#editorial'>Editorial</a>
            </div>
            <div className='flex gap-5 uppercase font-extralight text-sm'>
                <NavLink  to={'/login'}>Login</NavLink>
                <NavLink to={'/register'}>Register</NavLink>
            </div>
        </nav>
    )
}

export default Navbar
