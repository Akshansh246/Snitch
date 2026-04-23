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
            <h2 className='text-xl uppercase tracking-[8px] font-light font-snitch-display items-center gap-2 flex'>
                <img className='w-6' src="https://ik.imagekit.io/devakshu/img.png" alt="" />
                Snitch
            </h2>
            <div className='hidden md:flex gap-5 uppercase text-sm font-extralight text-snitch-text-muted'>
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" } to={'/'}>Collections</NavLink>
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" } to={'/home'}>Atelier</NavLink>
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" } to={'/archive'}>Archive</NavLink>
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" } to={'/home#editorial'}>Editorial</NavLink>
            </div>


            {(user)?
                <div className='uppercase font-extralight text-sm flex gap-4 md:gap-10 items-center'>
                    <button 
                    onClick={()=>{(user.role === 'seller')?navigate('/seller/dashboard'):navigate('/home')}}
                    className="cursor-pointer flex px-2 py-1 items-center gap-2 border border-snitch-border rounded-2xl"
                    >
                        <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12.1597 16C10.1243 16 8.29182 16.8687 7.01276 18.2556C8.38039 19.3474 10.114 20 12 20C13.9695 20 15.7727 19.2883 17.1666 18.1081C15.8956 16.8074 14.1219 16 12.1597 16ZM12 4C7.58172 4 4 7.58172 4 12C4 13.8106 4.6015 15.4807 5.61557 16.8214C7.25639 15.0841 9.58144 14 12.1597 14C14.6441 14 16.8933 15.0066 18.5218 16.6342C19.4526 15.3267 20 13.7273 20 12C20 7.58172 16.4183 4 12 4ZM12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5ZM12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7Z"></path></svg>
                        <p className='capitalize text-xs'>{user.fullname}</p>
                    </button>
                    <div className='flex items-center gap-4'>
                        <button className='cursor-pointer'>
                            <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.00488 9H19.9433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V9ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path></svg>
                        </button>
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
