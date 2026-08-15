/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router'
import useAuth from '../../auth/hooks/useAuth'
import { toast } from 'react-toastify'
import { useCart } from '../../cart/hooks/useCart'

const Navbar = () => {

    const {handleLogout} = useAuth()
    const user = useSelector(state => state.auth.user)
    const cartItems = useSelector(state => state.cart.items)
    const navigate = useNavigate()
    const { handleGetCart } = useCart()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    async function logout() {
        await handleLogout()
        toast('Logged Out Successfully!')
        navigate('/')
    }

    useEffect(()=>{
        handleGetCart()
    },[])

    const handleNewCollectionClick = (e) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        if (window.location.pathname === '/home') {
            const el = document.getElementById('editorial');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            navigate('/home');
        }
    };

    return (
        <>
            <nav className='bg-snitch-bg/90 backdrop-blur-md z-50 w-full fixed left-0 top-0 text-snitch-text flex items-center justify-between px-4 sm:px-8 py-3 border-b border-snitch-border/30'>
                {/* Left: Mobile hamburger & Logo */}
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
                    <h2 onClick={() => navigate('/')} className='text-2xl md:text-3xl tracking-tighter font-extrabold font-snitch-display items-center gap-2 flex cursor-pointer text-snitch-text lowercase'>
                        snitch
                    </h2>
                </div>

                {/* Center: Search Bar Pill (Matching reference image style) */}
                <div className='hidden sm:flex items-center relative w-64 md:w-80'>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search"
                        className="w-full pill-search px-4 py-1.5 text-xs text-snitch-text placeholder-snitch-text-muted focus:outline-none"
                    />
                    <button className="absolute right-3 text-snitch-text-muted hover:text-snitch-text cursor-pointer">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </div>

                {/* Right: Menu Links & Actions */}
                <div className='flex items-center gap-4 sm:gap-6'>
                    <div className='hidden lg:flex items-center gap-1 text-xs uppercase font-medium tracking-wider text-snitch-text border border-snitch-text/30 px-3 py-1.5 rounded-full bg-snitch-surface/60'>
                        <NavLink className={({ isActive }) => isActive ? "font-bold text-snitch-text px-2" : "hover:text-black/60 px-2 transition-colors"} to={'/'}>Snitch</NavLink>
                        <span className='text-snitch-border'>|</span>
                        <NavLink className={({ isActive }) => isActive ? "font-bold text-snitch-text px-2" : "hover:text-black/60 px-2 transition-colors"} to={'/home'}>Shop</NavLink>
                        <span className='text-snitch-border'>|</span>
                        <a href="#editorial" onClick={handleNewCollectionClick} className="hover:text-black/60 px-2 transition-colors cursor-pointer">New collection</a>
                        {user?.role === 'seller' && (
                            <>
                                <span className='text-snitch-border'>|</span>
                                <NavLink className={({ isActive }) => isActive ? "font-bold text-snitch-text px-2" : "hover:text-black/60 px-2 transition-colors"} to={'/seller/dashboard'}>Seller</NavLink>
                            </>
                        )}
                    </div>

                    {user ? (
                        <div className='flex items-center gap-3'>
                            {user?.role === 'seller' && (
                                <button 
                                    onClick={() => navigate('/seller/dashboard')}
                                    className="btn text-xs px-3 py-1 font-bold uppercase tracking-wider hidden sm:flex items-center gap-1.5 shadow-sm"
                                    title="Open Seller Dashboard"
                                >
                                    Seller Dashboard
                                </button>
                            )}
                            <button 
                                onClick={() => navigate('/profile')}
                                className="cursor-pointer flex px-2.5 py-1 items-center gap-1.5 border border-snitch-border rounded-full hover:bg-snitch-surface transition-colors"
                                title="View User Profile"
                            >
                                <svg className='w-4 h-4 text-snitch-text' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12.1597 16C10.1243 16 8.29182 16.8687 7.01276 18.2556C8.38039 19.3474 10.114 20 12 20C13.9695 20 15.7727 19.2883 17.1666 18.1081C15.8956 16.8074 14.1219 16 12.1597 16ZM12 4C7.58172 4 4 7.58172 4 12C4 13.8106 4.6015 15.4807 5.61557 16.8214C7.25639 15.0841 9.58144 14 12.1597 14C14.6441 14 16.8933 15.0066 18.5218 16.6342C19.4526 15.3267 20 13.7273 20 12C20 7.58172 16.4183 4 12 4ZM12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5ZM12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7Z"/>
                                </svg>
                                <span className='capitalize text-xs font-semibold truncate hidden sm:block text-snitch-text'>{user.fullname}</span>
                            </button>
                            <NavLink 
                                to={'/wishlist'}
                                className="p-1.5 relative text-snitch-text hover:opacity-80 transition-opacity"
                                title="Wishlist"
                            >
                                <svg className='w-5 h-5 fill-current text-red-500' viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                            </NavLink>
                            <NavLink 
                                to={'/cart'}
                                className="p-1.5 relative text-snitch-text hover:opacity-80 transition-opacity"
                                title="Cart"
                            >
                                <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 6H15C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6ZM7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6H20C20.5523 6 21 6.44772 21 7V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V7C3 6.44772 3.44772 6 4 6H7ZM5 8V20H19V8H5ZM9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10H17C17 12.7614 14.7614 15 12 15C9.23858 15 7 12.7614 7 10H9Z"/>
                                </svg>
                                {cartItems.length > 0 && (
                                    <div className='text-[9px] font-bold absolute -right-1 -top-1 bg-snitch-btn text-snitch-neutral px-1.5 py-0.2 rounded-full'>{cartItems.length}</div>
                                )}
                            </NavLink>
                            <button className='cursor-pointer p-1 text-snitch-text-muted hover:text-snitch-text' onClick={logout} title="Logout">
                                <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"/>
                                </svg>
                            </button>
                        </div>
                    ) : ( 
                        <div className='flex gap-3 uppercase font-medium text-xs'>
                            <NavLink className='hover:opacity-75 transition-opacity text-snitch-text' to={'/login'}>Login</NavLink>
                            <span className='text-snitch-border'>/</span>
                            <NavLink className='hover:opacity-75 transition-opacity text-snitch-text' to={'/register'}>Register</NavLink>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className='fixed inset-0 z-40 bg-snitch-bg/95 backdrop-blur-xl md:hidden pt-20 px-6 flex flex-col gap-5 text-base uppercase font-medium text-snitch-text border-b border-snitch-border'>
                    <div className='relative w-full mb-2'>
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search"
                            className="w-full pill-search px-4 py-2 text-xs text-snitch-text placeholder-snitch-text-muted focus:outline-none"
                        />
                    </div>
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='py-2 border-b border-snitch-border/40' to={'/home'}>Snitch Atelier</NavLink>
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='py-2 border-b border-snitch-border/40' to={'/home'}>Shop Collection</NavLink>
                    <a href="#editorial" onClick={handleNewCollectionClick} className='py-2 border-b border-snitch-border/40 cursor-pointer'>New Collection</a>
                    {user?.role === 'seller' && (
                        <NavLink onClick={() => setMobileMenuOpen(false)} className='py-2 border-b border-snitch-border/40 font-semibold' to={'/seller/dashboard'}>Seller Portal</NavLink>
                    )}
                    <NavLink onClick={() => setMobileMenuOpen(false)} className='py-2 border-b border-snitch-border/40' to={'/cart'}>Bag ({cartItems.length})</NavLink>
                </div>
            )}
        </>
    )
}

export default Navbar
