import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api/slider/";

const EditSliderPage = () => {
  const { id } = useParams();
  const [slider, setSlider] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const res = await axios.get(API_URL);
        const data = res.data.find((s) => s._id === id);
        setSlider(data);
      } catch (err) {
        console.error("Error fetching slider:", err);
      }
    };
    fetchSlider();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image to update");

    try {
      const formData = new FormData();
      formData.append("image", file);
      const token = localStorage.getItem("token");
      await axios.put(`${API_URL}update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/admin/slider_list");
    } catch (err) {
      console.error("Error updating slider:", err);
    }
  };

  if (!slider) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Slider</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6"
      >
        <img
          src={`http://localhost:5000/uploads/slider/${slider.image}`}
          alt="slider"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-3 rounded-lg w-full mb-4"
        />

        <button
          type="submit"
          className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600"
        >
          Update Slider
        </button>
      </form>
    </div>
  );
};

export default EditSliderPage;
