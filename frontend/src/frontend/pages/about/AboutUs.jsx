import React from "react";
import {
  FaBoxOpen,
  FaLeaf,
  FaMedal,
  FaShippingFast,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const AboutUs = () => {
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/about", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAboutData(res.data.aboutUs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching About Us:", err);
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!aboutData)
    return (
      <p className="text-center mt-10 text-red-500">No About Us data found.</p>
    );

  return (
    <div className="w-full bg-white">
      {/* Main Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 py-16 px-6">
        {/* Left Image */}
        <div className="flex justify-center items-center">
          {aboutData.image && (
            <img
              src={`http://localhost:5000/uploads/about/${aboutData.image}`}
              alt="About"
              className="max-h-[400px] object-contain rounded-lg shadow"
            />
          )}
        </div>

        {/* Right Content */}
        <div className="flex px-6 w-1xl  flex-col   justify-center">
          <h2 className="text-3xl font-bold mb-4">{aboutData.title}</h2>
          <p className="text-gray-700 mb-4">
            <strong>{aboutData.description}</strong>
          </p>

          <button
            onClick={() => navigate("/about_company")}
            className="border text-brown-700 px-3 py-2 text-[#70512e] font-bold  rounded hover:bg-[#70512e] hover:text-white transition"
          >
            KNOW MORE
          </button>
        </div>
      </div>

      {/* Bottom Features */}
      <div className="bg-[#70512e] text-white py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center px-6">
          <div className="flex flex-col items-center">
            <FaBoxOpen size={30} className="mb-2" />
            <p>Wide Products Range</p>
          </div>

          <div className="flex flex-col items-center">
            <FaStar size={30} className="mb-2" />
            <p>Highest Quality Products</p>
          </div>

          <div className="flex flex-col items-center">
            <FaLeaf size={30} className="mb-2" />
            <p>100% Natural & Organic</p>
          </div>

          <div className="flex flex-col items-center">
            <FaMedal size={30} className="mb-2" />
            <p>Best Services</p>
          </div>

          <div className="flex flex-col items-center col-span-2 md:col-span-1">
            <FaShippingFast size={30} className="mb-2" />
            <p>On-Time Delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
