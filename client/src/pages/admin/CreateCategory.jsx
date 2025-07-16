import React, { useState, useEffect } from 'react';
import slugify from 'react-slugify';
import toast from 'react-hot-toast';
import { useContextProvider } from '../../context/AppContext';
import API from '../../API';

const CreateCategory = () => {
  const { navigate } = useContextProvider();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugExists, setSlugExists] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const newSlug = slugify(name);
    setSlug(newSlug);

    if (newSlug) {
      API.get(`/api/category/check-slug/${newSlug}`)
        .then(res => setSlugExists(res.data.exists))
        .catch(err => console.error("Slug check failed:", err));
    }
  }, [name]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (slugExists) {
      toast.error("Category with this name already exists!");
      return;
    }

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
      const { data } = await API.post('/api/category', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        toast.success("Category created successfully!");
        navigate('/admin/category');
      } else {
        toast.error(data.message || "Failed to create category");
      }
    } catch (err) {
      toast.error("Error creating category: " + err.message);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">New Category</p>
        <p
          className="cursor-pointer bg-gray-200 text-white py-1 px-4 rounded-md hover:bg-gray-300"
          onClick={() => navigate('/admin/category')}
        >
          Back
        </p>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-4 mt-5 p-6 rounded-lg shadow-xl border border-gray-200 bg-white"
        encType="multipart/form-data"
      >
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="text"
            required
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            value={slug}
            readOnly
            className="border border-gray-200 rounded w-full p-2 mt-1 bg-gray-100 cursor-not-allowed"
            type="text"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-gray-200 rounded w-full p-2 mt-1"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#4CB944] hover:bg-[#417B38] transition text-white w-full py-2 rounded-md"
        >
          Create Category
        </button>
      </form>
    </>
  );
};

export default CreateCategory;
