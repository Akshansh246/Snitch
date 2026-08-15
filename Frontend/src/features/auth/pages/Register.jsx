import React, { useState } from 'react'
import {NavLink, Link, useNavigate} from 'react-router'
import useAuth from '../hooks/useAuth'
import { toast } from 'react-toastify'
import Ferrofluid from '../../shared/components/Ferrofluid'

const Register = () => {

    const {handleRegister} = useAuth()
    const navigate = useNavigate()

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [isSeller, setIsSeller] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault()

        if (!fullname || !fullname.trim() || !email || !email.trim() || !contact || !contact.trim() || !password) {
            toast.warn('Please fill in all required fields.')
            return
        }

        if (password.length < 6) {
            toast.warn('Password must be at least 6 characters long.')
            return
        }

        const user = await handleRegister({
            email,
            contact,
            password,
            fullname,
            isSeller
        })

        if (!user) return

        if (user.role === 'seller') {
            navigate('/seller/dashboard')
        } else {
            navigate('/home')
        }
    }

    return (
        <main className='w-full min-h-screen bg-snitch-dark-hero text-white flex items-center justify-center relative py-16 px-4 overflow-hidden font-mono'>
            {/* Background Ferrofluid Effect */}
            <div className='absolute inset-0 z-0 opacity-60 pointer-events-none'>
                <Ferrofluid
                    colors={["#ffffff", "#FAF6EE", "#DCD5C9"]}
                    speed={0.4}
                    scale={1.5}
                    turbulence={0.9}
                    fluidity={0.12}
                    rimWidth={0.25}
                    sharpness={2.5}
                    shimmer={1.2}
                    glow={2}
                    flowDirection="down"
                    opacity={0.85}
                    mouseInteraction={true}
                    mouseStrength={1}
                    mouseRadius={0.35}
                />
            </div>
            <div className='absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-snitch-dark-hero z-5 pointer-events-none' />

            <div className='w-full flex justify-between items-center p-6 absolute left-0 top-0 z-20'>
                <h2 onClick={() => navigate('/home')} className='text-2xl font-bold font-snitch-display tracking-tighter cursor-pointer text-white lowercase'>snitch</h2>
                <NavLink className={'font-mono text-xs hover:underline text-white/70 hover:text-white transition-colors'} to={'/home'}>BACK TO ATELIER</NavLink>
            </div>

            <div className='flex h-fit rounded-2xl overflow-hidden max-w-4xl w-full justify-center shadow-2xl border border-white/20 my-auto z-10 bg-black/70 backdrop-blur-xl'>
                <img className='h-[540px] hidden object-cover lg:block lg:w-1/2 opacity-90' src="https://images.unsplash.com/photo-1710023141893-5ccbe1c4ae6d?q=80&w=764&auto=format&fit=crop" alt="Register visual" />
                <div className='w-full max-w-md lg:w-1/2 bg-snitch-dark-hero/90 px-6 sm:px-10 py-8 flex flex-col gap-4 items-center justify-center text-white border-l border-white/10'>
                
                    <div className='flex flex-col items-center text-center'>
                        <h1 className='text-3xl sm:text-4xl font-snitch-display font-bold text-white'>Create Account</h1>
                        <p className='text-white/70 text-xs mt-1 font-mono'>Join the Snitch Atelier membership.</p>
                    </div>

                    <form className='flex flex-col gap-3 w-full' onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs font-mono font-semibold uppercase text-white/70' htmlFor="fullname">Full Name</label>
                            <input
                            onInput={(e)=>{setFullname(e.target.value)}}
                            value={fullname} 
                            className='!bg-white/10 p-3 rounded-full border border-white/20 w-full text-xs !text-white placeholder:text-white/70 placeholder:opacity-100 focus:border-white focus:outline-none'
                            type="text" 
                            id="fullname" 
                            placeholder='Alexander Vogue'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs font-mono font-semibold uppercase text-white/70' htmlFor="email">Email</label>
                            <input
                            onInput={(e)=>{setEmail(e.target.value)}}
                            value={email} 
                            className='!bg-white/10 p-3 rounded-full border border-white/20 w-full text-xs !text-white placeholder:text-white/70 placeholder:opacity-100 focus:border-white focus:outline-none'
                            type="email" 
                            id="email" 
                            placeholder='av@snitch.com'
                            />
                        </div>

                        <div className='flex flex-col sm:flex-row gap-3'>
                            <div className='flex flex-col gap-1 flex-1'>
                                <label className='text-xs font-mono font-semibold uppercase text-white/70' htmlFor="contact">Contact</label>
                                <input 
                                onInput={(e)=>{setContact(e.target.value)}}
                                value={contact} 
                                className='!bg-white/10 p-3 rounded-full border border-white/20 w-full text-xs !text-white placeholder:text-white/70 placeholder:opacity-100 focus:border-white focus:outline-none'
                                type="text" 
                                id="contact" 
                                placeholder='+91 0000 00 0000'
                                />
                            </div>
                            <div className='flex flex-col gap-1 flex-1'>
                                <label className='text-xs font-mono font-semibold uppercase text-white/70' htmlFor="password">Password</label>
                                <input 
                                onInput={(e)=>{setPassword(e.target.value)}}
                                value={password} 
                                className='!bg-white/10 p-3 rounded-full border border-white/20 w-full text-xs !text-white placeholder:text-white/70 placeholder:opacity-100 focus:border-white focus:outline-none'
                                type="password" 
                                id="password" 
                                placeholder='••••••••'
                                />
                            </div>
                        </div>

                        <div className='flex items-center gap-2 pt-1'>
                            <input 
                            onChange={(e)=>{setIsSeller(e.target.checked)}}
                            checked={isSeller}
                            className='w-4 h-4 cursor-pointer text-white rounded accent-white' 
                            type="checkbox" 
                            name="isSeller" 
                            id="isSeller" 
                            />
                            <label className='text-xs cursor-pointer font-mono text-white/80' htmlFor="isSeller">Register as an Authorised Seller</label>
                        </div>

                        <button className='p-3.5 w-full bg-white text-black hover:bg-white/90 rounded-full text-xs font-bold uppercase tracking-widest mt-1 cursor-pointer transition-colors shadow-md' type='submit'>Register Account</button>
                    </form>
                    
                    <p className='text-xs text-white/50 font-mono'>or</p>
                    <a href={'/api/auth/google'} className='bg-white/10 border border-white/20 text-white w-full gap-2 rounded-full p-2.5 text-xs font-semibold flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors'>
                        <img className='w-4 h-4' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png" alt="Google icon" />
                        Continue with Google
                    </a>

                    <p className='text-xs text-white/70 font-mono'>Already have an Account? <Link className='underline text-white font-bold' to={'/login'}>Sign in</Link></p>
                </div>
            </div>

        </main>
    )
}

export default Register
