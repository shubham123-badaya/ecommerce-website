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
    <div className="flex max-w-7xl justify-center space-x-12 my-12">
      {categories.map((cat, index) => (
        <div
          key={index}
          onClick={() => onCategoryChange(cat.label)}
          className={`flex items-center space-x-2 cursor-pointer pb-2 border-b-2 ${
            activeCategory === cat.label
              ? "border-[#8b3f1c] text-[#8b3f1c] font-bold"
              : "border-transparent text-gray-700"
          }`}
        >
          <span>
            <img src={cat.icon} alt="dryfruit" />
          </span>
          <span className="text-lg font-bold">{cat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryTabs;
