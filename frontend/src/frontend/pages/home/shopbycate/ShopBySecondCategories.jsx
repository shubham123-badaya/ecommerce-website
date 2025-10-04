import React, { useState } from "react";
import { FaHeart, FaShareAlt } from "react-icons/fa";

// Replace with your actual image paths
import b1 from "../../../../assets/shopbycate/b2.webp";
import b2 from "../../../../assets/shopbycate/b3.webp";

// Dummy Products
const dummyProducts = [
  {
    name: "Cashew (W 320)",
    image: b1,
    weights: ["100 g"],
    price: 120,
    originalPrice: 165,
    category: "BEST SELLING",
  },
  {
    name: "Indian Kishmish (Raisins)",
    image: b2,
    weights: ["100 g"],
    price: 70,
    originalPrice: 100,
    category: "BEST SELLING",
  },
  {
    name: "Almond Flakes",
    image: b2,
    weights: ["100 g"],
    price: 135,
    originalPrice: 225,
    category: "BEST SELLING",
  },
  {
    name: "Jardalu (Apricots)",
    image: b1,
    weights: ["100 g"],
    price: 70,
    originalPrice: 85,
    category: "BEST SELLING",
  },
  {
    name: "Jardalu (Apricots)",
    image: b1,
    weights: ["100 g"],
    price: 70,
    originalPrice: 85,
    category: "NEW ARRIVAL",
  },
  {
    name: "Almond Flakes",
    image: b2,
    weights: ["100 g"],
    price: 135,
    originalPrice: 225,
    category: "TOP RATED",
  },
];

// Categories
const categories = [
  { label: "BEST SELLING" },
  { label: "NEW ARRIVAL" },
  { label: "TOP RATED" },
];

const ShopBySecondCategories = () => {
  const [activeCategory, setActiveCategory] = useState("BEST SELLING");

  const onCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const filteredProducts = dummyProducts.filter(
    (product) => product.category === activeCategory
  );

  return (
    <div className= "w-full bg-[#f6f6ed] py-8 px-4 sm:px-6 lg:px-12 lg:pt-20 lg:pb-20">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto space-x-6 sm:space-x-12 justify-start sm:justify-center mb-8">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => onCategoryChange(cat.label)}
            className={`cursor-pointer pb-2 border-b-2 transition duration-300 whitespace-nowrap ${
              activeCategory === cat.label
                ? "border-[#8b3f1c] text-[#8b3f1c] font-bold"
                : "border-transparent text-gray-700 hover:text-[#8b3f1c]"
            }`}
          >
            <span className="text-base sm:text-lg font-semibold">
              {cat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {filteredProducts.map((product, index) => (
          <div
            key={index}
            className="  hover:shadow-md space-y-5 duration-300 text-center  px-4 py-10 rounded-md bg-white"
          >
            <img
              src={product.image}
              alt={product.name}
              className="mx-auto h-[200px] object-cover"
            />
            <h3 className="mt-3 font-semibold text-sm">{product.name}</h3>

            {/* Weight Selector */}
            <select className="mt-2 border rounded px-3 py-1 text-sm w-full">
              {product.weights.map((w, i) => (
                <option key={i}>{w}</option>
              ))}
            </select>

            {/* Price */}
            <div className="mt-2 space-x-3 text-md">
              <span className="font-semibold text-gray-900">
                ₹{product.price}
              </span>{" "}
              <span>|</span>
              <span className="line-through text-gray-400">
                ₹{product.originalPrice}
              </span>
            </div>

            {/* Buttons */}
            <div className="mt-3 flex justify-center gap-2">
              <button className="border rounded-full p-2 text-[#8b3f1c] hover:text-red-500">
                <FaHeart />
              </button>
              <button className="bg-[#fff] shadow-md text-[#8b3f1c] text-md px-4 py-1 rounded-full hover:bg-[#6f3014] hover:text-white">
                Add to Cart
              </button>
              <button className="border rounded-full p-2 text-[#8b3f1c] hover:text-blue-500">
                <FaShareAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopBySecondCategories;
