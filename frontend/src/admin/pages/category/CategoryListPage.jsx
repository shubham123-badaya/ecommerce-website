import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { API_URL } from "../../config";



const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null); // 👈 Modal ke liye state

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/categories/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (err) {
      console.error("Error deleting:", err);
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-15">
        <h1 className="text-3xl font-bold">Category List</h1>
        <Link
          to="/admin/category_add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Category
        </Link>
      </div>

      {/* Table List */}
      <div className="overflow-x-auto ">
        <table className="w-full  rounded-lg shadow-md">
          <thead className="uppercase text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Featured</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cate) => (
              <tr key={cate._id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{cate.title}</td>
                <td className="p-3">
                  {cate.is_featured ? (
                    <span className="text-green-600 font-semibold">
                      ✅ Featured
                    </span>
                  ) : (
                    <span className="text-gray-500">❌ Not Featured</span>
                  )}
                </td>
                <td className="py-5 px-2 text-lg text-left flex gap-3">
                  <Link
                    to={`/admin/category_update/${cate._id}`}
                    className="text-yellow-500  rounded-lg "
                  >
                    <RiEdit2Line />
                  </Link>
                  <button
                    onClick={() => handleDelete(cate._id)}
                    className="text-red-600 rounded-lg "
                  >
                    <MdOutlineDeleteSweep />
                  </button>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg"
            />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => setPreviewImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryListPage;
