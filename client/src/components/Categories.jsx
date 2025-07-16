import React from 'react'
import { useContextProvider } from '../context/AppContext'

const Categories = () => {
    const {categories, navigate} = useContextProvider();
  return (
    <>
    <section className='category-section mt-4 md:mt-16 px-4 md:px-12 lg:px-16 xl:px-16 py-4'>
        <p className='text-center text-gray-600'>Categories</p>
        <p className='text-center text-[32px] font-bold mt-2'>Featured <span className='text-[#4CB944]'>Categories</span></p>
        <div className='flex justify-center gap-2 flex-wrap mt-4 md:mt-8'>
            {categories.map((category,index) =>{
                return (
                    <div key={index} className="relative items-center justify-center text-sm text-white/80 rounded-lg shadow-sm w-45 h-40 bg-[#4CB944]" onClick={() => {navigate(`/products/${category.slug.toLowerCase()}`); scrollTo(0,0);}}>
                        <div className="absolute bottom-2 flex items-center justify-around backdrop-blur-sm w-full max-w-72 rounded bg-white/10 border border-white/20 py-2" >
                            <p className="text-center text-[darkgreen]">{category.name}</p>
                        </div>
                        <img className="rounded-md" src={`${category.image} `}alt={category.name} />
                    </div>
                )
            })}


        </div>
    </section>
    </>
  )
}

export default Categories