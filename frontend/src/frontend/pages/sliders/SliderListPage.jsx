import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/slider/"; // 👈 apna backend ka URL lagao

const SliderListPage = () => {
  const [sliders, setSliders] = useState([]);

  const fetchSliders = async () => {
    try {
      const res = await axios.get(API_URL);
      setSliders(res.data);
    } catch (err) {
      console.error("Error fetching sliders:", err);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this slider?")) return;
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}delete/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchSliders();
    } catch (err) {
      console.error("Error deleting slider:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold"> Slider List</h1>
        <Link
          to="/admin/slider_add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Slider
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {sliders.map((slider) => (
          <div
            key={slider._id}
            className="bg-white shadow-md rounded-2xl p-4 text-center"
          >
            <img
              src={`http://localhost:5000/uploads/slider/${slider.image}`}
              alt="slider"
              className="w-full h-48 object-cover rounded-xl mb-3"
            />

            <div className="flex justify-center gap-3">
              <Link
                to={`/admin/slider_update/${slider._id}`}
                className="bg-yellow-500 px-4 py-1 rounded-lg text-white"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(slider._id)}
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

export default SliderListPage;
