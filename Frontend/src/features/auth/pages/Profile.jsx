import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router'
import useAuth from '../hooks/useAuth'
import Navbar from '../../shared/components/Navbar'

const Profile = () => {
    const user = useSelector(state => state.auth.user)
    const wishlistItems = useSelector(state => state.wishlist?.items || [])
    const { handleUpdateProfile } = useAuth()
    const navigate = useNavigate()

    const [isEditing, setIsEditing] = useState(false)
    const [fullname, setFullname] = useState(user?.fullname || '')
    const [contact, setContact] = useState(user?.contact || '')
    const [bio, setBio] = useState(user?.bio || '')
    const [avatar, setAvatar] = useState(user?.avatar || '')

    const [street, setStreet] = useState(user?.address?.street || '')
    const [city, setCity] = useState(user?.address?.city || '')
    const [stateVal, setStateVal] = useState(user?.address?.state || '')
    const [zipcode, setZipcode] = useState(user?.address?.zipcode || '')
    const [country, setCountry] = useState(user?.address?.country || 'India')

    async function handleSubmit(e) {
        e.preventDefault()
        const updated = await handleUpdateProfile({
            fullname,
            contact,
            bio,
            avatar,
            address: {
                street,
                city,
                state: stateVal,
                zipcode,
                country
            }
        })
        if (updated) {
            setIsEditing(false)
        }
    }

    if (!user) {
        return (
            <div className='w-full min-h-screen bg-snitch-bg text-snitch-text flex items-center justify-center pt-24'>
                <Navbar />
                <div className='flex flex-col items-center gap-4 text-center'>
                    <h2 className='text-2xl font-snitch-display font-bold'>Session Expired</h2>
                    <p className='text-xs text-snitch-text-muted font-mono'>Please log in to view your Snitch Atelier profile.</p>
                    <Link to="/login" className="btn px-6 py-2.5 text-xs font-semibold">Sign In</Link>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full min-h-screen bg-snitch-bg text-snitch-text overflow-x-hidden font-mono'>
            <Navbar />

            <div className='w-full max-w-5xl mx-auto pt-28 pb-20 px-4 sm:px-8 flex flex-col gap-8'>
                
                {/* Profile Header Banner */}
                <div className='bg-snitch-surface rounded-2xl p-6 sm:p-10 border border-snitch-border/40 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden'>
                    <div className='w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-snitch-card border-2 border-snitch-border shrink-0 flex items-center justify-center text-3xl font-bold font-snitch-display text-snitch-text shadow-inner'>
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.fullname} className='w-full h-full object-cover' />
                        ) : (
                            user.fullname?.[0]?.toUpperCase()
                        )}
                    </div>

                    <div className='flex flex-col gap-2 text-center sm:text-left flex-1'>
                        <div className='flex flex-wrap items-center justify-center sm:justify-start gap-3'>
                            <h1 className='text-2xl sm:text-4xl font-bold font-snitch-display tracking-tight text-snitch-text'>{user.fullname}</h1>
                            <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border ${
                                user.role === 'seller' 
                                    ? 'bg-snitch-dark-hero text-white border-black' 
                                    : 'bg-snitch-bg text-snitch-text border-snitch-border'
                            }`}>
                                {user.role === 'seller' ? 'Authorised Curator (Seller)' : 'Atelier Member'}
                            </span>
                        </div>

                        <p className='text-xs text-snitch-text-muted'>{user.email} • {user.contact || 'No contact added'}</p>
                        {user.bio && <p className='text-xs text-snitch-text-dim italic mt-1 max-w-lg'>"{user.bio}"</p>}
                    </div>

                    <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0'>
                        <button 
                            onClick={() => setIsEditing(!isEditing)} 
                            className='btn px-4 py-2 text-xs font-semibold tracking-wider uppercase text-center'
                        >
                            {isEditing ? 'Cancel Edit' : 'Edit Profile & Address'}
                        </button>
                    </div>
                </div>

                {/* Quick Navigation Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <div onClick={() => navigate('/orders')} className='bg-snitch-surface p-5 rounded-2xl border border-snitch-border/40 hover:border-snitch-text/40 transition-colors cursor-pointer flex items-center gap-4'>
                        <div className='p-3 bg-snitch-bg rounded-xl text-snitch-text'>
                            <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM5 7H19V19H5V7ZM7 9V11H17V9H7ZM7 13V15H14V13H7Z"/>
                            </svg>
                        </div>
                        <div className='flex flex-col'>
                            <h4 className='font-bold text-sm text-snitch-text'>My Orders</h4>
                            <p className='text-[11px] text-snitch-text-muted'>Track active & past shipments</p>
                        </div>
                    </div>

                    <div onClick={() => navigate('/wishlist')} className='bg-snitch-surface p-5 rounded-2xl border border-snitch-border/40 hover:border-snitch-text/40 transition-colors cursor-pointer flex items-center gap-4'>
                        <div className='p-3 bg-snitch-bg rounded-xl text-snitch-text'>
                            <svg className='w-6 h-6 text-red-500 fill-current' viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </div>
                        <div className='flex flex-col'>
                            <h4 className='font-bold text-sm text-snitch-text'>Wishlist ({wishlistItems.length})</h4>
                            <p className='text-[11px] text-snitch-text-muted'>View saved wardrobe pieces</p>
                        </div>
                    </div>

                    {user.role === 'seller' ? (
                        <div onClick={() => navigate('/seller/dashboard')} className='bg-snitch-dark-hero text-white p-5 rounded-2xl border border-black hover:scale-[1.02] transition-transform cursor-pointer flex items-center gap-4 shadow-md'>
                            <div className='p-3 bg-white/10 rounded-xl text-white'>
                                <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                                </svg>
                            </div>
                            <div className='flex flex-col'>
                                <h4 className='font-bold text-sm text-white'>Seller Dashboard →</h4>
                                <p className='text-[11px] text-white/70'>Manage shop & inventory</p>
                            </div>
                        </div>
                    ) : (
                        <div 
                            onClick={async () => {
                                const res = await handleUpdateProfile({ role: 'seller' })
                                if (res) navigate('/seller/dashboard')
                            }} 
                            className='bg-snitch-surface p-5 rounded-2xl border border-snitch-border/60 hover:border-snitch-text transition-colors cursor-pointer flex items-center gap-4 shadow-xs'
                        >
                            <div className='p-3 bg-snitch-dark-hero rounded-xl text-white'>
                                <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                                </svg>
                            </div>
                            <div className='flex flex-col'>
                                <h4 className='font-bold text-sm text-snitch-text'>Become a Seller</h4>
                                <p className='text-[11px] text-snitch-text-muted'>Enable Curator Account & Shop</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Edit Form or View Address & Bio */}
                {isEditing ? (
                    <form onSubmit={handleSubmit} className='bg-snitch-surface p-6 sm:p-8 rounded-2xl border border-snitch-border/40 flex flex-col gap-6'>
                        <div className='border-b border-snitch-border/40 pb-3'>
                            <h3 className='text-lg font-bold font-snitch-display text-snitch-text'>Edit Personal & Delivery Details</h3>
                            <p className='text-xs text-snitch-text-muted'>Update your personal details and primary shipping destination stored in MongoDB.</p>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div className='flex flex-col gap-1'>
                                <label className='text-xs uppercase font-bold text-snitch-text-muted'>Full Name</label>
                                <input 
                                    type="text"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    className='bg-snitch-bg p-3 rounded-full border border-snitch-border text-xs text-snitch-text focus:outline-none'
                                    required
                                />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='text-xs uppercase font-bold text-snitch-text-muted'>Contact Number</label>
                                <input 
                                    type="text"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    className='bg-snitch-bg p-3 rounded-full border border-snitch-border text-xs text-snitch-text focus:outline-none'
                                />
                            </div>

                            <div className='flex flex-col gap-1 sm:col-span-2'>
                                <label className='text-xs uppercase font-bold text-snitch-text-muted'>Avatar Image URL</label>
                                <input 
                                    type="text"
                                    value={avatar}
                                    onChange={(e) => setAvatar(e.target.value)}
                                    placeholder='https://images.unsplash.com/photo-...'
                                    className='bg-snitch-bg p-3 rounded-full border border-snitch-border text-xs text-snitch-text focus:outline-none'
                                />
                            </div>

                            <div className='flex flex-col gap-1 sm:col-span-2'>
                                <label className='text-xs uppercase font-bold text-snitch-text-muted'>Personal Bio</label>
                                <textarea 
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder='Collector of minimal textile arts...'
                                    className='bg-snitch-bg p-3 rounded-2xl border border-snitch-border text-xs text-snitch-text focus:outline-none h-20'
                                />
                            </div>
                        </div>

                        {/* Shipping Address Section */}
                        <div className='border-t border-snitch-border/40 pt-4 flex flex-col gap-4'>
                            <h4 className='text-sm uppercase font-bold text-snitch-text tracking-wider'>Default Shipping Address</h4>
                            
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div className='flex flex-col gap-1 sm:col-span-2'>
                                    <label className='text-xs uppercase font-bold text-snitch-text-muted'>Street Address</label>
                                    <input 
                                        type="text"
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                        placeholder='Flat 402, High Street Towers'
                                        className='bg-snitch-bg p-3 rounded-full border border-snitch-border text-xs text-snitch-text focus:outline-none'
                                    />
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <label className='text-xs uppercase font-bold text-snitch-text-muted'>City</label>
                                    <input 
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder='Mumbai'
                                        className='bg-snitch-bg p-3 rounded-full border border-snitch-border text-xs text-snitch-text focus:outline-none'
                                    />
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <label className='text-xs uppercase font-bold text-snitch-text-muted'>State</label>
                                    <input 
                                        type="text"
                                        value={stateVal}
                                        onChange={(e) => setStateVal(e.target.value)}
                                        placeholder='Maharashtra'
                                        className='bg-snitch-bg p-3 rounded-full border border-snitch-border text-xs text-snitch-text focus:outline-none'
                                    />
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <label className='text-xs uppercase font-bold text-snitch-text-muted'>Zip / Pin Code</label>
                                    <input 
                                        type="text"
                                        value={zipcode}
                                        onChange={(e) => setZipcode(e.target.value)}
                                        placeholder='400001'
                                        className='bg-snitch-bg p-3 rounded-full border border-snitch-border text-xs text-snitch-text focus:outline-none'
                                    />
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <label className='text-xs uppercase font-bold text-snitch-text-muted'>Country</label>
                                    <input 
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        placeholder='India'
                                        className='bg-snitch-bg p-3 rounded-full border border-snitch-border text-xs text-snitch-text focus:outline-none'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-end gap-3 pt-2'>
                            <button type="button" onClick={() => setIsEditing(false)} className='px-5 py-2.5 rounded-full border border-snitch-border text-xs font-semibold uppercase text-snitch-text-muted hover:text-snitch-text transition-colors'>Cancel</button>
                            <button type="submit" className='btn px-6 py-2.5 text-xs font-bold uppercase tracking-wider'>Save Changes</button>
                        </div>
                    </form>
                ) : (
                    <div className='bg-snitch-surface p-6 sm:p-8 rounded-2xl border border-snitch-border/40 flex flex-col gap-6'>
                        <div className='flex justify-between items-center border-b border-snitch-border/40 pb-3'>
                            <h3 className='text-lg font-bold font-snitch-display text-snitch-text'>Primary Shipping Address</h3>
                            <button onClick={() => setIsEditing(true)} className='text-xs font-semibold underline text-snitch-text hover:opacity-80'>Edit</button>
                        </div>

                        {user.address && (user.address.street || user.address.city) ? (
                            <div className='flex flex-col gap-1 text-xs text-snitch-text font-mono'>
                                <p className='font-bold text-sm'>{user.fullname}</p>
                                <p>{user.address.street}</p>
                                <p>{user.address.city}{user.address.state ? `, ${user.address.state}` : ''} {user.address.zipcode}</p>
                                <p className='font-semibold text-snitch-text-muted uppercase pt-1'>{user.address.country || 'India'}</p>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-2 py-4 items-center justify-center text-center'>
                                <p className='text-xs text-snitch-text-muted'>No default delivery address added yet.</p>
                                <button onClick={() => setIsEditing(true)} className='btn px-4 py-2 text-xs font-bold uppercase'>Add Address</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile
