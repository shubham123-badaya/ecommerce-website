import React from "react";
import dryfruit from "../../../../../src/assets/shopbycate/dryfruit.svg";
import seeds from "../../../../../src/assets/shopbycate/seeds.svg";
import dates from "../../../../../src/assets/shopbycate/dates.svg";
import nuts from "../../../../../src/assets/shopbycate/nuts.svg";

const categories = [
  { label: "DRY FRUITS", icon: dryfruit },
  { label: "SEEDS", icon: seeds },
  { label: "DATES", icon: dates },
  { label: "NUTS & BERRIES", icon: nuts },
];

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center max-w-7xl mx-auto my-12 gap-6 md:gap-12">
      {categories.map((cat, index) => (
        <div
          key={index}
          onClick={() => onCategoryChange(cat.label)}
          className={`flex flex-col md:flex-row items-center md:space-x-2 cursor-pointer pb-2 border-b-2 transition-all ${
            activeCategory === cat.label
              ? "border-[#8b3f1c] text-[#8b3f1c] font-bold"
              : "border-transparent text-gray-700 hover:text-[#8b3f1c] hover:border-[#8b3f1c]"
          }`}
        >
          <span className="w-12 h-12 md:w-8 md:h-8 flex justify-center items-center">
            <img
              src={cat.icon}
              alt={cat.label}
              className="w-full h-full object-contain"
            />
          </span>
          <span className="text-sm md:text-lg font-bold mt-1 md:mt-0 text-center md:text-left">
            {cat.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategoryTabs;
