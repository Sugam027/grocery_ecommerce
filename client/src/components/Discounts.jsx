import React from 'react'
import { useContextProvider } from '../context/AppContext'

const Discounts = () => {
    const {navigate} =useContextProvider();
  return (
    <>
    <div className="flex justify-between flex-wrap px-4 md:px-12 lg:px-16 xl:px-16">
        
        <div className="flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-12 lg:px-16 xl:px-16 py-6 mt-4 md:mt-16 md:w-[48%] bg-[#F9F4F5] rounded-[10px]">
            <div className="max-w-lg max-md:mt-7">
                <h1 className="font-bold text-3xl md:text-4xl text-black">
                    Save Big on <span className="text-[#4CB944]">Fresh Essentials</span>
                </h1>
                <p className="mt-8 text-gray-500 text-sm sm:text-base">
                     Get up to 30% off on daily groceries. Shop fresh vegetables, fruits, dairy, and more—all in one place.
                </p>
                <div className="flex items-center mt-6">
                    <button className="flex items-center gap-1.5 px-6 py-2.5 bg-[#4CB944] hover:bg-[#417B38] text-white text-sm font-semibold px-6 py-2.5 rounded-md transition" onClick={()=>{navigate("/shop"); scrollTo(0,0)}}>
                        Explore Offers
                        <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5.5h13.09M8.948 1l5.143 4.5L8.948 10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <img className="w-52 md:w-80 scale-x-[-1] max-md:mt-10" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/thinkingImage.svg" alt="thinkingImage" />
        </div>
        <div className="flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-12 lg:px-16 xl:px-16 py-6 mt-4 md:mt-16 md:w-[48%] bg-[#F5EE9E] rounded-[10px]">
            <div className="max-w-lg max-md:mt-7">
                <h1 className="font-bold text-3xl md:text-4xl text-black">
                    <span className="text-[#4CB944]">Weekend Deals</span> You Can’t Miss!
                </h1>
                <p className="mt-8 text-gray-500 text-sm sm:text-base">
                    Limited-time discounts every Friday to Sunday. Stock up on bakery, snacks, and beverages at unbeatable prices.
                </p>
                <div className="flex items-center mt-6">
                    <button className="flex items-center gap-1.5 px-6 py-2.5 bg-[#4CB944] hover:bg-[#417B38] text-white text-sm font-semibold px-6 py-2.5 rounded-md transition" onClick={()=>{navigate("/shop"); scrollTo(0,0)}}>
                        View Weekend Sale
                        <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5.5h13.09M8.948 1l5.143 4.5L8.948 10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <img className="w-52 md:w-80 scale-x-[-1] max-md:mt-10" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/thinkingImage.svg" alt="thinkingImage" />
        </div>
        
    </div>
        
    </>
  )
}

export default Discounts