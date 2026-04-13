import React, { useState } from 'react'
import {NavLink, Link, useNavigate} from 'react-router'
import useAuth from '../hooks/useAuth'

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
        await handleRegister({
            email,
            contact,
            password,
            fullname,
            isSeller
        })
        navigate('/')
    }

    return (
        <main className='w-screen h-screen text-white flex items-center justify-center'>
            <div className='w-full flex justify-between p-5 absolute left-0 top-0'>
                <img className='w-10' src="https://ik.imagekit.io/devakshu/img.png" alt="" />
                <NavLink className={'font-snitch-display font-light'} to={'/home'}>BACK TO STORE</NavLink>
            </div>

            <div className='w-full md:w-120 bg-snitch-bg/40 backdrop-blur-2xl rounded-lg px-12 py-8 flex flex-col gap-6 items-center justify-center text-snitch-text'>
                
                <div className='flex flex-col items-center'>
                    <h1 className='text-4xl font-snitch-display font-extralight'>Create Account</h1>
                    <p className='text-snitch-text-dim text-sm'>Enter your details to join Snitch.</p>
                </div>

                <form className='uppercase flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs' htmlFor="fullname">Full name</label>
                        <input
                        onInput={(e)=>{setFullname(e.target.value)}}
                        value={fullname} 
                        className='bg-snitch-card p-3 rounded w-full'
                        type="text" 
                        id="fullname" 
                        placeholder='Alexander Vogue'
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs' htmlFor="email">Email</label>
                        <input
                        onInput={(e)=>{setEmail(e.target.value)}}
                        value={email} 
                        className='bg-snitch-card p-3 rounded w-full'
                        type="email" 
                        id="email" 
                        placeholder='av@snitch.com'
                        />
                    </div>

                    <div className='flex gap-10'>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs' htmlFor="contact">Contact</label>
                            <input 
                            onInput={(e)=>{setContact(e.target.value)}}
                            value={contact} 
                            className='bg-snitch-card p-3 rounded w-full'
                            type="text" 
                            id="contact" 
                            placeholder='+91 ...'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs' htmlFor="password">Password</label>
                            <input 
                            onInput={(e)=>{setPassword(e.target.value)}}
                            value={password} 
                            className='bg-snitch-card p-3 rounded w-full'
                            type="password" 
                            id="password" 
                            placeholder='******'
                            />
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <input 
                        onInput={(e)=>{setIsSeller(e.target.value)}}
                        value={isSeller}
                        className='w-5' 
                        type="checkbox" 
                        name="isSeller" 
                        id="isSeller" 
                        />
                        <label className='text-xs cursor-pointer capitalize' htmlFor="isSeller">Wanna become a Seller?</label>
                    </div>

                    <button className='p-3 w-full btn' type='submit'>Register Account</button>
                </form>

                <p className='text-sm'>Or continue with</p>
                <div className='bg-snitch-card w-full gap-2 rounded p-3 text-sm flex items-center justify-center cursor-pointer'>
                    <img className='w-6' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png" alt="" />
                    Google
                </div>

                <p className='text-sm'>Already have an Account? <Link className='underline' to={'/login'}>Sign in</Link></p>
            </div>

        </main>
    )
}

export default Register
