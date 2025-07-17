import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useContextProvider } from '../context/AppContext';
import Card from '../components/Card';
import API from '../API';

const ProductCategoryPage = () => {
const { navigate } = useContextProvider();
     const [categories, setCategories] = useState([]);
     const [products, setProducts] = useState([]);

    const fetchCategories = async() =>{
    try {
      const { data } = await API.get('/api/category');
      if (data.success) {
        setCategories(data.categories);
      } else {
        setCategories([]);
      }
    } catch (error) {
      setCategories([]);
    }
  }

    const fetchProducts = async() =>{
    try {
      const { data } = await API.get('/api/product');
      if (data.success) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProducts([]);
    }
  }

  useEffect(() =>{
    fetchCategories();
    fetchProducts();
  }, []);

    const { slug } = useParams();
    const cate = categories.find(cat => cat.slug.toLowerCase() === slug)
    const matchedCategory = products.filter(p => p.category.name.toLowerCase() === cate.name.toLowerCase())
  
    return (
    <>
        {matchedCategory.length > 0 && (
        <section className='category-section mt-2 md:mt-6 px-4 md:px-12 lg:px-16 xl:px-16 py-4'>
            <p className='text-center text-[32px] font-bold mt-2'>
            <span className='text-[#4CB944]'>Related</span> Products
            </p>
            <div className="flex gap-4 flex-wrap mt-6">
            {matchedCategory.map((product) => (
                <Card key={product.id} product={product} />
            ))}
            </div>
        </section>
        )}

        {matchedCategory.length === 0 && (
        <p className='text-center text-gray-500 my-8 text-lg'>No products available in this category for now.</p>
        )}
    </>
    )
}

export default ProductCategoryPage