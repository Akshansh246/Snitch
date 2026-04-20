import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'

const Navbar = () => {

    const {handleLogout} = useAuth()
    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate()

    async function logout() {
        await handleLogout()
        navigate('/home')
    }


    return (
        <nav className='bg-snitch-bg/50 backdrop-blur-2xl z-50 w-screen fixed left-0 top-0 text-white flex items-center justify-between px-5 py-3'>
            <h2 className='text-xl uppercase tracking-[8px] font-light font-snitch-display items-center gap-2 flex'>
                <img className='w-6' src="https://ik.imagekit.io/devakshu/img.png" alt="" />
                Snitch
            </h2>
            <div className='hidden md:flex gap-5 uppercase text-sm font-extralight text-snitch-text-muted'>
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" } to={'/home#collection'}>Collections</NavLink>
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" } to={'/'}>Atelier</NavLink>
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }>Archive</NavLink>
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" } to={'/home#editorial'}>Editorial</NavLink>
            </div>
            {(user)?
                <div className='uppercase font-extralight text-sm flex gap-4 items-center'>
                    <p>{user.fullname}</p>
                    <button className='cursor-pointer btn p-1' onClick={logout}>
                        <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg>
                    </button>
                </div> 
            : 
                <div className='flex gap-5 uppercase font-extralight text-sm'>
                    <NavLink  to={'/login'}>Login</NavLink>
                    <NavLink to={'/register'}>Register</NavLink>
                </div>
            }
        </nav>
    )
}

export default Navbar
