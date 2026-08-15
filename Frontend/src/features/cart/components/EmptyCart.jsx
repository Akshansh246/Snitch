import React from 'react'
import { Link } from 'react-router'

const EmptyCart = () => {
    return (
        <div className='w-full min-h-[80vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto text-snitch-text font-mono'>
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center w-full'>
                <div className='w-full lg:w-1/2 flex flex-col justify-center gap-5 text-center lg:text-left items-center lg:items-start'>
                    <h5 className='uppercase tracking-[5px] text-xs text-snitch-text-muted font-bold'>Your Bag is Empty</h5>
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-snitch-display font-bold leading-tight text-snitch-text'>An Unwritten <i className='font-serif italic'>Silhouette</i></h1>
                    <p className='text-snitch-text-muted text-xs sm:text-sm leading-relaxed max-w-md'>The pieces you select define the space you inhabit. Currently, your wardrobe awaits the first stroke of curation.</p>

                    <Link to={'/home'} className='btn w-fit px-6 py-3.5 text-xs font-bold tracking-widest uppercase mt-4 shadow-md'>Return to Atelier</Link>
                </div>
                <div className='w-full lg:w-1/2 h-72 sm:h-96 lg:h-[450px] rounded-2xl overflow-hidden border border-snitch-border/40 bg-snitch-surface shadow-sm'>
                    <img className='w-full h-full object-cover object-top' src="https://images.unsplash.com/photo-1618882259024-bc33228952ed?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Empty Bag Atelier" />
                </div>
            </div>
        </div>
    )
}

export default EmptyCart
