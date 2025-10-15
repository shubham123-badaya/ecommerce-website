import React, { useEffect, useState } from "react";
import axios from "axios";

// Local icons (static)
import dryfruit from "../../../../../src/assets/shopbycate/dryfruit.svg";
import seeds from "../../../../../src/assets/shopbycate/seeds.svg";
import dates from "../../../../../src/assets/shopbycate/dates.svg";
import nuts from "../../../../../src/assets/shopbycate/nuts.svg";

const iconMap = {
  "Dry Fruits": dryfruit,
  "Seeds": seeds,
  "Dates": dates,
  "Nuts & Berries": nuts,
};

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/frontend/categories", {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzU2NDQ4MTBlYWIzMTkzOGViZjE0OCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2MDAyMDUwMiwiZXhwIjoxNzYwNjI1MzAyfQ.x-sEpgRub6PVzOmegW7wVpwZqWQC4r_9K7MDPrsIhJs",
          },
        });

        // Map API data with local icons
        const apiCategories = res.data?.categories || [];
        const merged = apiCategories.map((cat) => ({
          label: cat.title,
          icon: iconMap[cat.title] || dryfruit, // fallback icon
        }));

        setCategories(merged);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
            {cat.label.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategoryTabs;
