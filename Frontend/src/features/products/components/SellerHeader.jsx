import React from 'react'
import { NavLink, useNavigate } from 'react-router'
import useAuth from '../../auth/hooks/useAuth'

const SellerHeader = () => {

    const {handleLogout} = useAuth()
    const navigate = useNavigate()

    async function logout() {
        await handleLogout()
        navigate('/home')
    }

    return (
        <nav className='fixed left-0 top-0 w-screen p-5 bg-snitch-bg/40 backdrop-blur-lg text-white flex justify-between'>
            <h2 className='tracking-[8px] uppercase'>Snitch Seller</h2>

            <div className='hidden md:flex uppercase gap-5 text-sm items-center text-snitch-text-muted font-extralight'>
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" } to={'/seller/dashboard'}>Dashboard</NavLink>
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" } to={'/seller/all-products'}>Inventory</NavLink>
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" } to={'/seller/drafts'}>Drafts</NavLink>
            </div>

            <div className='flex gap-5'>
                <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM12 2C16.9706 2 21 6.04348 21 11.0314V20H3V11.0314C3 6.04348 7.02944 2 12 2ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path></svg> 
                <div className='flex flex-col items-end'>
                    <p className='text-sm uppercase'>Akshansh</p>
                    <p className='text-xs text-snitch-text-muted'>PREMIUM</p>
                </div>
                <button className='cursor-pointer btn p-1' onClick={logout}>
                    <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg>
                </button>
            </div>
        </nav>
    )
}

export default SellerHeader
