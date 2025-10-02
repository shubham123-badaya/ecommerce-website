import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api/products";

const UpdateProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  console.log("Form Data:", formData);

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        setFormData({
          ...res.data,
          category: res.data.category?._id || "",
        });
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    // Fetch categories for dropdown
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories/");
        setCategories(res.data); // [{_id, title}, ...]
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  if (!formData) return <p className="text-center">Loading...</p>;

  // Normal input handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked ? 1 : 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Variant input handler
  const handleVariantChange = (index, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[index][field] = value;
    setFormData({ ...formData, variants: newVariants });
  };

  // Add Variant
  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { name: "", price: "", mrp: "" }],
    });
  };

  // Remove Variant
  const removeVariant = (index) => {
    const newVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: newVariants });
  };

  // Submit update
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
      await axios.put(`${API_URL}/update/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product updated successfully!");
      navigate("/admin/products_list"); 
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Update Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2"
        />

        {/* Category Dropdown */}
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
        {formData.images && formData.images.length > 0 && (
          <div className="mb-2">
            <img
              src={`http://localhost:5000/uploads/product/${formData.images[0]}`} // backend folder path
              alt="Product"
              className="w-32 h-32 object-cover"
            />
          </div>
        )}

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-2"
        />

        {/* Variants */}
        <div>
          <h2 className="font-semibold mb-2">Variants</h2>
          {formData.variants.map((variant, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder="Variant Name (e.g. 100gm)"
                value={variant.name}
                onChange={(e) =>
                  handleVariantChange(index, "name", e.target.value)
                }
                className="border p-2 w-1/3"
              />
              <input
                type="number"
                placeholder="Selling Price"
                value={variant.price}
                onChange={(e) =>
                  handleVariantChange(index, "price", e.target.value)
                }
                className="border p-2 w-1/3"
              />
              <input
                type="number"
                placeholder="MRP"
                value={variant.mrp}
                onChange={(e) =>
                  handleVariantChange(index, "mrp", e.target.value)
                }
                className="border p-2 w-1/3"
              />

              {/* Add More */}
              {index === formData.variants.length - 1 && (
                <button
                  type="button"
                  onClick={addVariant}
                  className="text-green-500"
                >
                  <FaPlus />
                </button>
              )}

              {/* Delete */}
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="text-red-500"
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

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProductPage;
