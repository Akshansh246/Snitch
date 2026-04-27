import React, { useState } from 'react'
import { useProduct } from '../hooks/useProduct';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import SellerHeader from '../components/SellerHeader';

const CreateProduct = () => {

    const { handleCreateProduct } = useProduct()
    const navigate = useNavigate()

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priceAmount, setPriceAmount] = useState(0);
    const [priceCurrency, setPriceCurrency] = useState('INR');
    const [images, setImages] = useState([]); // preview
    const [files, setFiles] = useState([]);   // actual files
    
    const [colorName, setColorName] = useState('');
    const [colorSwatch, setColorSwatch] = useState('#000000');
    const [sizes, setSizes] = useState([]);
    const [stock, setStock] = useState(0);

    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState('');
    const [submitType, setSubmitType] = useState('published');

    const MAX_IMAGES = 7;

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        processFiles(selectedFiles);
    };

    const processFiles = (selectedFiles) => {
        setError('');
        
        // Check if adding these files would exceed the limit
        const totalImages = files.length + selectedFiles.length;
        if (totalImages > MAX_IMAGES) {
            setError(`Maximum ${MAX_IMAGES} images allowed. You can upload ${MAX_IMAGES - files.length} more.`);
            return;
        }

        // Filter only valid image files
        const validFiles = selectedFiles.filter(file => 
            file.type.startsWith('image/') && 
            (file.type === 'image/jpeg' || file.type === 'image/png')
        );

        if (validFiles.length !== selectedFiles.length) {
            setError('Only JPEG and PNG files are allowed');
            return;
        }

        // store actual files
        setFiles(prev => [...prev, ...validFiles]);

        // preview URLs
        const imageURLs = validFiles.map(file => URL.createObjectURL(file));
        setImages(prev => [...prev, ...imageURLs]);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        processFiles(droppedFiles);
    };

    const removeImage = (idx) => {
        setImages(prev => prev.filter((_, i) => i !== idx));
        setFiles(prev => prev.filter((_, i) => i !== idx));
    };

    function handleSizes(size){
        // Only add size if it doesn't already exist
        if (!sizes.includes(size)) {
            let temp = [...sizes]
            temp.push(size)
            setSizes(temp)
        }
    }

    console.log(sizes)

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("priceAmount", Number(priceAmount));
        formData.append("priceCurrency", priceCurrency);
        formData.append("colorName", colorName)
        formData.append("colorSwatch", colorSwatch)
        formData.append('sizes', sizes)
        formData.append('stock', stock)

        if (submitType === "draft") {
            formData.append("type", "draft");
        }

        files.forEach(file => {
            formData.append("images", file);
        });

        await handleCreateProduct(formData);

        if(submitType === 'draft'){
            toast('Product added to Drafts')
        }else{
            toast('Product Created Successfully!')
        }
        navigate('/seller/dashboard')
    }

    return (
        <div className='bg-snitch-bg w-screen flex justify-center text-white py-20 px-5 '>
            <SellerHeader/>
            <form onSubmit={handleSubmit} className='w-220 flex flex-col gap-15 font-light'>
                <div className='flex flex-col gap-2'>
                    <h1 className='font-snitch-display text-4xl font-light'>Create New Product</h1>
                    <div className='border-b w-1/9 border-snitch-border '/>
                </div>

                <div className='w-full md:flex gap-5'>
                    <div className='md:w-1/3 flex flex-col gap-2 mb-5'>
                        <h4 className='uppercase tracking-[5px] font-light'>Details</h4>
                        <p className='text-sm text-snitch-text-muted'>Provide the core identity of your piece, Descriptive titles and clear narratives perform best.</p>
                    </div>
                    <div className='md:w-2/3 flex flex-col gap-10'>
                        <div className='flex flex-col gap-3'>
                            <label className='uppercase text-sm' htmlFor="title">Product Title</label>
                            <input 
                            value={title}
                            onInput={(e)=>{setTitle(e.target.value)}}
                            className='px-4 py-5'
                            type="text" 
                            id="title" 
                            placeholder='e.g. Minimalist Wool Overcoat'
                            name='title'
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label className='uppercase text-sm' htmlFor="desc">Description</label>
                            <textarea
                            value={description}
                            onInput={(e)=>{setDescription(e.target.value)}}
                            className='px-4 py-5 h-40' 
                            type="text" 
                            id="desc" 
                            placeholder='Narrate the craftsmanship, material and silhouette...'
                            name='description'
                            />
                        </div>
                    </div>
                </div>

                <div className='w-full md:flex gap-5'>
                    <div className='md:w-1/3 flex flex-col gap-2 mb-5'>
                        <h4 className='uppercase tracking-[5px] font-light'>Valuation</h4>
                        <p className='text-sm text-snitch-text-muted'>Set a price that reflects the artisanal value and rarity of the item.</p>
                    </div>
                    <div className='md:w-2/3 flex gap-2'>
                        <div className='flex flex-col gap-3 w-1/4'>
                            <label className='uppercase text-sm' htmlFor="stock">Base Stock</label>
                            <input 
                            value={stock}
                            onInput={(e)=>{setStock(Number(e.target.value))}}
                            className='px-4 py-5'
                            type="text" 
                            id="stock" 
                            placeholder='0.00' 
                            name='stock'
                            />
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                            <label className='uppercase text-sm' htmlFor="priceAmount">Price Amount</label>
                            <input 
                            value={priceAmount}
                            onInput={(e)=>{setPriceAmount(Number(e.target.value))}}
                            className='px-4 py-5'
                            type="text" 
                            id="priceAmount" 
                            placeholder='0.00' 
                            name='priceAmount'
                            />
                        </div>
                        <div className='flex flex-col gap-3 w-1/3'>
                            <label className='uppercase text-sm' htmlFor="priceCurrency">Currency</label>
                            <select 
                            value={priceCurrency}
                            onChange={(e)=>{setPriceCurrency(e.target.value)}}
                            className='h-full' 
                            name="priceCurrency" 
                            id="priceCurrency"
                            >
                                <option value="INR">INR</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="JPR">JPR</option>
                                <option value="GBP">GBP</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='w-full md:flex gap-5'>
                    <div className='md:w-1/3 flex flex-col gap-2 mb-5'>
                        <h4 className='uppercase tracking-[5px] font-light'>Color Definition</h4>
                        <p className='text-sm text-snitch-text-muted'>Specify the exact hue of your creation for precise curation.</p>
                    </div>
                    <div className='md:w-2/3 flex gap-2'>
                        <div className='flex flex-col gap-3 w-1/2'>
                            <label className='uppercase text-sm' htmlFor="colorName">Color Name</label>
                            <input 
                            value={colorName}
                            onInput={(e)=>{setColorName(e.target.value)}}
                            className='px-4 py-5'
                            type="text" 
                            id="colorName" 
                            placeholder='e.g Obsidian Black' 
                            name='colorName'
                            />
                        </div>
                        <div className='flex flex-col gap-3 w-1/2'>
                            <label className='uppercase text-sm' htmlFor="colorSwatch">Color Swatch</label>
                            <div className='flex gap-4 bg-snitch-input px-4 py-3 rounded border-b border-white'>
                                <input 
                                value={colorSwatch}
                                onInput={(e)=>{setColorSwatch(e.target.value)}}
                                className='w-11 h-10 born'
                                type="color" 
                                id="colorSwatch" 
                                placeholder='e.g Obsidian Black' 
                                name='colorSwatch'
                                />
                                <input type="text" 
                                value={colorSwatch}
                                onInput={(e)=>{setColorSwatch(e.target.value)}}
                                className='w-full born'
                                placeholder='#000000'
                                />
                            </div>
                        </div>  
                    </div>
                </div>

                <div className='w-full md:flex gap-5'>
                    <div className='md:w-1/3 flex flex-col gap-2 mb-5'>
                        <h4 className='uppercase tracking-[5px] font-light'>Available Sizes</h4>
                        <p className='text-sm text-snitch-text-muted'>Select the dimensions available for this piece.</p>
                    </div>
                    <div className='md:w-2/3 flex items-center justify-between gap-2'>
                        <div 
                        onClick={()=>{handleSizes('46')}}
                        className={`border border-white rounded px-5 py-3 h-fit cursor-pointer hover:bg-snitch-input transition-all ${sizes.includes('46') ? 'opacity-30 cursor-not-allowed' : ''}`}>
                            <p>46</p>
                        </div>
                        <div 
                        onClick={()=>{handleSizes('48')}}
                        className={`border border-white rounded px-5 py-3 h-fit cursor-pointer hover:bg-snitch-input transition-all ${sizes.includes('48') ? 'opacity-30 cursor-not-allowed' : ''}`}>
                            <p>48</p>
                        </div>
                        <div 
                        onClick={()=>{handleSizes('50')}}
                        className={`border border-white rounded px-5 py-3 h-fit cursor-pointer hover:bg-snitch-input transition-all ${sizes.includes('50') ? 'opacity-30 cursor-not-allowed' : ''}`}>
                            <p>50</p>
                        </div>
                        <div 
                        onClick={()=>{handleSizes('52')}}
                        className={`border border-white rounded px-5 py-3 h-fit cursor-pointer hover:bg-snitch-input transition-all ${sizes.includes('52') ? 'opacity-30 cursor-not-allowed' : ''}`}>
                            <p>52</p>
                        </div>
                        <div 
                        onClick={()=>{handleSizes('S')}}
                        className={`border border-white rounded px-5 py-3 h-fit cursor-pointer hover:bg-snitch-input transition-all ${sizes.includes('S') ? 'opacity-30 cursor-not-allowed' : ''}`}>
                            <p>S</p>
                        </div>
                        <div 
                        onClick={()=>{handleSizes('M')}}
                        className={`border border-white rounded px-5 py-3 h-fit cursor-pointer hover:bg-snitch-input transition-all ${sizes.includes('M') ? 'opacity-30 cursor-not-allowed' : ''}`}>
                            <p>M</p>
                        </div>
                        <div 
                        onClick={()=>{handleSizes('L')}}
                        className={`border border-white rounded px-5 py-3 h-fit cursor-pointer hover:bg-snitch-input transition-all ${sizes.includes('L') ? 'opacity-30 cursor-not-allowed' : ''}`}>
                            <p>L</p>
                        </div>
                        <div 
                        onClick={()=>{handleSizes('XL')}}
                        className={`border border-white rounded px-5 py-3 h-fit cursor-pointer hover:bg-snitch-input transition-all ${sizes.includes('XL') ? 'opacity-30 cursor-not-allowed' : ''}`}>
                            <p>XL</p>
                        </div>
                    </div>
                </div>

                <div className='w-full md:flex gap-5'>
                    <div className='md:w-1/3 flex flex-col gap-2 mb-5'>
                        <h4 className='uppercase tracking-[5px] font-light'>Visuals</h4>
                        <p className='text-sm text-snitch-text-muted'>High-resolution, editorial style photography is required for Snitch listings</p>
                    </div>
                    <div className='md:w-2/3 flex flex-col gap-5'>
                        {files.length < MAX_IMAGES && (
                            <>
                                <label 
                                    className={`w-full h-80 rounded cursor-pointer flex flex-col gap-5 items-center justify-center transition-all ${
                                        dragActive 
                                            ? 'bg-snitch-border border-2 border-dashed border-white' 
                                            : 'bg-snitch-input'
                                    }`}
                                    htmlFor="photos"
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <svg className='w-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M24 19H21V23H19V19H16L20 15L24 19ZM21.0078 3C21.5555 3 21.9999 3.44482 22 3.99316L22.001 13.3418C21.3752 13.1205 20.7015 13 20 13V5H4L4.00098 19L13.293 9.70703C13.6528 9.34601 14.22 9.31813 14.6123 9.62305L14.7061 9.70801L18.252 13.2588C15.7909 14.0071 14 16.2944 14 19C14 19.7015 14.1205 20.3752 14.3418 21.001L2.99219 21C2.44451 21 2.00013 20.5552 2 20.0068V3.99316C2.00013 3.44463 2.45577 3 2.99219 3H21.0078ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"></path></svg>
                                    <span className='font-normal text-xl text-center'>
                                        {dragActive ? 'Drop your images here' : 'Click to add Imagery'} <br />
                                        <span className='text-sm text-snitch-text-muted'>or drag and drop - JPEG, PNG up to 5MB ({files.length}/{MAX_IMAGES})</span>
                                    </span>
                                </label>
                                <input
                                    onChange={handleImageChange}
                                    type="file" 
                                    hidden 
                                    name="photos" 
                                    id="photos" 
                                    multiple 
                                    accept="image/jpeg,image/png"
                                />
                            </>
                        )}
                        {error && (
                            <div className=' text-sm bg-snitch-danger bg-opacity-10 p-3 rounded'>
                                {error}
                            </div>
                        )}
                        {files.length === MAX_IMAGES && (
                            <div className=' text-sm bg-snitch-success bg-opacity-10 p-3 rounded'>
                                All {MAX_IMAGES} photos uploaded. Remove a photo to add more.
                            </div>
                        )}
                        <div className='flex items-center gap-4 flex-wrap'>
                            {images.map((img, idx)=>(                             
                                <div key={idx} className='relative h-60 w-45 bg-black rounded flex items-center justify-center group'>
                                    <img className='w-full h-full object-cover object-top' src={img} alt="preview" />
                                    <button
                                        type='button'
                                        onClick={() => removeImage(idx)}
                                        className='cursor-pointer absolute top-2 right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'
                                    >
                                        <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M5.46264 4.40314L12 10.9365L18.5374 4.40314C18.9209 4.01969 19.553 4.01969 19.9365 4.40314C20.3199 4.78659 20.3199 5.41865 19.9365 5.8021L13.3991 12.3395L19.9365 18.8769C20.3199 19.2603 20.3199 19.8924 19.9365 20.2758C19.553 20.6593 18.9209 20.6593 18.5374 20.2758L12 13.7385L5.46264 20.2758C5.07919 20.6593 4.44713 20.6593 4.06368 20.2758C3.68023 19.8924 3.68023 19.2603 4.06368 18.8769L10.6011 12.3395L4.06368 5.8021C3.68023 5.41865 3.68023 4.78659 4.06368 4.40314C4.44713 4.01969 5.07919 4.01969 5.46264 4.40314Z"></path></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='w-full flex gap-5 justify-end'>
                    <button 
                    onClick={()=>{setSubmitType('draft')}}
                    className='px-8 py-4 uppercase cursor-pointer hover:border border-snitch-border rounded-lg'
                    >
                        Save as Draft
                    </button>
                    <button 
                    onClick={()=>{setSubmitType('published')}}
                    className='btn px-8 py-4' 
                    type='submit'
                    >
                        Publish to Snitch
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateProduct
