import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/slider";

const AddSliderPage = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");

    try {
      const formData = new FormData();
      formData.append("image", file);
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/admin/slider_list");
    } catch (err) {
      console.error("Error adding slider:", err);
    }
  };

  return (
    <div className="max-w-2xl  flex flex-col justify-center mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4">➕ Add New Slider</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 "
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-3 rounded-lg w-full mb-4"
        />

       <div className="space-x-2">
         <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Slider
        </button>
         
        <button >  <Link
          to="/admin/slider_list"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Back
        </Link></button>
       </div>
      </form>
    </div>
  );
};

export default AddSliderPage;
