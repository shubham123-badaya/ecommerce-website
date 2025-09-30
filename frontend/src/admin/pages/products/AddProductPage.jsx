import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/products/create";

const AddProductPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    variants: [],
    is_featured: 0,
    isBestSelling: 0,
    isNewArrival: 0,
    isTopRated: 0,
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories/"); // 👈 apna API lagao
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked ? 1 : 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { size: "", color: "" }],
    });
  };

  const handleVariantChange = (index, e) => {
    const newVariants = [...formData.variants];
    newVariants[index][e.target.name] = e.target.value;
    setFormData({ ...formData, variants: newVariants });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "variants") {
        form.append("variants", JSON.stringify(formData.variants));
      } else {
        form.append(key, formData[key]);
      }
    });

    if (image) form.append("image", image);

    try {
      const token = localStorage.getItem("token");
      await axios.post(API_URL, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/products_list");
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <select
          name="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full border p-2"
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-2"
        />

        {/* Variants */}
        <div>
          <h2 className="font-semibold mb-2">Variants</h2>
          {formData.variants.map((variant, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                name="size"
                placeholder="Size"
                value={variant.size}
                onChange={(e) => handleVariantChange(index, e)}
                className="border p-2"
              />
              <input
                type="text"
                name="color"
                placeholder="Color"
                value={variant.color}
                onChange={(e) => handleVariantChange(index, e)}
                className="border p-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addVariant}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            + Add Variant
          </button>
        </div>

        {/* Flags */}
        <div className="flex gap-4">
          <label>
            <input
              type="checkbox"
              name="is_featured"
              checked={formData.is_featured === 1}
              onChange={handleChange}
            />{" "}
            Featured
          </label>
          <label>
            <input
              type="checkbox"
              name="isBestSelling"
              checked={formData.isBestSelling === 1}
              onChange={handleChange}
            />{" "}
            Best Selling
          </label>
          <label>
            <input
              type="checkbox"
              name="isNewArrival"
              checked={formData.isNewArrival === 1}
              onChange={handleChange}
            />{" "}
            New Arrival
          </label>
          <label>
            <input
              type="checkbox"
              name="isTopRated"
              checked={formData.isTopRated === 1}
              onChange={handleChange}
            />{" "}
            Top Rated
          </label>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button>
            <Link
              to="/admin/products_list"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Back
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
