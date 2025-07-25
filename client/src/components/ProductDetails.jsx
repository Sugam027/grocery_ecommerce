import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useContextProvider } from '../context/AppContext'
import Card from './Card'

const ProductDetails = () => {
    const { products, addToCart, removeFromCart, cartItems, navigate } = useContextProvider();
    
    const { id } = useParams()
    const product = products.find(p => p._id === id)


    const [thumbnail, setThumbnail] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        if (product && product.images?.length) {
            setThumbnail(product.images[0])
        }
    }, [product])

    useEffect(() => {
        if (product && products.length > 0) {
            const related = products
                .filter(p => p.category.name === product.category.name && p._id !== product._id)
                .slice(0, 5)
            setRelatedProducts(related)
        }
    }, [products, product])

    if (!product) return <p>Product not found.</p>

    

    


    return product && (
        <>
            <div className="max-w-6xl w-full px-6">
                <div className="flex flex-col md:flex-row gap-16 mt-8">
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-3">
                            {product.images.map((image, index) => (
                                <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 h-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                    <img src={image} alt={`Thumbnail ${index + 1}`} className='object-cover h-24 w-24'/>
                                </div>
                            ))}
                        </div>

                        <div className="border border-gray-500/30 max-w-100 h-105 rounded overflow-hidden">
                            <img src={thumbnail} alt="Selected product" className='object-cover h-105 w-100'/>
                        </div>
                    </div>

                    <div className="text-sm w-full md:w-1/2">
                        <h1 className="text-3xl font-medium">{product.name}</h1>

                        <div className="flex items-center gap-0.5 mt-1">
                            {Array(5).fill('').map((_, i) => (
                                product.rating > i ? (
                                    <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" fill="#FFD23F" />
                                    </svg>
                                ) : (
                                    <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" fill="#FFD23F" fill-opacity="0.35" />
                                    </svg>
                                )
                            ))}
                            <p className="text-base ml-2">({product.rating})</p>
                        </div>

                        <div className="mt-6">
                            <p className="text-gray-500/70 line-through">MRP: Rs. {product.price}</p>
                            <p className="text-2xl font-medium">MRP: Rs. {product.offerPrice}</p>
                            <span className="text-gray-500/70">(inclusive of all taxes)</span>
                        </div>
                        <p className='md:text-sm text-xs'>{product.unit}</p>


                        <p className="text-base font-medium mt-4">About Product</p>
                        <div className="list-disc text-gray-500/70">
                        {(product.description && typeof product.description[0] === "string"
                            ? JSON.parse(product.description[0])
                            : []
                        ).map((desc, index) => (
                            <p key={index} className='mt-2'>{desc}</p>
                        ))}
                        </div>

                    <div className="mt-10 text-[#4CB944]">
                    {!product.inStock ? (
                        <button
                        disabled
                        className="bg-gray-300 text-gray-600 font-medium w-full py-3.5 rounded cursor-not-allowed"
                        >
                        Out of Stock
                        </button>
                    ) : !cartItems?.[product._id] ? (
                        <button
                        className="flex items-center justify-center gap-1 bg-[#E5F1E2] border border-[#E5F1E2] w-full py-3.5 rounded text-[#4CB944] font-medium"
                        onClick={() => addToCart(product._id)}
                        >
                        <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#4CB944" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Add
                        </button>
                    ) : (
                        <div className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#E5F1E2] rounded select-none">
                        <button
                            onClick={() => removeFromCart(product._id)}
                            className="cursor-pointer text-md px-3"
                        >
                            -
                        </button>
                        <span className="w-6 text-center">{cartItems[product._id]}</span>
                        <button
                            onClick={() => addToCart(product._id)}
                            disabled={cartItems[product._id] >= product.stock}
                            className={`cursor-pointer text-md px-3 ${cartItems[product._id] >= product.stock ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            +
                        </button>
                        </div>
                    )}
                    </div>
                    </div>
                </div>
            </div>

            <section className='category-section mt-4 md:mt-16 px-4 md:px-12 lg:px-16 xl:px-16 py-4'>
                <p className='text-center text-[32px] font-bold mt-2'><span className='text-[#4CB944]'>Related</span> Products</p>
                <div className="flex gap-4 flex-wrap mt-6">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((p) => (
                    <Card key={p._id} product={p} />
                    ))
                ) : (
                    <p className="text-gray-500">No related products found.</p>
                )}
                </div>
            </section>
        </>
  )
}

export default ProductDetails