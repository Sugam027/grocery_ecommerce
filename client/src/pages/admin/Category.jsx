import React, { useEffect, useState } from 'react';
import { useContextProvider } from '../../context/AppContext';
import API from '../../API';
import toast from 'react-hot-toast';

const Category = () => {
  const { navigate } = useContextProvider();
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data } = await API.get('/api/category');
      if (data.success) {
        setCategories(data.categories);
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      toast.error("Server error while fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">All Categories</p>
        <button
          className="cursor-pointer bg-[#4CB944] py-2 px-4 rounded-md text-white hover:bg-[#417B38]"
          onClick={() => navigate('/admin/category/create')}
        >
          + Add Category
        </button>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {categories?.map((cat, index) => (
              <tr key={cat._id}>
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{cat.name}</td>
                <td className="px-4 py-3">{cat.slug}</td>
                <td className="px-4 py-3">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <span className="text-gray-400 italic">No Image</span>
                  )}
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => navigate(`/admin/category/edit/${cat.slug}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const { data } = await API.delete(`/api/category/${cat._id}`);
                        if (data.success) {
                          toast.success("Category deleted");
                          fetchCategories(); // refresh list
                        } else {
                          toast.error("Delete failed");
                        }
                      } catch (err) {
                        toast.error("Server error during delete");
                      }
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {categories?.length === 0 && (
              <tr>
                <td className="px-4 py-4 text-center text-gray-400" colSpan={5}>
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Category;
