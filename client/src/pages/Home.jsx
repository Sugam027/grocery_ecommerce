import React from 'react'
import HeroSection from '../components/HeroSection'
import Categories from '../components/Categories'
import Discounts from '../components/Discounts'
import Card from '../components/Card'
import DealBanner from '../components/DealBanner'
import Newsletter from '../components/Newsletter'
import FeaturedProducts from '../components/FeaturedProducts'
import Deals from '../components/Deals'
import { useContextProvider } from '../context/AppContext'

const Home = () => {
  const {navigate} = useContextProvider();
  return (
    <main>
        <HeroSection />
        <Categories />
        <Discounts />
        <section className='featured-section mt-4 md:mt-16 px-4 md:px-12 lg:px-16 xl:px-16 py-12 bg-gray-50'>
          <p className='text-gray-600'>Products</p>
          <div className='flex justify-between items-center'>
            <p className='text-[32px] font-bold mt-2'>Featured <span className='text-[#4CB944]'>Products</span></p>
            <div className="flex items-center">
              <button className="flex items-center gap-1.5 px-6 py-2.5 bg-[#4CB944] hover:bg-[#417B38] text-white text-sm font-semibold px-6 py-2.5 rounded-md transition" onClick={() => {navigate("/shop"); scrollTo(0,0)}}>
                  View All Products
                  <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5.5h13.09M8.948 1l5.143 4.5L8.948 10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
              </button>
            </div>
          </div>
          <FeaturedProducts />
        </section>

        {/* <section className='featured-section mt-4 md:mt-16 px-4 md:px-12 lg:px-16 xl:px-16 py-4'>
          <p className='text-gray-600'>Today Deals</p>
          <p className='text-[32px] font-bold mt-2'><span className='text-green-600'>Deals</span> of the Day</p>
          <Deals />          

        </section> */}
        <DealBanner />
    </main>
  )
}

export default Home