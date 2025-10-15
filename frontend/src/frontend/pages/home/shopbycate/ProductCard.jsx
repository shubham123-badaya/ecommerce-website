import React from "react";
import { FaHeart, FaShareAlt } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="max-w-6xl hover:shadow-sm duration-300 text-center">
      <img
        src={product.image}
        alt={product.name}
        className="mx-auto h-[220px]"
      />
      <h3 className="mt-3 font-semibold text-sm">{product.name}</h3>

      {/* Weight Selector */}
      <select className="mt-2 border rounded px-3 py-1 text-sm">
        {product.weights.map((w, i) => (
          <option key={i}>{w}</option>
        ))}
      </select>

      {/* Price */}
      <div className="mt-2 text-sm">
        <span className="font-semibold text-gray-900">₹{product.price}</span>{" "}
        <span className="line-through text-gray-400">
          ₹{product.originalPrice}
        </span>
      </div>

      {/* Buttons */}
      <div className="mt-3 flex justify-center gap-2">
        <button className="border rounded-full p-2 text-[#8b3f1c] hover:text-red-500">
          <FaHeart />
        </button>
        <button className="bg-[#fff] shadow-md text-[#8b3f1c] text-sm px-4 py-1 rounded-full hover:bg-[#a4d2dcfe]">
          Add to Cart
        </button>
        <button className="border rounded-full p-2 text-[#8b3f1c] hover:text-blue-500">
          <FaShareAlt />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
