import React from 'react'
import { NavLink, Link } from 'react-router'
import Footer from '../components/Footer'

const Login = () => {
    return (
        <main className='w-screen h-screen text-white flex items-center justify-center'>
            <div className='w-full flex justify-between p-5 absolute left-0 top-0'>
                <img className='w-10' src="https://ik.imagekit.io/devakshu/img.png" alt="" />
                <NavLink className={'font-snitch-display font-light'} to={'/home'}>BACK TO STORE</NavLink>
            </div>

            <div className='w-full md:w-120 bg-snitch-bg/40 backdrop-blur-2xl rounded-lg px-12 py-8 flex flex-col gap-6 items-center justify-center text-snitch-text'>
                
                <div className='flex flex-col items-center'>
                    <h1 className='text-4xl font-snitch-display font-extralight'>Welcome Back</h1>
                    <p className='text-snitch-text-dim text-sm'>Enter your details to access Snitch.</p>
                </div>

                <form className='uppercase flex flex-col gap-4 w-full'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs' htmlFor="email">Email</label>
                        <input 
                        className='bg-snitch-card p-3 rounded w-full'
                        type="email" 
                        id="email" 
                        placeholder='av@snitch.com'
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-xs' htmlFor="password">Password</label>
                        <input 
                        className='bg-snitch-card p-3 rounded w-full'
                        type="password" 
                        id="password" 
                        placeholder='******'
                        />
                    </div>

                    <button className='p-3 w-full btn' type='submit'>Log in</button>
                </form>

                <p className='text-sm'>Or continue with</p>
                <div className='bg-snitch-card w-full gap-2 rounded p-3 text-sm flex items-center justify-center cursor-pointer'>
                    <img className='w-6' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png" alt="" />
                    Google
                </div>

                <p className='text-sm'>New to Snitch? <Link className='underline' to={'/register'}>Create Account</Link></p>
            </div>


            <Footer/>
        </main>
    )
}

export default Login
