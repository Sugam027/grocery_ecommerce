import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContextProvider } from "../context/AppContext";


const Card = ({ product }) => {
    if (!product) return null;

    const [count, setCount] = React.useState(0);
    const navigate = useNavigate()
    const { addToCart, removeFromCart, cartItems } = useContextProvider();

    // const product = {
    //     name: "Casual Shoes",
    //     category: "Sports",
    //     price: 100,
    //     offerPrice: 80,
    //     rating: 4,
    //     image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
    // };
  return (
    <>
        <div className="border border-gray-500/20 rounded-md mt-4 md:px-4 px-3 py-2 bg-white w-[260px] cursor-pointer p-4 border rounded shadow hover:shadow-md transition" >
        <div className="relative h-40" >
                <div className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition h-40 object-cover" style={{width: "100%"}} src={product?.images?.[0]} alt={product.name} onClick={() => {navigate(`/product/${product._id}`); scrollTo(0,0);}}/>
            </div>
                <span className="absolute top-2 left-2 bg-[#4CB944] text-white text-xs font-bold px-2 py-1 rounded">{product.price > product.offerPrice ? 'SALE' : ""}</span>
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
                    <svg className="w-4 h- text-center text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </button>
            </div>
            
            <div className="text-gray-500/60 text-sm mt-2">
            <div className="flex justify-between">
                <p>{product.category.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        product.rating > i ? (
                            <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" fill="#FFD23F" />
                            </svg>
                        ) : (
                            <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" fill="#FFD23F" fillOpacity="0.35" />
                            </svg>
                        )
                    ))}
                    <p>({product.rating})</p>
                </div>
            </div>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <p className='text-gray-500/60 md:text-sm text-xs'>{product.unit}</p>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-[#4CB944]">
                        Rs.{product.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">Rs.{product.price}</span>
                    </p>
                    <div className="text-[#4CB944]" onClick={(e) =>{e.stopPropagation();}}>
                        {!product.inStock ? (
                        <button
                            disabled
                            className="bg-gray-300 text-gray-600 font-medium px-1 h-[34px] rounded cursor-not-allowed"
                        >
                            Out of Stock
                        </button>
                        ) : !cartItems?.[product._id] ? (
                            <button className="flex items-center justify-center gap-1 bg-[#E5F1E2] border border-[#E5F1E2] md:w-[80px] w-[64px] h-[34px] rounded text-[#4CB944] font-medium cursor-pointer" onClick={() => addToCart(product._id)} >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#4CB944" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-[#E5F1E2] rounded select-none">
                                <button onClick={() => {removeFromCart(product._id); }} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button onClick={() => {addToCart(product._id)}} disabled={cartItems[product._id] >= product.stock} className={`cursor-pointer text-md px-2 h-full ${cartItems[product._id] >= product.stock ? 'opacity-50 cursor-not-allowed' : ''}`} >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Card