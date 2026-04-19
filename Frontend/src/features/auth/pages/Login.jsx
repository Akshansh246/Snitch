import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth';

const Login = () => {

    const { handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault()

        const user = await handleLogin({email, password})

        if(user.role === 'buyer'){
            navigate('/')
        }else if(user.role === 'seller'){
            navigate('/seller/dashboard')
        }
    }

    return (
        <main className='w-screen h-screen text-white flex items-center justify-center'>
            <div className='w-full flex justify-between p-5 absolute left-0 top-0'>
                <img className='w-10' src="https://ik.imagekit.io/devakshu/img.png" alt="" />
                <NavLink className={'font-snitch-display font-light'} to={'/home'}>BACK TO STORE</NavLink>
            </div>

            <div className='w-full md:w-120 bg-snitch-bg/40 backdrop-blur-2xl rounded-lg px-12 py-8 flex flex-col gap-5 items-center justify-center text-snitch-text'>
                
                <div className='flex flex-col items-center'>
                    <h1 className='text-4xl font-snitch-display font-extralight'>Welcome Back</h1>
                    <p className='text-snitch-text-dim text-sm'>Enter your details to access Snitch.</p>
                </div>

                <form onSubmit={handleSubmit} className='uppercase flex flex-col gap-5 w-full'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs' htmlFor="email">Email</label>
                        <input 
                        value={email}
                        onInput={(e)=>{
                            setEmail(e.target.value)
                        }}
                        className='bg-snitch-card p-3 rounded w-full'
                        type="email" 
                        id="email" 
                        placeholder='av@snitch.com'
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-xs' htmlFor="password">Password</label>
                        <input 
                        value={password}
                        onInput={(e)=>{
                            setPassword(e.target.value)
                        }}
                        className='bg-snitch-card p-3 rounded w-full'
                        type="password" 
                        id="password" 
                        placeholder='******'
                        />
                    </div>

                    <button className='p-3 w-full btn' type='submit'>Log in</button>
                </form>
                
                <p>or</p>
                <a href={'/api/auth/google'} className='bg-white text-black w-full gap-2 rounded p-3 text-sm flex items-center justify-center cursor-pointer'>
                    <img className='w-6' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png" alt="" />
                    Continue with Google
                </a>

                <p className='text-sm'>New to Snitch? <Link className='underline' to={'/register'}>Create Account</Link></p>
            </div>

        </main>
    )
}

export default Login
