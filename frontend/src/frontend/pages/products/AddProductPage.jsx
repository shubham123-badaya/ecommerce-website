import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api/products/";

const AddProductPage = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    is_featured: 0,
    isBestSelling: 0,
    isNewArrival: 0,
    isTopRated: 0,
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isEdit && id) {
      axios.get(`${API_URL}${id}`).then((res) => {
        setFormData(res.data);
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked ? 1 : 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));
    if (image) form.append("image", image);

    try {
      if (isEdit) {
        await axios.put(`${API_URL}update/${id}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${API_URL}create`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/admin/products");
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Update Product" : "Add Product"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        ></textarea>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-2 rounded"
        />

        {/* Checkboxes */}
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
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          {isEdit ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
