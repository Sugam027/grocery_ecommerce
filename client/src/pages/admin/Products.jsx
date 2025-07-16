import React, {useState, useEffect} from 'react'
import { useContextProvider } from '../../context/AppContext'
import API from '../../API';
import toast from 'react-hot-toast';

const Products = () => {
  const { navigate } = useContextProvider();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/api/product');
        if (data.success) {
          setProducts(data.products);
        } else {
          toast.error('Failed to load products');
        }
      } catch (err) {
        toast.error('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  // Toggle Deal of the Day
  // const toggleDeal = async (id, currentStatus) => {
  //   try {
  //     await API.patch(`/api/products/${id}`, {
  //       dealOfTheDay: !currentStatus
  //     });
  //     setProducts(prev =>
  //       prev.map(p => (p._id === id ? { ...p, dealOfTheDay: !currentStatus } : p))
  //     );
  //   } catch (err) {
  //     console.error('Error toggling deal:', err);
  //   }
  // };

  
  return (
    <>
    <div className="flex justify-between align-center">
        <p>Products</p>
        <p className='cursor-pointer bg-[#4CB944] py-[5px] px-[10px] rounded-md hover:bg-[#417B38]' onClick={() => navigate('/admin/products/create')}>Add Products</p>
    </div>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products List</h1>

      <div className="overflow-x-auto border rounded-lg shadow bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Offer</th>
              {/* <th className="p-3">Deal of Day</th> */}
              <th className="p-3">Stock items</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="p-3">
                  <img src={product.image || product.images?.[0]} alt={product.name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.category.name}</td>
                <td className="p-3">Rs. {product.price}</td>
                <td className="p-3">Rs. {product.offerPrice}</td>
                <td className="p-3">{product.stock}</td>
                {/* <td className="p-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={product.dealOfTheDay}
                      onChange={() => toggleDeal(product._id, product.dealOfTheDay)}
                      className="form-checkbox h-5 w-5 text-green-600"
                    />
                  </label>
                </td> */}
                <td className="p-3 space-x-2">
                  <button className="text-blue-600 hover:underline" onClick={() => navigate(`/admin/products/edit/${product._id}`)}>Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default Products