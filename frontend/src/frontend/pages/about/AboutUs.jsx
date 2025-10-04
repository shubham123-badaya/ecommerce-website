import React from "react";
import {
  FaBoxOpen,
  FaLeaf,
  FaMedal,
  FaShippingFast,
  FaStar,
} from "react-icons/fa";
import about from "../../../assets/about-us.png";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white">
      {/* Main Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 py-16 px-6">
        {/* Left Image */}
        <div className="flex justify-center items-center">
          <img
            src={about}
            alt="Dry Fruits"
            className="max-h-[400px] object-contain"
          />
        </div>

        {/* Right Content */}
        <div className="flex px-6 w-1xl  flex-col   justify-center">
          <h2 className="text-3xl font-bold mb-4">ABOUT US</h2>
          <p className="text-gray-700 mb-4">
            <strong>
              DryFruit Basket with all kinds of Dry Fruits have been a part of
              our diet and our culture since times immemorial.
            </strong>
          </p>
          <p className="text-gray-600 text-sm mb-4">
            Established in 1996, we are dedicated to providing quality wholesale
            dry fruits online that are rich in nutrients and taste.
          </p>
          <p className="text-gray-600 text-sm  mb-6">
            Our hygienic packaging ensures that each product is carefully sealed
            to preserve its flavour and freshness. Be it for your personal
            health goals or luxury gifting solutions, DryFruit Basket simplifies
            dry fruits online shopping by bringing quality, flavour, and
            packaging under one roof.
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
