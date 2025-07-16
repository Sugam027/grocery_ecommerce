import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useContextProvider } from '../context/AppContext';
import Card from '../components/Card';

const ProductCategoryPage = () => {
const { products, categories, navigate } = useContextProvider();
    
    const { slug } = useParams();
    console.log(slug)
    console.log(categories)
    const cate = categories.find(cat => cat.slug.toLowerCase() === slug)
    console.log(cate)
    const matchedCategory = products.filter(p => p.category.name.toLowerCase() === cate.name.toLowerCase())
  
    return (
    <>
    <section className='category-section mt-4 md:mt-16 px-4 md:px-12 lg:px-16 xl:px-16 py-4'>
        <p className='text-center text-[32px] font-bold mt-2'><span className='text-[#4CB944]'>Related</span> Products</p>
        <div className="flex gap-4 flex-wrap mt-6">
        {matchedCategory.map((product) => (
            <Card key={product.id} product={product} />
        ))}
        </div>
    </section>
    </>
    )
}

export default ProductCategoryPage