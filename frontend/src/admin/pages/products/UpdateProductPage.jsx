import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api/products";

const UpdateProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [id]);

  if (!formData) return <p className="text-center">Loading...</p>;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked ? 1 : 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleVariantChange = (index, e) => {
    const newVariants = [...formData.variants];
    newVariants[index][e.target.name] = e.target.value;
    setFormData({ ...formData, variants: newVariants });
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { size: "", color: "" }],
    });
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
      await axios.put(`${API_URL}/update/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/products_list");
    } catch (err) {
      console.error("Error updating product:", err);
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
        <input
          type="text"
          name="category"
          placeholder="Category ID"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2"
        />
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
