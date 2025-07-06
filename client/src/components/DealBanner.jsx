import React from 'react'
import { useContextProvider } from '../context/AppContext'

const DealBanner = () => {
    const {navigate} = useContextProvider();
  return (
    <>
    <section className="weekly-deals mt-4 md:mt-16 px-4 md:px-12 lg:px-16 xl:px-16 py-4">
        <div className="flex flex-col md:flex-row items-center justify-around text-sm border border-gray-200 rounded-2xl m-2 w-full bg-[#417B38]">
            <div className="flex flex-col text-center md:text-left items-center md:items-start pt-14 md:p-10">
                <p className='text-[#FFD23F] text-[24px] mb-5'>Weekly Deals</p>
                <h2 className="md:text-4xl text-2xl font-bold text-white">Boost your productivity.<br /><span className='text-[#FFD23F]'>Start using our app today.</span></h2>

                <div className="flex items-center gap-4 mt-10">
                    <button type="button" className="group flex items-center gap-2 px-7 py-2.5 active:scale-95 transition bg-[#FFD23F] hover:bg-[#FDC044] px-7 py-2.5 text-black rounded-md active:scale-95 transition-all" onClick={() => {navigate("/shop"); scrollTo(0,0)}}>
                        Shop Now
                        <svg className="mt-1 group-hover:translate-x-0.5 transition-all" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5.5h13.092M8.949 1l5.143 4.5L8.949 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>

            <img className="max-w-[375px] pt-10 md:p-0" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/excitedWomenImage.png" alt="excitedWomenImage" />
        </div>
    </section>
    </>
  )
}

export default DealBanner