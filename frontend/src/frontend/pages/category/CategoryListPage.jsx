import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/categories/"; // 👈 apna backend ka URL lagao

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_URL);
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
      await axios.delete(`${API_URL}delete/${id}`,
        
      );
      fetchCategories();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Category List</h1>
        <Link
          to="/admin/category_add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Category
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cate) => (
          <div
            key={cate._id}
            className="bg-white shadow-md rounded-2xl p-4 text-center"
          >
            <img
              src={`http://localhost:5000/uploads/category/${cate.imageUrl}`}
              alt={cate.title}
              className="w-full h-40 object-cover rounded-xl mb-3"
            />
            <h2 className="font-semibold text-lg">{cate.title}</h2>
            <p
              className={`text-sm mt-1 ${
                cate.is_featured ? "text-green-600" : "text-gray-500"
              }`}
            >
              {cate.is_featured ? "Featured ✅" : "Not Featured ❌"}
            </p>

            <div className="flex justify-center gap-3 mt-3">
              <Link
                to={`/admin/category_update/${cate._id}`}
                className="bg-yellow-400 px-4 py-1 rounded-lg text-white"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(cate._id)}
                className="bg-red-600 px-4 py-1 rounded-lg text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryListPage;
