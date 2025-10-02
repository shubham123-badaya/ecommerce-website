import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_URL = "http://localhost:5000/api/products/create";

const AddProductPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    mrp: "",
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
        const res = await axios.get("http://localhost:5000/api/categories/");
        // If your categories endpoint returns { categories: [...] } adjust accordingly
        setCategories(res.data || []);
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

  // Add new empty variant
  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { name: "", price: "", mrp: "" }],
    });
  };

  // Remove variant by index
  const removeVariant = (index) => {
    const newVariants = [...formData.variants];
    newVariants.splice(index, 1);
    setFormData({ ...formData, variants: newVariants });
  };

  // Update variant fields
  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = [...formData.variants];
    newVariants[index] = { ...newVariants[index], [name]: value };
    setFormData({ ...formData, variants: newVariants });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();

      // Append simple fields
      Object.keys(formData).forEach((key) => {
        if (key === "variants") {
          form.append("variants", JSON.stringify(formData.variants));
        } else {
          form.append(key, formData[key]);
        }
      });

      if (image) form.append("image", image);

      const token = localStorage.getItem("token");
      await axios.post(API_URL, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully!");
      navigate("/admin/products_list");
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err.message);
      toast.error("Failed to add product");
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
            <option key={cat._id || cat.id} value={cat._id || cat.id}>
              {cat.title || cat.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="price"
          placeholder="Base Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          type="number"
          name="mrp"
          placeholder="MRP"
          value={formData.mrp}
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
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Variants</h2>
            <button
              type="button"
              onClick={addVariant}
              className="text-green-500"
            >
              <FaPlus />
            </button>
          </div>

          {formData.variants.length === 0 && (
            <p className="text-sm text-gray-500 mb-2">No variants added yet.</p>
          )}

          {formData.variants.map((variant, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                name="name"
                placeholder="Variant Name (e.g. 100gm)"
                value={variant.name}
                onChange={(e) => handleVariantChange(index, e)}
                className="border p-2 w-1/3"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={variant.price}
                onChange={(e) => handleVariantChange(index, e)}
                className="border p-2 w-1/3"
              />
              <input
                type="number"
                name="mrp"
                placeholder="MRP"
                value={variant.mrp}
                onChange={(e) => handleVariantChange(index, e)}
                className="border p-2 w-1/3"
              />
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="text-red-600 hover:text-red-800 p-2"
                title="Remove variant"
              >
                <FaTrash />
              </button>
            </div>
          ))}
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
          <Link
            to="/admin/products_list"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
