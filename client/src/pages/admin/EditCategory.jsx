import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContextProvider } from '../../context/AppContext';
import slugify from 'react-slugify';
import toast from 'react-hot-toast';
import API from '../../API';

const EditCategory = () => {
  const { navigate } = useContextProvider();
  const { slug } = useParams();
  const [name, setName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await API.get(`/api/category/slug/${slug}`);
        if (data.success) {
          setName(data.category.name);
          setNewSlug(data.category.slug);
          setPreview(data.category.image);
          setId(data.category._id)
        }
      } catch (error) {
        toast.error("Failed to load category");
      }
    };

    fetchCategory();
  }, [slug]);

  useEffect(() => {
    setNewSlug(slugify(name));
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", newSlug);
      if (image) {
        formData.append("image", image);
      }

      const { data } = await API.put(`/api/category/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (data.success) {
        toast.success("Category updated successfully!");
        navigate("/admin/category");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error("Server error: " + error.message);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">Edit Category</p>
        <button
          onClick={() => navigate("/admin/category")}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-5 p-6 rounded-lg shadow-xl border border-gray-200 bg-white"
        encType="multipart/form-data"
      >
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            value={newSlug}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            readOnly
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          {preview && (
            <img src={preview} alt="Preview" className="mt-3 h-20 object-cover rounded" />
          )}
        </div>

        <button
          type="submit"
          className="bg-[#4CB944] text-white px-4 py-2 rounded hover:bg-[#417B38]"
        >
          Update Category
        </button>
      </form>
    </>
  );
};

export default EditCategory;
