import React, { useEffect, useState } from 'react'
import SellerHeader from '../components/SellerHeader'
import { useProduct } from '../hooks/useProduct'
import { Link } from 'react-router'

const Drafts = () => {
    const {handleGetSellerDrafts} = useProduct()

    const [drafts, setDrafts] = useState([]);

    async function getDrafts() {
        setDrafts( await handleGetSellerDrafts())
    }

    useEffect(()=>{
        getDrafts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return (
        <div className='w-screen h-screen overflow-auto flex justify-center px-10 py-20 text-white bg-snitch-bg'>
            <SellerHeader/>
            <div className='flex flex-col gap-10 w-full'>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='font-snitch-display text-4xl'>Drafts</h1>
                        <p className='text-sm text-snitch-text-muted italic'>Curate your collection of architectural sillhouettes and textile art.</p>
                    </div>
                    <Link to={'/seller/create-product'} className='btn px-4 py-2'>+ Add New Piece</Link>
                </div>
                <div className='flex flex-wrap gap-5 justify-between'>
                    {drafts.map((prod, idx)=>(
                        <div key={idx} className='w-60 bg-snitch-surface rounded overflow-hidden'>
                            <div className='flex overflow-x-auto w-60 h-80 relative'>
                                {prod.images.map((img, i)=>(
                                    <img className='w-full h-full object-top object-cover' key={i} src={img.url} alt=''/>
                                ))}
                                <p className='absolute text-xs uppercase right-2 top-2 bg-snitch-card/60 backdrop-blur-lg px-2 py-1 rounded'>{prod.type}</p>  
                            </div>
                            <div className='p-5 flex flex-col gap-4'>
                                <div>
                                    <h3 className='text-lg font-bold'>{prod.title}</h3>
                                    <p className='text-xs text-snitch-text-muted font-extralight'>{prod.description}</p>
                                </div>
                                <div className='flex gap-2 font-snitch-display'>
                                    <p>{prod.price.currency}</p>
                                    <p>{prod.price.amount}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='w-60 bg-snitch-surface rounded overflow-hidden'>
                        <div className='h-80 flex justify-center items-center bg-contain' style={{backgroundImage:'url(https://images.unsplash.com/photo-1557545826-b2ac471c2bc7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
                            <Link to={'/seller/create-product'} className='flex flex-col gap-2 items-center'>
                                <div className='p-3 bg-black/10 backdrop-blur-lg border border-snitch-input-border w-fit rounded-2xl'>
                                    <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 10.9999L22.0002 10.9997L22.0002 12.9997L13.0001 12.9999L13.0001 21.9998L11.0001 21.9998L11.0001 12.9999L2.00004 13.0001L2 11.0001L11.0001 10.9999L11 2.00025L13 2.00024L13.0001 10.9999Z"></path></svg>
                                </div>
                                <p className='uppercase text-xs font-light tracking-[3px]'>Add product</p>
                            </Link>
                        </div>
                        <div className='p-5 text-snitch-text-muted flex flex-col gap-2'>
                            <h3 className='text-lg'>New Composition</h3>
                            <p className='text-xs italic'>Begin a new entry in your digital entry.</p>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Drafts
