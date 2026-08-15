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
        
        const totalImages = files.length + selectedFiles.length;
        if (totalImages > MAX_IMAGES) {
            setError(`Maximum ${MAX_IMAGES} images allowed. You can upload ${MAX_IMAGES - files.length} more.`);
            return;
        }

        const validFiles = selectedFiles.filter(file => 
            file.type.startsWith('image/') && 
            (file.type === 'image/jpeg' || file.type === 'image/png')
        );

        if (validFiles.length !== selectedFiles.length) {
            setError('Only JPEG and PNG files are allowed');
            return;
        }

        setFiles(prev => [...prev, ...validFiles]);

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
        if (!sizes.includes(size)) {
            let temp = [...sizes]
            temp.push(size)
            setSizes(temp)
        } else {
            setSizes(sizes.filter(s => s !== size))
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim()) {
            toast.warn('Please enter a product title.')
            return
        }
        if (!description.trim()) {
            toast.warn('Please enter a product description.')
            return
        }
        if (Number(priceAmount) <= 0) {
            toast.warn('Please enter a valid price amount.')
            return
        }
        if (!colorName.trim()) {
            toast.warn('Please specify a color name.')
            return
        }
        if (files.length === 0) {
            toast.warn('Please upload at least 1 product image.')
            return
        }

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

        const createdProduct = await handleCreateProduct(formData);

        if (!createdProduct) return;

        if (submitType === 'draft'){
            toast.success('Product saved to Drafts!')
        } else {
            toast.success('Product published to Snitch catalog successfully!')
        }
        navigate('/seller/dashboard')
    }

    return (
        <div className='bg-snitch-bg w-full min-h-screen text-snitch-text pt-24 pb-20 px-4 sm:px-8 overflow-x-hidden font-mono'>
            <SellerHeader/>
            <form onSubmit={handleSubmit} className='w-full max-w-4xl mx-auto flex flex-col gap-10 md:gap-14'>
                <div className='flex flex-col gap-2 border-b border-snitch-border/40 pb-4'>
                    <h1 className='font-snitch-display text-3xl sm:text-4xl font-bold text-snitch-text'>Create New Product</h1>
                    <p className='text-xs text-snitch-text-muted'>Add a new piece to your seller inventory.</p>
                </div>

                {/* Details Section */}
                <div className='w-full flex flex-col md:flex-row gap-6 md:gap-10 border-b border-snitch-border/40 pb-10'>
                    <div className='w-full md:w-1/3 flex flex-col gap-2'>
                        <h4 className='uppercase tracking-[4px] font-bold text-xs sm:text-sm text-snitch-text'>Details</h4>
                        <p className='text-xs text-snitch-text-muted leading-relaxed'>Provide the core identity of your piece. Descriptive titles and clear narratives perform best.</p>
                    </div>
                    <div className='w-full md:w-2/3 flex flex-col gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label className='uppercase text-xs font-bold tracking-wider text-snitch-text-muted' htmlFor="title">Product Title</label>
                            <input 
                            value={title}
                            onInput={(e)=>{setTitle(e.target.value)}}
                            className='px-4 py-3.5 bg-snitch-surface text-sm rounded-xl border border-snitch-border/60 text-snitch-text placeholder:text-snitch-text-muted focus:border-snitch-text focus:outline-none font-bold'
                            type="text" 
                            id="title" 
                            placeholder='e.g. Minimalist Wool Overcoat'
                            name='title'
                            required
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='uppercase text-xs font-bold tracking-wider text-snitch-text-muted' htmlFor="desc">Description</label>
                            <textarea
                            value={description}
                            onInput={(e)=>{setDescription(e.target.value)}}
                            className='px-4 py-3.5 bg-snitch-surface text-sm rounded-xl border border-snitch-border/60 text-snitch-text placeholder:text-snitch-text-muted focus:border-snitch-text focus:outline-none h-32' 
                            id="desc" 
                            placeholder='Narrate the craftsmanship, material and silhouette...'
                            name='description'
                            required
                            />
                        </div>
                    </div>
                </div>

                {/* Valuation Section */}
                <div className='w-full flex flex-col md:flex-row gap-6 md:gap-10 border-b border-snitch-border/40 pb-10'>
                    <div className='w-full md:w-1/3 flex flex-col gap-2'>
                        <h4 className='uppercase tracking-[4px] font-bold text-xs sm:text-sm text-snitch-text'>Valuation</h4>
                        <p className='text-xs text-snitch-text-muted leading-relaxed'>Set a price that reflects the artisanal value and rarity of the item.</p>
                    </div>
                    <div className='w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label className='uppercase text-xs font-bold tracking-wider text-snitch-text-muted' htmlFor="stock">Base Stock</label>
                            <input 
                            value={stock}
                            onInput={(e)=>{setStock(Number(e.target.value))}}
                            className='px-4 py-3.5 bg-snitch-surface text-sm rounded-xl border border-snitch-border/60 text-snitch-text font-bold focus:border-snitch-text focus:outline-none'
                            type="number" 
                            id="stock" 
                            placeholder='0' 
                            name='stock'
                            min="0"
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='uppercase text-xs font-bold tracking-wider text-snitch-text-muted' htmlFor="priceAmount">Price Amount</label>
                            <input 
                            value={priceAmount}
                            onInput={(e)=>{setPriceAmount(Number(e.target.value))}}
                            className='px-4 py-3.5 bg-snitch-surface text-sm rounded-xl border border-snitch-border/60 text-snitch-text font-bold focus:border-snitch-text focus:outline-none'
                            type="number" 
                            id="priceAmount" 
                            placeholder='0.00' 
                            name='priceAmount'
                            min="0"
                            required
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='uppercase text-xs font-bold tracking-wider text-snitch-text-muted' htmlFor="priceCurrency">Currency</label>
                            <select 
                            value={priceCurrency}
                            onChange={(e)=>{setPriceCurrency(e.target.value)}}
                            className='px-4 py-3.5 bg-snitch-surface text-sm rounded-xl border border-snitch-border/60 text-snitch-text font-bold focus:border-snitch-text focus:outline-none h-full' 
                            name="priceCurrency" 
                            id="priceCurrency"
                            >
                                <option value="INR">INR (₹)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Color Section */}
                <div className='w-full flex flex-col md:flex-row gap-6 md:gap-10 border-b border-snitch-border/40 pb-10'>
                    <div className='w-full md:w-1/3 flex flex-col gap-2'>
                        <h4 className='uppercase tracking-[4px] font-bold text-xs sm:text-sm text-snitch-text'>Color Definition</h4>
                        <p className='text-xs text-snitch-text-muted leading-relaxed'>Specify the exact hue of your creation for precise curation.</p>
                    </div>
                    <div className='w-full md:w-2/3 flex flex-col sm:flex-row gap-4'>
                        <div className='flex flex-col gap-2 sm:w-1/2'>
                            <label className='uppercase text-xs font-bold tracking-wider text-snitch-text-muted' htmlFor="colorName">Color Name</label>
                            <input 
                            value={colorName}
                            onInput={(e)=>{setColorName(e.target.value)}}
                            className='px-4 py-3.5 bg-snitch-surface text-sm rounded-xl border border-snitch-border/60 text-snitch-text placeholder:text-snitch-text-muted font-bold focus:border-snitch-text focus:outline-none'
                            type="text" 
                            id="colorName" 
                            placeholder='e.g. Obsidian Black' 
                            name='colorName'
                            required
                            />
                        </div>
                        <div className='flex flex-col gap-2 sm:w-1/2'>
                            <label className='uppercase text-xs font-bold tracking-wider text-snitch-text-muted' htmlFor="colorSwatch">Color Swatch</label>
                            <div className='flex gap-3 bg-snitch-surface px-4 py-2 rounded-xl border border-snitch-border/60 items-center'>
                                <input 
                                value={colorSwatch}
                                onInput={(e)=>{setColorSwatch(e.target.value)}}
                                className='w-9 h-9 rounded cursor-pointer border-none bg-transparent'
                                type="color" 
                                id="colorSwatch" 
                                name='colorSwatch'
                                />
                                <input type="text" 
                                value={colorSwatch}
                                onInput={(e)=>{setColorSwatch(e.target.value)}}
                                className='w-full bg-transparent border-none text-sm text-snitch-text font-bold focus:outline-none uppercase'
                                placeholder='#000000'
                                />
                            </div>
                        </div>  
                    </div>
                </div>

                {/* Available Sizes */}
                <div className='w-full flex flex-col md:flex-row gap-6 md:gap-10 border-b border-snitch-border/40 pb-10'>
                    <div className='w-full md:w-1/3 flex flex-col gap-2'>
                        <h4 className='uppercase tracking-[4px] font-bold text-xs sm:text-sm text-snitch-text'>Available Sizes</h4>
                        <p className='text-xs text-snitch-text-muted leading-relaxed'>Select the dimensions available for this piece.</p>
                    </div>
                    <div className='w-full md:w-2/3 flex flex-wrap gap-2.5'>
                        {['S', 'M', 'L', 'XL', 'XXL', '46', '48', '50', '52'].map((s) => (
                            <button
                            type="button"
                            key={s}
                            onClick={()=>{handleSizes(s)}}
                            className={`border rounded-xl px-4 py-2.5 text-xs font-bold cursor-pointer transition-all ${
                                sizes.includes(s)
                                    ? 'bg-snitch-dark-hero text-white border-black shadow-md'
                                    : 'border-snitch-border/60 hover:border-snitch-text text-snitch-text bg-snitch-surface'
                            }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Visuals Section */}
                <div className='w-full flex flex-col md:flex-row gap-6 md:gap-10 border-b border-snitch-border/40 pb-10'>
                    <div className='w-full md:w-1/3 flex flex-col gap-2'>
                        <h4 className='uppercase tracking-[4px] font-bold text-xs sm:text-sm text-snitch-text'>Visuals</h4>
                        <p className='text-xs text-snitch-text-muted leading-relaxed'>High-resolution editorial style photography is required for Snitch listings.</p>
                    </div>
                    <div className='w-full md:w-2/3 flex flex-col gap-4'>
                        {files.length < MAX_IMAGES && (
                            <>
                                <label 
                                    className={`w-full h-48 sm:h-64 rounded-2xl cursor-pointer flex flex-col gap-3 items-center justify-center border-2 border-dashed transition-all p-4 text-center ${
                                        dragActive 
                                            ? 'bg-snitch-surface border-snitch-text' 
                                            : 'bg-snitch-surface/50 border-snitch-border/60 hover:border-snitch-text'
                                    }`}
                                    htmlFor="photos"
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <svg className='w-8 h-8 text-snitch-text' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M24 19H21V23H19V19H16L20 15L24 19ZM21.0078 3C21.5555 3 21.9999 3.44482 22 3.99316L22.001 13.3418C21.3752 13.1205 20.7015 13 20 13V5H4L4.00098 19L13.293 9.70703C13.6528 9.34601 14.22 9.31813 14.6123 9.62305L14.7061 9.70801L18.252 13.2588C15.7909 14.0071 14 16.2944 14 19C14 19.7015 14.1205 20.3752 14.3418 21.001L2.99219 21C2.44451 21 2.00013 20.5552 2 20.0068V3.99316C2.00013 3.44463 2.45577 3 2.99219 3H21.0078ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"></path></svg>
                                    <div className='flex flex-col gap-1'>
                                        <span className='font-bold text-sm sm:text-base text-snitch-text'>
                                            {dragActive ? 'Drop images here' : 'Click to Upload Imagery'}
                                        </span>
                                        <span className='text-xs text-snitch-text-muted'>JPEG or PNG up to 5MB ({files.length}/{MAX_IMAGES})</span>
                                    </div>
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
                            <div className='text-xs bg-snitch-danger/20 text-snitch-danger p-3 rounded-xl font-bold'>
                                {error}
                            </div>
                        )}
                        {images.length > 0 && (
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2'>
                                {images.map((img, idx)=>(                             
                                    <div key={idx} className='relative aspect-[3/4] bg-black rounded-xl overflow-hidden group border border-snitch-border/40'>
                                        <img className='w-full h-full object-cover object-top' src={img} alt="preview" />
                                        <button
                                            type='button'
                                            onClick={() => removeImage(idx)}
                                            className='cursor-pointer absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 opacity-90 hover:opacity-100 transition-opacity'
                                        >
                                            <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M5.46264 4.40314L12 10.9365L18.5374 4.40314C18.9209 4.01969 19.553 4.01969 19.9365 4.40314C20.3199 4.78659 20.3199 5.41865 19.9365 5.8021L13.3991 12.3395L19.9365 18.8769C20.3199 19.2603 20.3199 19.8924 19.9365 20.2758C19.553 20.6593 18.9209 20.6593 18.5374 20.2758L12 13.7385L5.46264 20.2758C5.07919 20.6593 4.44713 20.6593 4.06368 20.2758C3.68023 19.8924 3.68023 19.2603 4.06368 18.8769L10.6011 12.3395L4.06368 5.8021C3.68023 5.41865 3.68023 4.78659 4.06368 4.40314C4.44713 4.01969 5.07919 4.01969 5.46264 4.40314Z"></path></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Actions */}
                <div className='w-full flex flex-col sm:flex-row gap-4 justify-end pt-2'>
                    <button 
                    type="button"
                    onClick={(e)=>{setSubmitType('draft'); handleSubmit(e);}}
                    className='px-6 py-3.5 uppercase text-xs tracking-wider cursor-pointer border border-snitch-border rounded-full text-snitch-text font-bold hover:bg-snitch-surface transition-colors text-center'
                    >
                        Save as Draft
                    </button>
                    <button 
                    onClick={()=>{setSubmitType('published')}}
                    className='btn px-8 py-3.5 text-xs font-semibold shadow-md' 
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
