import React, { useState } from 'react'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import Ferrofluid from '../../shared/components/Ferrofluid'

const Home = () => {
    const user = useSelector(state => state.auth.user)
    const [wishlist, setWishlist] = useState({})

    const toggleWishlist = (id) => {
        setWishlist(prev => ({ ...prev, [id]: !prev[id] }))
    }

    const bestsellers = [
        { id: 'b1', name: 'JACKET', price: '$999', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=700&auto=format&fit=crop' },
        { id: 'b2', name: 'BAG', price: '$1299', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=700&auto=format&fit=crop' },
        { id: 'b3', name: 'GLASSES', price: '$759', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=700&auto=format&fit=crop' },
        { id: 'b4', name: 'LONGSLEEVE', price: '$459', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=700&auto=format&fit=crop' }
    ]

    return (
        <div className='bg-snitch-bg text-snitch-text w-full overflow-x-hidden'>

            {/* ── HERO SECTION (Moody Dark Cyan-Black with Ferrofluid background) ── */}
            <div className='w-full min-h-screen relative flex flex-col justify-between bg-snitch-dark-hero text-white pt-20 pb-12 px-6 sm:px-12 overflow-hidden'>
                {/* Background Ferrofluid Effect */}
                <div className='absolute inset-0 z-0 opacity-60 pointer-events-none'>
                    <Ferrofluid
                        colors={["#ffffff", "#FAF6EE", "#DCD5C9"]}
                        speed={0.4}
                        scale={1.4}
                        turbulence={0.8}
                        fluidity={0.15}
                        rimWidth={0.25}
                        sharpness={2.5}
                        shimmer={1}
                        glow={1.8}
                        flowDirection="down"
                        opacity={0.85}
                        mouseInteraction={true}
                        mouseStrength={1}
                        mouseRadius={0.3}
                    />
                </div>
                <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-snitch-dark-hero z-10 pointer-events-none' />

                {/* Top Spacer */}
                <div className='relative z-20 w-full flex justify-end items-center pt-4'>
                    <span className='text-xs uppercase tracking-[4px] text-white/70'>Spring / Summer Curation</span>
                </div>

                {/* Main Hero Editorial Title ("snitch") */}
                <div className='relative z-20 w-full my-auto flex flex-col items-center justify-center text-center py-12'>
                    <h1 className='text-7xl sm:text-9xl lg:text-[14rem] font-bold font-snitch-display leading-none tracking-tighter text-white select-none drop-shadow-2xl lowercase'>
                        snitch
                    </h1>
                    
                    {/* Floating Pill Menu Overlay (Matching Reference Image) */}
                    <div className='mt-8 flex items-center gap-3 px-5 py-2 pill-nav text-xs font-medium tracking-wider uppercase text-black shadow-2xl'>
                        <span className='font-bold cursor-pointer'>Snitch</span>
                        <span className='text-black/30'>|</span>
                        <Link to="/home" className='hover:opacity-75 transition-opacity'>Shop</Link>
                        <span className='text-black/30'>|</span>
                        <a href="#editorial" className='hover:opacity-75 transition-opacity'>New collection</a>
                        <span className='text-black/30'>|</span>
                        <a href="#bestsellers" className='hover:opacity-75 transition-opacity'>About</a>
                    </div>
                </div>

                {/* Subtitle & Action */}
                <div className='relative z-20 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/20 text-white/90'>
                    <p className='text-xs sm:text-sm font-light max-w-md text-center sm:text-left leading-relaxed'>
                        A study in light, form, and precision. Crafting luxury silhouettes for the modern atelier.
                    </p>
                    <div className='flex gap-3'>
                        <Link to={'/home'} className='btn px-6 py-3 text-xs font-semibold'>Explore Atelier</Link>
                        {!user && (
                            <Link to={'/register'} className='px-6 py-3 rounded-full border border-white/40 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all'>Register</Link>
                        )}
                    </div>
                </div>
            </div>


            {/* ── BESTSELLER NOW SECTION (Warm Cream Palette matching reference image) ── */}
            <div id='bestsellers' className='w-full min-h-screen bg-snitch-bg text-snitch-text py-20 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col gap-12'>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-3xl sm:text-5xl font-mono font-medium tracking-tight text-snitch-text'>Bestseller Now</h2>
                </div>

                {/* Bestsellers Grid */}
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 items-end'>
                    {bestsellers.map((item) => (
                        <div key={item.id} className='flex flex-col gap-3 group'>
                            <div className='w-full aspect-[3/4] bg-snitch-surface rounded-lg overflow-hidden relative border border-snitch-border/40'>
                                <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
                                <button 
                                    onClick={() => toggleWishlist(item.id)}
                                    className='absolute top-3 right-3 text-snitch-text/80 hover:text-red-500 transition-colors p-1 cursor-pointer'
                                    aria-label="Wishlist"
                                >
                                    <svg className={`w-5 h-5 ${wishlist[item.id] ? 'fill-red-500 text-red-500' : 'fill-none stroke-current'}`} viewBox="0 0 24 24" strokeWidth="2">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                    </svg>
                                </button>
                            </div>
                            <div className='flex justify-between items-center text-xs font-mono tracking-wider pt-1'>
                                <span className='font-semibold text-snitch-text'>{item.name}</span>
                                <span className='text-snitch-text-muted font-bold'>{item.price}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* BUY NOW CTA Underline (Matching Reference Image) */}
                <div className='flex justify-end pt-8'>
                    <Link to={'/home'} className='font-mono text-2xl sm:text-4xl font-semibold tracking-wider border-b-2 border-snitch-text pb-1 hover:opacity-75 transition-opacity text-snitch-text flex items-center gap-2'>
                        BUY NOW<span className='text-xl sm:text-3xl'>→</span>
                    </Link>
                </div>
            </div>


            {/* ── EDITORIAL SECTION (Google Stitch MCP Inspired High-End Curation) ── */}
            <div id='editorial' className='py-24 px-6 sm:px-12 bg-snitch-surface text-snitch-text border-t border-snitch-border/40 min-h-screen flex items-center justify-center font-mono'>
                <div className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center'>
                    {/* Left Editorial Narrative */}
                    <div className='w-full lg:w-5/12 flex flex-col gap-8'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex items-center gap-2'>
                                <span className='w-2.5 h-2.5 rounded-full bg-snitch-text' />
                                <span className='uppercase text-xs tracking-[5px] text-snitch-text-muted font-bold'>Atelier Editorial Curation</span>
                            </div>
                            <h3 className='font-bold text-4xl sm:text-5xl text-snitch-text font-snitch-display leading-tight tracking-tight'>The Unspoken Silhouette</h3>
                            <p className='text-xs sm:text-sm text-snitch-text-muted leading-relaxed font-light'>We believe that luxury is not loud. It resides in the tactile quality of a weighted wool coat, the drape of silk against skin, and the intentional absence of unnecessary detail.</p>
                        </div>

                        {/* Feature Pillars */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2'>
                            <div className='flex flex-col gap-2 p-4 bg-snitch-bg/80 rounded-2xl border border-snitch-border/50 shadow-xs hover:border-snitch-text/50 transition-colors'>
                                <span className='text-2xl font-bold font-snitch-display text-snitch-text'>01</span>
                                <h5 className='uppercase text-xs font-bold text-snitch-text tracking-wider'>Heritage Craft</h5>
                                <p className='text-xs text-snitch-text-muted leading-relaxed font-light'>Artisan construction techniques passed through master tailors.</p>
                            </div>
                            <div className='flex flex-col gap-2 p-4 bg-snitch-bg/80 rounded-2xl border border-snitch-border/50 shadow-xs hover:border-snitch-text/50 transition-colors'>
                                <span className='text-2xl font-bold font-snitch-display text-snitch-text'>02</span>
                                <h5 className='uppercase text-xs font-bold text-snitch-text tracking-wider'>Eternal Design</h5>
                                <p className='text-xs text-snitch-text-muted leading-relaxed font-light'>Garments engineered to transcend fleeting stylistic trends.</p>
                            </div>
                        </div>

                        <div className='pt-2'>
                            <Link to='/home' className='btn py-3.5 px-8 text-xs font-bold tracking-widest inline-flex items-center gap-2 shadow-md hover:scale-[1.02] transition-transform'>
                                EXPLORE EDITORIAL COLLECTION →
                            </Link>
                        </div>
                    </div>

                    {/* Right Asymmetric Gallery (Stitch MCP Layout) */}
                    <div className='w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center'>
                        <div className='flex flex-col gap-6'>
                            <div className='relative rounded-2xl overflow-hidden border border-snitch-border/50 shadow-md group aspect-[3/4]'>
                                <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' src="https://images.unsplash.com/photo-1770795945913-e9093b8e704e?q=80&w=687&auto=format&fit=crop" alt="Editorial look 1" />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80' />
                                <div className='absolute bottom-4 left-4 right-4 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white'>
                                    <p className='text-[10px] uppercase tracking-widest font-bold text-white/70'>Curator Monograph</p>
                                    <p className='italic text-xs font-serif mt-0.5'>"Black and ivory exist in perfect harmonic balance."</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-6 sm:-mt-8'>
                            <div className='relative rounded-2xl overflow-hidden border border-snitch-border/50 shadow-md group aspect-[4/3]'>
                                <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' src="https://images.unsplash.com/photo-1660982238213-eeef93d9dc16?q=80&w=687&auto=format&fit=crop" alt="Editorial detail 2" />
                                <div className='absolute top-3 left-3 px-2.5 py-1 bg-snitch-dark-hero/90 text-white text-[10px] uppercase font-bold tracking-widest rounded-full backdrop-blur-md'>
                                    Textile Art
                                </div>
                            </div>

                            <div className='relative rounded-2xl overflow-hidden border border-snitch-border/50 shadow-md group aspect-[4/3]'>
                                <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' src="https://images.unsplash.com/photo-1773394170406-6e3e9402424a?q=80&w=695&auto=format&fit=crop" alt="Editorial detail 3" />
                                <div className='absolute bottom-3 right-3 px-3 py-1 bg-snitch-bg/90 text-snitch-text text-[10px] uppercase font-bold tracking-widest rounded-full backdrop-blur-md border border-snitch-border/40'>
                                    Architectural Cut
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* ── QUOTE BLOCK ── */}
            <div className='py-20 px-6 bg-snitch-bg flex justify-center items-center border-t border-snitch-border/30'>
                <div className='flex flex-col text-center gap-6 items-center max-w-3xl'>
                    <svg className='w-10 sm:w-12 text-snitch-text-muted' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.4167 6.67891C20.4469 7.77257 21.0001 9 21.0001 10.9897C21.0001 14.4891 18.5436 17.6263 14.9695 19.1768L14.0768 17.7992C17.4121 15.9946 18.0639 13.6539 18.3245 12.178C17.7875 12.4557 17.0845 12.5533 16.3954 12.4895C14.591 12.3222 13.1689 10.8409 13.1689 9C13.1689 7.067 14.7359 5.5 16.6689 5.5C17.742 5.5 18.7681 5.99045 19.4167 6.67891ZM9.41669 6.67891C10.4469 7.77257 11.0001 9 11.0001 10.9897C11.0001 14.4891 8.54359 17.6263 4.96951 19.1768L4.07682 17.7992C7.41206 15.9946 8.06392 13.6539 8.32447 12.178C7.78747 12.4557 7.08452 12.5533 6.39539 12.4895C4.59102 12.3222 3.16895 10.8409 3.16895 9C3.16895 7.067 4.73595 5.5 6.66895 5.5C7.742 5.5 8.76814 5.99045 9.41669 6.67891Z"></path></svg>
                    <h2 className='text-xl sm:text-3xl lg:text-4xl font-light font-snitch-display leading-snug text-snitch-text'>We do not design clothes for the crowd. We design for the individual who finds power in <span className='font-bold italic'>silence</span>.</h2>
                    <p className='uppercase tracking-[6px] text-xs font-semibold text-snitch-text-muted'>- Snitch Atelier Creative Director</p>
                </div>
            </div>


            {/* ── FOOTER ── */}
            <footer className='w-full px-6 sm:px-12 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-snitch-border/40 bg-snitch-bg text-snitch-text'>
                <div className='text-center sm:text-left'>
                    <p className='font-bold text-xl font-snitch-display text-snitch-text lowercase'>snitch</p>
                    <p className='text-snitch-text-muted text-xs mt-1'>© 2026 Snitch Atelier. All Rights Reserved.</p>
                </div>
                <div className='flex gap-4 text-snitch-text-muted text-xs font-medium uppercase tracking-wider'>
                    <Link to="/home" className="hover:text-snitch-text transition-colors">Privacy</Link>
                    <span>/</span>
                    <Link to="/home" className="hover:text-snitch-text transition-colors">Terms</Link>
                    <span>/</span>
                    <Link to="/home" className="hover:text-snitch-text transition-colors">Contact</Link>
                </div>
            </footer>
        </div>
    )
}

export default Home
