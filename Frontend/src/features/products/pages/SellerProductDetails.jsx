/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useProduct } from '../hooks/useProduct'
import { useParams } from 'react-router'
import SellerHeader from '../components/SellerHeader'
import { toast } from 'react-toastify'

// ─── Add Variant Modal ──────────────────────────────────────────────────────

const AddVariantModal = ({ onClose, onAdd }) => {
    const [images, setImages]           = useState([])
    const [files, setFiles]             = useState([])
    const [dragActive, setDragActive]   = useState(false)
    const [attributes, setAttributes]   = useState({ key: '', value: '' })
    const [stock, setStock]             = useState(0)
    const [priceAmount, setPriceAmount] = useState('')
    const [currency, setCurrency]       = useState('INR')
    const [error, setError]             = useState('')

    // Image handling
    const processFiles = (selectedFiles) => {
        setError('')
        const validFiles = selectedFiles.filter(
            f => f.type === 'image/jpeg' || f.type === 'image/png'
        )
        if (validFiles.length !== selectedFiles.length) {
            setError('Only JPEG and PNG files are allowed')
            return
        }
        setFiles(prev => [...prev, ...validFiles])
        setImages(prev => [...prev, ...validFiles.map(f => URL.createObjectURL(f))])
    }

    const handleImageChange = (e) => processFiles(Array.from(e.target.files))

    const handleDrag = (e) => {
        e.preventDefault(); e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
        else if (e.type === 'dragleave') setDragActive(false)
    }

    const handleDrop = (e) => {
        e.preventDefault(); e.stopPropagation()
        setDragActive(false)
        processFiles(Array.from(e.dataTransfer.files))
    }

    const removeImage = (idx) => {
        setImages(prev => prev.filter((_, i) => i !== idx))
        setFiles(prev => prev.filter((_, i) => i !== idx))
    }

    // Attribute handling — single { key, value } object
    const updateAttr = (field, val) => setAttributes(prev => ({ ...prev, [field]: val }))

    const handleSubmit = () => {
        const payload = { files, images, attributes, stock: Number(stock) }
        if (priceAmount) payload.price = { amount: Number(priceAmount), currency }
        onAdd(payload)
        onClose()
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            {/* Backdrop */}
            <div
                className='absolute inset-0 bg-snitch-bg/80 backdrop-blur-md'
                onClick={onClose}
            />

            {/* Panel */}
            <div
                className='relative z-10 w-full max-w-xl mx-4 bg-snitch-surface/90 backdrop-blur-xl rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col gap-6 p-8 overflow-y-auto max-h-[90vh]'
                style={{ border: '1px solid rgba(63,63,70,0.3)' }}
            >
                {/* Header */}
                <div className='flex justify-between items-center'>
                    <div>
                        <p className='text-xs uppercase tracking-[5px] text-snitch-text-muted mb-1'>New Entry</p>
                        <h2 className='font-snitch-display text-2xl text-white font-light'>Add New Variant</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className='text-snitch-text-muted hover:text-white transition-colors cursor-pointer p-1'
                    >
                        <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5.46264 4.40314L12 10.9365L18.5374 4.40314C18.9209 4.01969 19.553 4.01969 19.9365 4.40314C20.3199 4.78659 20.3199 5.41865 19.9365 5.8021L13.3991 12.3395L19.9365 18.8769C20.3199 19.2603 20.3199 19.8924 19.9365 20.2758C19.553 20.6593 18.9209 20.6593 18.5374 20.2758L12 13.7385L5.46264 20.2758C5.07919 20.6593 4.44713 20.6593 4.06368 20.2758C3.68023 19.8924 3.68023 19.2603 4.06368 18.8769L10.6011 12.3395L4.06368 5.8021C3.68023 5.41865 3.68023 4.78659 4.06368 4.40314C4.44713 4.01969 5.07919 4.01969 5.46264 4.40314Z" />
                        </svg>
                    </button>
                </div>

                {/* Image Upload */}
                <div className='flex flex-col gap-3'>
                    <label className='uppercase text-xs tracking-[4px] text-snitch-text-muted'>Visuals</label>
                    {images.length < 4 && (
                        <label
                            htmlFor="variant-photos"
                            onDragEnter={handleDrag} onDragLeave={handleDrag}
                            onDragOver={handleDrag} onDrop={handleDrop}
                            className={`w-full h-36 rounded cursor-pointer flex flex-col gap-2 items-center justify-center transition-all
                                ${dragActive ? 'bg-snitch-border' : 'bg-snitch-input'}`}
                        >
                            <svg className='w-6 text-snitch-text-muted' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 19H21V23H19V19H16L20 15L24 19ZM21.0078 3C21.5555 3 21.9999 3.44482 22 3.99316L22.001 13.3418C21.3752 13.1205 20.7015 13 20 13V5H4L4.00098 19L13.293 9.70703C13.6528 9.34601 14.22 9.31813 14.6123 9.62305L14.7061 9.70801L18.252 13.2588C15.7909 14.0071 14 16.2944 14 19C14 19.7015 14.1205 20.3752 14.3418 21.001L2.99219 21C2.44451 21 2.00013 20.5552 2 20.0068V3.99316C2.00013 3.44463 2.45577 3 2.99219 3H21.0078ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z" />
                            </svg>
                            <span className='text-xs text-snitch-text-muted text-center'>
                                {dragActive ? 'Drop here' : 'Click or drag to upload JPEG / PNG'}
                            </span>
                        </label>
                    )}
                    <input onChange={handleImageChange} type="file" hidden id="variant-photos" multiple accept="image/jpeg,image/png" />
                    {images.length > 0 && (
                        <div className='flex gap-2 flex-wrap'>
                            {images.map((img, idx) => (
                                <div key={idx} className='relative w-16 h-20 rounded overflow-hidden group'>
                                    <img src={img} alt="preview" className='w-full h-full object-cover object-top' />
                                    <button
                                        type='button'
                                        onClick={() => removeImage(idx)}
                                        className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer'
                                    >
                                        <svg className='w-4 text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M5.46264 4.40314L12 10.9365L18.5374 4.40314C18.9209 4.01969 19.553 4.01969 19.9365 4.40314C20.3199 4.78659 20.3199 5.41865 19.9365 5.8021L13.3991 12.3395L19.9365 18.8769C20.3199 19.2603 20.3199 19.8924 19.9365 20.2758C19.553 20.6593 18.9209 20.6593 18.5374 20.2758L12 13.7385L5.46264 20.2758C5.07919 20.6593 4.44713 20.6593 4.06368 20.2758C3.68023 19.8924 3.68023 19.2603 4.06368 18.8769L10.6011 12.3395L4.06368 5.8021C3.68023 5.41865 3.68023 4.78659 4.06368 4.40314C4.44713 4.01969 5.07919 4.01969 5.46264 4.40314Z" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Attributes */}
                <div className='flex flex-col gap-3'>
                    <label className='uppercase text-xs tracking-[4px] text-snitch-text-muted'>Attributes</label>
                    <div className='flex gap-2'>
                        <input
                            value={attributes.key}
                            onInput={e => updateAttr('key', e.target.value)}
                            placeholder='e.g. Color'
                            className='px-3 py-3 text-sm flex-1'
                        />
                        <input
                            value={attributes.value}
                            onInput={e => updateAttr('value', e.target.value)}
                            placeholder='e.g. Midnight Black'
                            className='px-3 py-3 text-sm flex-1'
                        />
                    </div>
                </div>

                {/* Stock & Price */}
                <div className='flex gap-3'>
                    <div className='flex flex-col gap-2 flex-1'>
                        <label className='uppercase text-xs tracking-[4px] text-snitch-text-muted'>Stock</label>
                        <input
                            type='number'
                            value={stock}
                            onInput={e => setStock(e.target.value)}
                            className='px-3 py-3 text-sm'
                        />
                    </div>
                    <div className='flex flex-col gap-2 flex-1'>
                        <label className='uppercase text-xs tracking-[4px] text-snitch-text-muted'>Price</label>
                        <input
                            type='number'
                            value={priceAmount}
                            onInput={e => setPriceAmount(e.target.value)}
                            placeholder='0'
                            className='px-3 py-3 text-sm'
                        />
                    </div>
                    <div className='flex flex-col gap-2 w-24'>
                        <label className='uppercase text-xs tracking-[4px] text-snitch-text-muted'>Currency</label>
                        <select value={currency} onChange={e => setCurrency(e.target.value)} className='h-full py-2'>
                            <option value='INR'>INR</option>
                            <option value='USD'>USD</option>
                            <option value='EUR'>EUR</option>
                            <option value='JPY'>JPY</option>
                            <option value='GBP'>GBP</option>
                        </select>
                    </div>
                </div>

                {error && (
                    <p className='text-xs text-snitch-danger bg-snitch-danger/10 px-3 py-2 rounded'>{error}</p>
                )}

                {/* Actions */}
                <div className='flex gap-3 justify-end pt-2'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='px-6 py-3 uppercase text-xs tracking-[2px] text-snitch-text-muted hover:text-white transition-colors cursor-pointer'
                    >
                        Cancel
                    </button>
                    <button
                        type='button'
                        onClick={handleSubmit}
                        className='btn px-6 py-3'
                    >
                        Add Variant
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── Variant Card ───────────────────────────────────────────────────────────

const VariantCard = ({ variant, pending = false, onDelete, onStockEdit }) => {
    const [editingStock, setEditingStock] = useState(false)
    const [stockVal, setStockVal]         = useState(variant.stock)

    // Normalise attributes — two possible shapes:
    //   1. Pending (local):  { key: 'Color', value: 'White' }
    //   2. From DB (Mongoose Map → plain object): { Color: 'White' }
    const attrEntries = (() => {
        const a = variant.attributes
        if (!a) return []
        if ('key' in a) return [[a.key, a.value]]        // local { key, value }
        return Object.entries(a)                          // DB map object
    })()

    const handleStockSave = () => {
        if (onStockEdit) onStockEdit(Number(stockVal))
        setEditingStock(false)
    }

    return (
        <div className={`rounded-lg overflow-hidden flex gap-4 p-4 transition-all hover:scale-[1.01] group
            ${pending ? 'bg-snitch-primary/10 border border-snitch-primary/30' : 'bg-snitch-surface hover:bg-snitch-card'}`}>
            {/* Thumbnail */}
            <div className='w-20 h-24 rounded overflow-hidden shrink-0 bg-snitch-card'>
                {variant.images && variant.images.length > 0 ? (
                    variant.images[0].preview
                        ? <img src={variant.images[0].preview} alt="variant" className='w-full h-full object-cover object-top' />
                        : variant.images[0].url
                            ? <img src={variant.images[0].url} alt="variant" className='w-full h-full object-cover object-top' />
                            : <div className='w-full h-full flex items-center justify-center text-snitch-text-dim text-xs'>No img</div>
                ) : (
                    <div className='w-full h-full flex items-center justify-center text-snitch-text-dim text-xs'>No img</div>
                )}
            </div>

            {/* Info */}
            <div className='flex-1 flex flex-col justify-between gap-2'>
                {/* Pending badge + attribute chips */}
                <div className='flex flex-wrap gap-2 items-center'>
                    {pending && (
                        <span className='text-[10px] uppercase tracking-[3px] px-2 py-0.5 rounded-full bg-snitch-primary/20 text-snitch-primary'>
                            Unsaved
                        </span>
                    )}
                    {attrEntries.length > 0 ? attrEntries.map(([k, v], i) => (
                        <span key={i} className='text-xs bg-snitch-card px-2 py-1 rounded-full text-snitch-text-muted uppercase tracking-wider'>
                            {k}: <span className='text-white'>{v}</span>
                        </span>
                    )) : (
                        <span className='text-xs text-snitch-text-dim italic'>No attributes</span>
                    )}
                </div>

                {/* Price */}
                <div className='flex items-center gap-1 text-sm'>
                    <span className='text-snitch-text-muted'>{variant.price?.currency ?? 'INR'}</span>
                    <span className='text-snitch-success font-medium'>{variant.price?.amount ?? 0}</span>
                </div>
            </div>

            {/* Stock */}
            <div className='flex flex-col items-end justify-between shrink-0'>
                <div className='flex items-center gap-2'>
                    {editingStock && onStockEdit ? (
                        <>
                            <input
                                type='number'
                                value={stockVal}
                                onInput={e => setStockVal(e.target.value)}
                                className='w-16 px-2 py-1 text-sm text-center'
                                autoFocus
                            />
                            <button
                                onClick={handleStockSave}
                                className='text-snitch-success text-xs cursor-pointer hover:opacity-70 transition-opacity'
                            >
                                <svg className='w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <>
                            <p className='text-xs text-snitch-text-muted uppercase tracking-wider'>Stock:</p>
                            <p className='text-white font-medium'>{variant.stock}</p>
                            {onStockEdit && (
                                <button
                                    onClick={() => setEditingStock(true)}
                                    className='text-snitch-text-dim hover:text-white transition-colors cursor-pointer'
                                    title='Edit stock'
                                >
                                    <svg className='w-3.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z" />
                                    </svg>
                                </button>
                            )}
                        </>
                    )}
                </div>

                {onDelete && (
                    <button
                        onClick={() => onDelete()}
                        className='text-snitch-danger/50 hover:text-snitch-danger transition-colors cursor-pointer flex items-center gap-1 text-xs mt-2'
                    >
                        <svg className='w-3.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z" />
                        </svg>
                        Remove
                    </button>
                )}
            </div>
        </div>
    )
}

// ─── Main Page ──────────────────────────────────────────────────────────────

const SellerProductDetails = () => {

    const { productId } = useParams()
    const [product, setProduct]           = useState(null)
    const [activeImage, setActiveImage]   = useState(0)
    const [variants, setVariants]         = useState([])        // from backend
    const [pendingVariant, setPendingVariant] = useState(null)  // locally added, not yet saved
    const [showModal, setShowModal]       = useState(false)
    const [loading, setLoading]           = useState(true)

    const { handleGetProductById, handleAddProductVariant } = useProduct()

    async function getProduct() {
        setLoading(true)
        const data = await handleGetProductById(productId)
        if (data) {
            setProduct(data)
            setVariants(data.variants ?? [])
        }
        setLoading(false)
    }

    useEffect(() => { getProduct() }, [productId])

    // Stage a new variant locally (not yet sent to backend)
    const handleAddVariant = ({ files, images, attributes, stock, price }) => {
        setPendingVariant({
            images: images.map((preview, i) => ({ preview, file: files[i] })),
            attributes,
            stock,
            price: price ?? product.price,
        })
        toast('Variant staged — click Save to persist!')
    }

    // Remove pending variant
    const handleDeletePending = () => {
        setPendingVariant(null)
        toast('Pending variant removed')
    }

    // Inline stock edit on pending variant
    const handleStockEdit = (newStock) => {
        setPendingVariant(prev => ({ ...prev, stock: newStock }))
    }

    // POST pendingVariant to backend, then refresh
    const handleSaveChanges = async () => {
        if (!pendingVariant) return
        await handleAddProductVariant(productId, pendingVariant)
        setPendingVariant(null)
        await getProduct()
    }


    if (loading) {
        return (
            <div className='w-screen h-screen bg-snitch-bg flex items-center justify-center'>
                <SellerHeader />
                <div className='flex flex-col items-center gap-4 text-snitch-text-muted'>
                    <div className='w-8 h-8 border-2 border-snitch-primary/30 border-t-snitch-primary rounded-full animate-spin' />
                    <p className='text-xs uppercase tracking-[4px]'>Loading Collection</p>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className='w-screen h-screen bg-snitch-bg flex items-center justify-center'>
                <SellerHeader />
                <p className='text-snitch-text-muted'>Product not found.</p>
            </div>
        )
    }

    const sizes = typeof product.sizes?.[0] === 'string'
        ? product.sizes[0].split(',').map(s => s.trim()).filter(Boolean)
        : product.sizes ?? []

    return (
        <div className='bg-snitch-bg min-h-screen text-white font-light'>
            <SellerHeader />

            {/* Add Variant Modal */}
            {showModal && (
                <AddVariantModal
                    onClose={() => setShowModal(false)}
                    onAdd={handleAddVariant}
                />
            )}

            <div className='w-full max-w-5xl mx-auto px-5 lg:px-0 pt-24 pb-20 flex flex-col gap-20'>

                {/* ── BREADCRUMB ───────────────────────────────────────── */}
                <div className='flex items-center gap-2 text-xs text-snitch-text-dim uppercase tracking-[3px]'>
                    <span>Inventory</span>
                    <span>/</span>
                    <span className='text-snitch-text-muted'>{product.title}</span>
                </div>

                {/* ── SECTION 1 — PRODUCT OVERVIEW ─────────────────────── */}
                <div className='flex flex-col lg:flex-row gap-10'>

                    {/* Left — Image Gallery */}
                    <div className='lg:w-2/5 flex flex-col gap-3'>
                        {/* Main image */}
                        <div className='w-full h-120 rounded-lg overflow-hidden bg-snitch-surface'>
                            {product.images?.[activeImage]?.url ? (
                                <img
                                    src={product.images[activeImage].url}
                                    alt={product.title}
                                    className='w-full h-full object-cover object-top transition-all duration-500'
                                />
                            ) : (
                                <div className='w-full h-full flex items-center justify-center text-snitch-text-dim'>
                                    No image
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        <div className='flex gap-2'>
                            {product.images?.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`w-20 h-24 rounded overflow-hidden shrink-0 cursor-pointer transition-all
                                        ${activeImage === idx ? 'ring-1 ring-white/60' : 'opacity-50 hover:opacity-80'}`}
                                >
                                    <img
                                        src={img.url}
                                        alt={`thumb-${idx}`}
                                        className='w-full h-full object-cover object-top'
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right — Product Info */}
                    <div className='lg:w-3/5 flex flex-col gap-6'>

                        {/* Status badge */}
                        <div className='flex items-center gap-3'>
                            <span className={`text-[10px] uppercase tracking-[3px] px-3 py-1 rounded-full font-medium
                                ${product.type === 'published'
                                    ? 'bg-snitch-success/10 text-snitch-success'
                                    : 'bg-snitch-text-dim/10 text-snitch-text-dim'
                                }`}>
                                ● {product.type}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className='font-snitch-display text-4xl lg:text-5xl font-light leading-tight'>
                            {product.title}
                        </h1>

                        {/* Price */}
                        <div className='flex items-baseline gap-2'>
                            <span className='text-xs text-snitch-text-muted uppercase tracking-[3px]'>
                                {product.price?.currency}
                            </span>
                            <span className='text-3xl text-white'>
                                {product.price?.amount?.toLocaleString('en-IN')}
                            </span>
                        </div>

                        {/* Color */}
                        {product.color && (
                            <div className='flex items-center gap-3'>
                                <p className='text-xs uppercase tracking-[4px] text-snitch-text-muted'>Color</p>
                                <div className='flex items-center gap-2'>
                                    <div
                                        className='w-5 h-5 rounded-full border border-white/10'
                                        style={{ backgroundColor: product.color.swatch }}
                                    />
                                    <span className='text-sm text-snitch-text'>{product.color.name}</span>
                                </div>
                            </div>
                        )}

                        {/* Sizes */}
                        {sizes.length > 0 && (
                            <div className='flex flex-col gap-2'>
                                <p className='text-xs uppercase tracking-[4px] text-snitch-text-muted'>Available Sizes</p>
                                <div className='flex gap-2 flex-wrap'>
                                    {sizes.map((size, i) => (
                                        <span
                                            key={i}
                                            className='border border-snitch-border text-snitch-text text-xs px-4 py-2 rounded uppercase tracking-wider'
                                        >
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}


                        {/* Divider — tonal background strip */}
                        <div className='h-px w-full bg-snitch-surface' />

                        {/* Description */}
                        <p className='text-snitch-text-muted text-sm leading-relaxed'>{product.description}</p>

                        {/* Seller Info */}
                        {product.seller && (
                            <div className='flex items-center gap-3 pt-2'>
                                <div className='w-8 h-8 rounded-full bg-snitch-card flex items-center justify-center text-snitch-text-muted text-sm'>
                                    {product.seller.fullname?.[0]?.toUpperCase()}
                                </div>
                                <div className='flex flex-col'>
                                    <p className='text-sm text-white'>{product.seller.fullname}</p>
                                    <p className='text-xs text-snitch-text-dim'>{product.seller.email}</p>
                                </div>
                                <span className='ml-auto text-[10px] uppercase tracking-[3px] text-snitch-text-dim'>Seller</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── SECTION 2 — VARIANTS MANAGER ─────────────────────── */}
                <div className='flex flex-col gap-8'>

                    {/* Section header */}
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col gap-1'>
                            <h2 className='uppercase tracking-[5px] text-lg'>Product Variants</h2>
                            <p className='text-xs text-snitch-text-muted'>
                                {variants.length + (pendingVariant ? 1 : 0)} variant{(variants.length + (pendingVariant ? 1 : 0)) !== 1 ? 's' : ''} configured
                            </p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className='btn px-5 py-3 text-xs cursor-pointer'
                        >
                            + Add Variant
                        </button>
                    </div>

                    {/* Empty state */}
                    {variants.length === 0 && !pendingVariant ? (
                        <div className='bg-snitch-surface rounded-lg flex flex-col items-center justify-center gap-5 py-20'>
                            <svg className='w-12 text-snitch-text-dim' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6.99805 4V11L11.998 8.5L16.998 11V4H19.998C20.5503 4 20.998 4.44772 20.998 5V21C20.998 21.5523 20.5503 22 19.998 22H3.99805C3.44576 22 2.99805 21.5523 2.99805 21V5C2.99805 4.44772 3.44576 4 3.99805 4H6.99805ZM11.998 8L7.49805 3H16.498L11.998 8ZM12.998 11.2361L11.998 10.7361L10.998 11.2361V20H12.998V11.2361ZM14.998 14V16H18.998V14H14.998Z" />
                            </svg>
                            <div className='flex flex-col gap-1 items-center text-center'>
                                <p className='text-snitch-text-muted text-sm font-light'>No variants configured yet.</p>
                                <p className='text-snitch-text-dim text-xs max-w-sm'>
                                    Add color, size or material variants with individual stock counts and pricing.
                                </p>
                            </div>
                            <button
                                onClick={() => setShowModal(true)}
                                className='btn px-6 py-3 text-xs cursor-pointer'
                            >
                                Add First Variant
                            </button>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-3'>
                            {/* Existing saved variants from backend */}
                            {variants.map((variant, idx) => (
                                <VariantCard key={idx} variant={variant} />
                            ))}
                            {/* Locally staged variant (not yet saved) */}
                            {pendingVariant && (
                                <VariantCard
                                    variant={pendingVariant}
                                    pending
                                    onDelete={handleDeletePending}
                                    onStockEdit={handleStockEdit}
                                />
                            )}
                        </div>
                    )}

                    {/* Save changes CTA — only shown when there is a pending variant */}
                    {pendingVariant && (
                        <div className='flex justify-end'>
                            <button
                                className='btn px-8 py-3 cursor-pointer'
                                onClick={handleSaveChanges}
                            >
                                Save All Changes
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default SellerProductDetails
