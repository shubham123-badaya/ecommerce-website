import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../config";

const AddCategoryPage = () => {
  const [form, setForm] = useState({ title: "", is_featured: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("is_featured", form.is_featured ? 1 : 0);

      const token = localStorage.getItem("token");

      await axios.post(`${API_URL}/categories/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Category added successfully!");
      navigate("/admin/category_list");
    } catch (err) {
      console.error("Error adding category:", err);
      toast.error("Failed to add category");
    }
  };

  return (
    <div className="min-h-screen max-w-3xl flex flex-col justify-center mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Add New Category</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6"
      >
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Category Title"
          className="border p-3 rounded-lg w-full mb-4"
        />

        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            name="is_featured"
            checked={form.is_featured}
            onChange={handleChange}
          />
          Featured
        </label>

        <div className="space-x-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Category
          </button>
          <button>
            <Link
              to="/admin/category_list"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Back
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryPage;
