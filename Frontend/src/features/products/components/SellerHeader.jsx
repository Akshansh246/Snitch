import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import useAuth from '../../auth/hooks/useAuth'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const SellerHeader = () => {

    const {handleLogout} = useAuth()
    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    async function logout() {
        await handleLogout()
        toast.info('Logged out successfully.')
        navigate('/')
    }

    return (
        <>
            <nav className='fixed left-0 top-0 z-50 w-full px-4 md:px-8 py-3 bg-snitch-bg/90 backdrop-blur-md text-snitch-text flex justify-between items-center border-b border-snitch-border/40 font-mono shadow-sm'>
                {/* Left Logo */}
                <div className='flex items-center gap-3'>
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className='md:hidden text-snitch-text p-1 focus:outline-none cursor-pointer'
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? (
                            <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95 1.414-1.414 4.95 4.95z"/>
                            </svg>
                        ) : (
                            <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
                            </svg>
                        )}
                    </button>
                    <div onClick={() => navigate('/seller/dashboard')} className='flex items-center gap-2 cursor-pointer'>
                        <h2 className='text-2xl md:text-3xl font-extrabold font-snitch-display tracking-tighter text-snitch-text lowercase'>
                            snitch
                        </h2>
                        <span className='text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 bg-snitch-dark-hero text-white rounded-full'>
                            Seller Portal
                        </span>
                    </div>
                </div>

                {/* Center Nav Pill */}
                <div className='hidden md:flex items-center gap-1 text-xs uppercase font-semibold tracking-wider text-snitch-text border border-snitch-border/40 px-3 py-1.5 rounded-full bg-snitch-surface/80 shadow-xs'>
                    <NavLink className={({ isActive }) => isActive ? "font-bold text-snitch-text px-3 py-1 bg-snitch-bg rounded-full shadow-xs" : "hover:text-snitch-text-muted px-3 py-1 transition-colors"} to={'/seller/dashboard'}>Dashboard</NavLink>
                    <span className='text-snitch-border'>|</span>
                    <NavLink className={({ isActive }) => isActive ? "font-bold text-snitch-text px-3 py-1 bg-snitch-bg rounded-full shadow-xs" : "hover:text-snitch-text-muted px-3 py-1 transition-colors"} to={'/seller/all-products'}>Inventory</NavLink>
                    <span className='text-snitch-border'>|</span>
                    <NavLink className={({ isActive }) => isActive ? "font-bold text-snitch-text px-3 py-1 bg-snitch-bg rounded-full shadow-xs" : "hover:text-snitch-text-muted px-3 py-1 transition-colors"} to={'/seller/drafts'}>Drafts</NavLink>
                    <span className='text-snitch-border'>|</span>
                    <NavLink className={"hover:text-snitch-text-muted px-3 py-1 transition-colors text-snitch-text-muted"} to={'/home'}>Buyer View →</NavLink>
                </div>

                {/* Right Profile & Logout */}
                <div className='flex items-center gap-3'>
                    <button 
                        onClick={() => navigate('/profile')}
                        className="cursor-pointer flex px-3 py-1 items-center gap-2 border border-snitch-border rounded-full hover:bg-snitch-surface transition-colors"
                        title="Seller Profile"
                    >
                        <div className='w-5 h-5 rounded-full bg-snitch-dark-hero text-white flex items-center justify-center text-[10px] font-bold shrink-0'>
                            {user?.fullname?.[0]?.toUpperCase() || 'S'}
                        </div>
                        <div className='flex flex-col text-left truncate hidden sm:flex'>
                            <span className='capitalize text-xs font-bold truncate text-snitch-text leading-tight'>{user?.fullname}</span>
                            <span className='text-[9px] text-snitch-text-muted uppercase font-semibold leading-tight'>Curator</span>
                        </div>
                    </button>

                    <button className='cursor-pointer p-1.5 text-snitch-text-muted hover:text-snitch-text transition-colors' onClick={logout} title="Logout">
                        <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"/>
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            {mobileMenuOpen && (
                <div className='fixed inset-0 z-40 bg-snitch-bg/95 backdrop-blur-xl md:hidden pt-20 px-6 flex flex-col gap-4 text-sm uppercase font-bold text-snitch-text border-b border-snitch-border font-mono'>
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='py-3 border-b border-snitch-border/40' to={'/seller/dashboard'}>Dashboard</NavLink>
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='py-3 border-b border-snitch-border/40' to={'/seller/all-products'}>Inventory</NavLink>
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='py-3 border-b border-snitch-border/40' to={'/seller/drafts'}>Drafts</NavLink>
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='py-3 border-b border-snitch-border/40' to={'/profile'}>Seller Profile</NavLink>
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='py-3 border-b border-snitch-border/40 text-snitch-text-muted' to={'/home'}>Return to Shop →</NavLink>
                </div>
            )}
        </>
    )
}

export default SellerHeader
