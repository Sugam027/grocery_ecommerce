import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useContextProvider } from '../../context/AppContext';
import API from '../../API';

const AddProduct = () => {
    const { navigate } = useContextProvider();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [stock, setStock] = useState('');
    const [rating, setRating] = useState('');
    const [images, setImages] = useState([]);
    const [unit, setUnit] = useState('');
    const [categories, setCategories] = useState([]);

    const [errors, setErrors] = useState({});


    useEffect(() => {
        const fetchCategories = async () => {
        try {
            const { data } = await API.get('/api/category');
            if (data.success) {
            setCategories(data.categories);
            } else {
            toast.error("Failed to load categories");
            }
        } catch (error) {
            toast.error("Error loading categories");
        }
        };
        fetchCategories();
    }, []);


    const handleImageChange = (e, index) => {
        const newImages = [...images];
        newImages[index] = e.target.files[0];
        setImages(newImages);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!name.trim()) newErrors.name = "Product name is required.";
        if (!description.trim()) newErrors.description = "Description is required.";
        if (!category) newErrors.category = "Please select a category.";
        if (!price) newErrors.price = "Price is required.";
        if (!offerPrice) newErrors.offerPrice = "Offer price is required.";
        if (!stock) newErrors.stock = "Stock quantity is required.";
        if (!rating) newErrors.rating = "Rating is required.";
        if (!unit) newErrors.unit = "Unit is required.";

        if (Number(price) <= 0) newErrors.price = "Price must be greater than 0.";
        if (Number(offerPrice) < 0) newErrors.offerPrice = "Offer price can't be negative.";
        if (Number(offerPrice) > Number(price)) newErrors.offerPrice = "Offer price can't be greater than actual price.";
        if (Number(stock) < 0) newErrors.stock = "Stock can't be negative.";
        if (Number(rating) < 0 || Number(rating) > 5) newErrors.rating = "Rating must be between 0 and 5.";

        const validImages = images.filter(img => img);
        if (validImages.length === 0) newErrors.images = "At least one image is required.";
        validImages.forEach((img) => {
            if (!img.type.startsWith("image/")) {
            newErrors.images = "Only image files are allowed.";
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        // if (!name || !description || !category || !price || !offerPrice || !rating || images.length === 0) {
        // toast.error("All fields are required!");
        // return;
        // }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', JSON.stringify(description.split('\n'))); // store description as array
        formData.append('price', price);
        formData.append('offerPrice', offerPrice);
        formData.append('category', category);
        formData.append('rating', rating);
        formData.append('stock', stock);
        formData.append('unit', unit);
        formData.append('inStock', Number(stock) > 0);
        
        validImages.forEach((img) => {
        if (img) formData.append('images', img); // must match your multer field name
        });

        try {
        const { data } = await API.post('/api/product/store', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });

        if (data.success) {
            toast.success("Product added successfully!");
            navigate('/admin/products'); // or wherever your product list page is
        } else {
            toast.error(data.message || "Failed to add product");
        }
        } catch (error) {
        toast.error("Server Error: " + error.message);
        }
    };


    return (
    <>
        <div className="flex justify-between align-center">
            <p className='text-[20px] font-bold'>New Product</p>
            <p className='cursor-pointer bg-gray-200 py-[5px] px-[10px] rounded-md hover:bg-grey-300' onClick={() => navigate('/admin/products')}>Back</p>
        </div>
        <div className="py-5 px-2 mt-2 flex flex-col justify-between bg-white rounded-md">
            <form onSubmit={onSubmitHandler} className="space-y-6" encType="multipart/form-data">
                {/* Image Upload */}
                <div>
                <label className="block font-medium mb-1">Product Images</label>
                <div className="flex flex-wrap gap-4">
                    {Array(4).fill('').map((_, index) => (
                    <label key={index} className="cursor-pointer">
                        <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => handleImageChange(e, index)}
                        />
                        <img
                        src={
                            images[index]
                            ? URL.createObjectURL(images[index])
                            : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                        }
                        alt="Upload"
                        className="w-24 h-24 object-cover rounded border border-gray-200"
                        />
                    </label>
                    ))}
                </div>
                    {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
                </div>

                {/* Product Name */}
                <div>
                <label className="block font-medium mb-1">Product Name</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Description */}
                <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                    rows="4"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Enter product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                {/* Category */}
                <div>
                <label className="block font-medium mb-1">Category</label>
                <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    
                >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                {/* Price, Offer Price, Rating, Stock */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <label className="block font-medium mb-1">Price</label>
                    <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="unit">Unit</label>
                    <input
                        id="unit"
                        type="text"
                        placeholder="e.g. pcs, kg, gm, box"
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        
                    />
                    {errors.unit && <p className="text-red-500 text-sm mt-1">{errors.unit}</p>}
                </div>
                <div>
                    <label className="block font-medium mb-1">Offer Price</label>
                    <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    placeholder="0"
                    
                    />
                    {errors.offerPrice && <p className="text-red-500 text-sm mt-1">{errors.offerPrice}</p>}
                </div>
                <div>
                    <label className="block font-medium mb-1">Rating</label>
                    <input
                    type="number"
                    step="0.1"
                    max="5"
                    min="0"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="0"
                    
                    />
                    {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
                </div>
                <div>
                    <label className="block font-medium mb-1">Stock</label>
                    <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="0"
                    
                    />
                    {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                </div>
                </div>

                {/* Submit */}
                <div>
                <button
                    type="submit"
                    className="bg-[#4CB944] hover:bg-[#417B38] transition text-white px-6 py-2 rounded"
                >
                    Add Product
                </button>
                </div>
            </form>
        </div>
    </>
  )
}

export default AddProduct