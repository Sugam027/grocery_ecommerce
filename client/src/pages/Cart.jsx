import React, { useEffect, useState } from 'react'
import { useContextProvider } from '../context/AppContext'
import API from '../API';
import toast from 'react-hot-toast';

const Cart = () => {
    const {user,address, products, addToCart, updateCartItem, removeFromCart, removeProductFromCart, cartItems, getCartCount, getCartAmount, navigate} = useContextProvider();
    const [cartArray, setCartArray] = useState([])

    const getCart = () => {
        let temArray = [];
        for (const key in cartItems) {
            const product = products.find((item) => item._id === key);
            const quantity = cartItems[key];
            if (product) {
            temArray.push({ ...product, quantity });
            }
        }
        setCartArray(temArray);
    };


    useEffect(() =>{
        if(products.length > 0 && cartItems){
            getCart();
        }
    }, [products, cartItems])


    // console.log(cartArray)
  return products.length > 0 && cartItems ? (
    <>
    <div className="bg-gray-100 px-4 md:px-12 lg:px-16 xl:px-16 py-4">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
            <div className="flex rounded-lg mb-2 justify-between items-centerfont-medium p-3
            bg-[#4CB944]">
                <p className="text-left w-1/2">Product</p>
                <div className="w-1/2 flex justify-start items-center gap-12">
                    <p className="text-center">Price</p>
                    <p className="text-center">Quantity</p>
                    <p className="text-right">Subtotal</p>
                </div>
            </div>
        {cartArray.map((product, index) =>{
            return (
                <div key={index} className="justify-between mb-6 rounded-lg bg-white p-3 shadow-md sm:flex sm:justify-start bg-gray-500">
                    <div className="flex w-1/2 gap-4">
                        <div className='bg-[#FFD23F]'>
                            <img src={product?.images?.[0]} alt="product-image" className="w-full rounded-lg sm:w-20" />
                        </div>
                        <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
                        <p className="mt-1 text-xs text-gray-700">{product.unit}</p>
                        </div>
                    </div>
                        <div className="mt-4 w-1/2 flex justify-between items-center gap-6">
                            <p className="mt-1 text-gray-700">Rs. {product.offerPrice}</p>
                            <div className="flex items-center border-gray-100">
                                <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => {removeFromCart(product._id)}}> - </span>
                                <input className="h-8 w-8 border bg-white text-center text-xs outline-none" value={product.quantity} min="1" readOnly />
                                <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => {addToCart(product._id)}}> + </span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="text-sm">Rs. {(product.quantity * product.offerPrice).toFixed(2)}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" onClick={() => {removeProductFromCart(product._id)}}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                    </div>

            )
        })}
        <div className='flex items-center gap-2 mt-10 text-[15px] text-[#417B38] cursor-pointer hover:text-[#4CB944]' onClick={() => {navigate('/shop'); scrollTo(0,0)}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={10} height={15} className='text-[#417B38] hover:text-[#4CB944]'><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" fill='#417B38'/></svg>
            Continue shopping</div>
            
        </div>
        {/* <!-- Sub total --> */}
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">Rs. {getCartAmount()}</p>
                </div>
                <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">Free delivery</p>
                </div>

                {/* <div className="text-sm text-gray-800 mt-2">
                    <p className="font-semibold mb-1">Delivery Address:</p>
                    {address ? (
                        <div className="mb-3">
                        <p>{address.street}, {address.municipality}, {address.city}</p>
                        <button
                            className="mt-2 text-blue-600 underline text-sm"
                            onClick={() => navigate('/cart/change-address')}
                        >
                            Change Address
                        </button>
                        </div>
                    ) : (
                        <div className="mb-3 text-red-600">
                        <p>No address found.</p>
                        <button
                            className="mt-1 text-blue-600 underline text-sm"
                            onClick={() => navigate('/cart/checkout')}
                        >
                            Add Address
                        </button>
                        </div>
                    )}
                </div> */}

                <hr className="my-4" />
                <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                    <p className="mb-1 text-lg font-bold">Rs. {getCartAmount()}</p>
                    <p className="text-sm text-gray-700">including VAT</p>
                </div>
                </div>
                <button className="mt-6 w-full rounded-md bg-[#4CB944] py-1.5 font-medium text-blue-50 hover:bg-[#417B38]" onClick={() => navigate('/cart/checkout')}>Check out</button>
            </div>
        </div>
    </div>
    </>
  ) : null
}

export default Cart