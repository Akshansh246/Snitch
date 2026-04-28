import React from 'react'
import { Link } from 'react-router'

const EmptyCart = () => {
    return (
        <div className='w-full md:h-full flex justify-center items-center py-15'>
            <div className='flex-col md:flex-row flex gap-8 md:gap-2 justify-center w-full p-5'>
                <div className='w-full md:w-1/3 flex flex-col justify-center gap-5'>
                    <h5 className='uppercase tracking-[5px]'>Your Bag is Empty</h5>
                    <h1 className='text-6xl font-snitch-display'>An Unwritten <i>Silhouette</i></h1>
                    <p className='text-snitch-text-muted text-sm'>The pieces you select define the space you inhabit. Currently, your wardrobe awaits the first stroke of curation.</p>

                    <Link to={'/home'} className='btn w-fit px-6 py-3 mt-5'>Return to Atelier</Link>
                </div>
                <div className='w-full md:w-1/3 h-120'>
                    <img className='w-full h-full object-cover object-top' src="https://images.unsplash.com/photo-1618882259024-bc33228952ed?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
            </div>
        </div>
    )
}

export default EmptyCart
