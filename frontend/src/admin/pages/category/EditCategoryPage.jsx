import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/categories";

const EditCategoryPage = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", is_featured: false });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${API_URL}`);
        const cat = res.data.find((c) => c._id === id);
        if (cat) {
          setForm({
            title: cat.title,
            is_featured: cat.is_featured === 1,
          });
        }
      } catch (err) {
        console.error("Error fetching category:", err);
      }
    };
    fetchCategory();
  }, [id]);

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
      await axios.put(`${API_URL}/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Category updated successfully!"); // ✅ Toast notification
      navigate("/admin/category_list"); // ✅ Immediate redirect
    } catch (err) {
      console.error("Error updating category:", err);
      toast.error("Failed to update category"); // ✅ Error toast
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Category</h1>
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

        <button
          type="submit"
          className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default EditCategoryPage;
