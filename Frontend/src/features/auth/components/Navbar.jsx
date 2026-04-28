import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'
import { toast } from 'react-toastify'

const Navbar = () => {

    const {handleLogout} = useAuth()
    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate()

    async function logout() {
        await handleLogout()
        toast('Logged Out Sucessfully!')
        navigate('/')
    }


    return (
        <nav className='bg-snitch-bg/50 backdrop-blur-lg z-50 w-screen fixed left-0 top-0 text-white flex items-center justify-between px-5 py-3'>
            <h2 className='text-2xl tracking-widest font-light font-snitch-display items-center gap-2 flex'>
                <img className='w-6' src="https://ik.imagekit.io/devakshu/img.png" alt="" />
                Snitch
            </h2>
            <div className='hidden md:flex gap-5 uppercase text-sm font-extralight text-snitch-text-muted'>
                <NavLink className={({ isActive }) => isActive ? "border-b text-white border-snitch-text-muted pointer-events-none" : "pointer-events-none" } to={'/product'}>Collections</NavLink>
                <NavLink className={({ isActive }) => isActive ? "border-b text-white border-snitch-text-muted" : "" } to={'/home'}>Atelier</NavLink>
                <NavLink className={({ isActive }) => isActive ? "border-b text-white border-snitch-text-muted" : "" } to={'/archive'}>Archive</NavLink>
                <NavLink className={({ isActive }) => isActive ? "border-b text-white border-snitch-text-muted" : "" } to={'/home#editorial'}>Editorial</NavLink>
            </div>


            {(user)?
                <div className='uppercase font-extralight text-sm flex gap-4 md:gap-10 items-center'>
                    <button 
                    onClick={()=>{(user.role === 'seller')?navigate('/seller/dashboard'):navigate('/profile')}}
                    className="cursor-pointer flex px-2 py-1 items-center gap-2 border border-snitch-border rounded-2xl"
                    >
                        <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12.1597 16C10.1243 16 8.29182 16.8687 7.01276 18.2556C8.38039 19.3474 10.114 20 12 20C13.9695 20 15.7727 19.2883 17.1666 18.1081C15.8956 16.8074 14.1219 16 12.1597 16ZM12 4C7.58172 4 4 7.58172 4 12C4 13.8106 4.6015 15.4807 5.61557 16.8214C7.25639 15.0841 9.58144 14 12.1597 14C14.6441 14 16.8933 15.0066 18.5218 16.6342C19.4526 15.3267 20 13.7273 20 12C20 7.58172 16.4183 4 12 4ZM12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5ZM12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7Z"></path></svg>
                        <p className='capitalize text-xs'>{user.fullname}</p>
                    </button>
                    <div className='flex items-center gap-4'>
                        <NavLink 
                        to={'/cart'}
                        className={({ isActive }) => isActive ? "border-b border-white p-1" : "nav-link" }
                        >
                            <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 6H15C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6ZM7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6H20C20.5523 6 21 6.44772 21 7V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V7C3 6.44772 3.44772 6 4 6H7ZM5 8V20H19V8H5ZM9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10H17C17 12.7614 14.7614 15 12 15C9.23858 15 7 12.7614 7 10H9Z"></path></svg>
                        </NavLink>
                        <button className='cursor-pointer' onClick={logout}>
                            <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg>
                        </button>
                    </div>
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
