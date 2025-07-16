import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../API';
import toast from 'react-hot-toast';
import { useContextProvider } from '../../context/AppContext';

const EditProduct = () => {
  const { navigate } = useContextProvider();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [rating, setRating] = useState('');
  const [unit, setUnit] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/api/product/${id}`);
        if (res.data.success) {
          const p = res.data.product;
          setProduct(p);
          setName(p.name);
          setDescription(Array.isArray(p.description) ? p.description.join('\n') : JSON.parse(p.description[0]).join('\n'));
          setCategory(p.category._id || p.category);
          setPrice(p.price);
          setOfferPrice(p.offerPrice);
          setRating(p.rating);
          setUnit(p.unit);
          setStock(p.stock);
          setImages(p.images);
        } else {
          toast.error("Product not found");
        }

        const { data } = await API.get('/api/category');
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (err) {
        toast.error("Failed to fetch product");
      }
    };

    fetchData();
  }, [id]);

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', JSON.stringify(description.split('\n')));
    formData.append('price', price);
    formData.append('offerPrice', offerPrice);
    formData.append('category', category);
    formData.append('rating', rating);
    formData.append('unit', unit);
    formData.append('stock', stock);

    images.forEach(img => {
      if (img) formData.append('images', img);
    });

    try {
      const { data } = await API.put(`/api/product/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        toast.success("Product updated successfully");
        navigate('/admin/products');
      } else {
        toast.error(data.message || "Failed to update product");
      }
    } catch (err) {
      toast.error("Server Error: " + err.message);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="py-10 bg-white px-6 md:px-12 max-w-3xl mx-auto">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">Edit Product</h2>
        <button
          onClick={() => navigate('/admin/products')}
          className="bg-gray-200 text-white px-4 py-2 rounded hover:bg-gray-300"
        >
          Back
        </button>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Image Upload */}
        <div>
          <p className="text-base font-medium">Product Images</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4).fill('').map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  id={`image${index}`}
                  onChange={(e) => handleImageChange(e, index)}
                />
                <img
                  src={
                    images[index]
                      ? (typeof images[index] === 'string'
                        ? images[index]
                        : URL.createObjectURL(images[index]))
                      : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                  }
                  alt="upload"
                  className="w-24 h-24 object-cover border rounded cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="font-medium">Name</label>
          <input
            className="w-full mt-1 p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description (One per line)</label>
          <textarea
            rows={5}
            className="w-full mt-1 p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-medium">Category</label>
          <select
            className="w-full mt-1 p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Prices */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="font-medium">Price</label>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="font-medium">Offer Price</label>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Stock and Unit */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="font-medium">Stock</label>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="font-medium">Unit</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="e.g. 1kg / 1pc"
              required
            />
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="font-medium">Rating</label>
          <input
            type="number"
            step="0.1"
            max="5"
            min="0"
            className="w-full mt-1 p-2 border rounded"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-[#4CB944] text-white px-6 py-2 rounded hover:bg-[#417B38]"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
