import React, { useState } from "react";
import CategoryTabs from "./CategoryTabs";
import ProductCard from "./ProductCard";
// IMAGE
import b1 from "../../../../../src/assets/shopbycate/b2.webp";
import b2 from "../../../../../src/assets/shopbycate/b3.webp";

const dummyProducts = [
  {
    name: "Cashew (W 320)",
    image: b1,
    weights: ["100 g"],
    price: 120,
    originalPrice: 165,
  },
  {
    name: "Indian Kishmish (Raisins)",
    image: b2,
    weights: ["100 g"],
    price: 70,
    originalPrice: 100,
  },
  {
    name: "Almond Flakes",
    image: b2,
    weights: ["100 g"],
    price: 135,
    originalPrice: 225,
  },
  {
    name: "Jardalu (Apricots)",
    image: b1,
    weights: ["100 g"],
    price: 70,
    originalPrice: 85,
  },
];

const ShopByCategories = () => {
  const [activeCategory, setActiveCategory] = useState("DRY FRUITS");

  return (
    <div className="w-full px-6 py-12 text-center">
      <h2 className="text-3xl font-semibold">SHOP BY CATEGORIES</h2>

      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <p className="max-w-6xl mx-auto text-gray-600 text-md font-medium mb-10">
        Explore our world of delectable dry fruits at Dry Fruit Basket.
        Conveniently buy dry fruits online, and experience swift and secure
        online dry fruits delivery right to your doorstep. Our selection boasts
        a variety of almonds, cashews mixed dry fruits, all handpicked for the
        best in quality. Elevate your snacking experience and well-being with
        our premium assortment of online dry fruits.
      </p>

      {/* Product Cards */}
      <div className="flex  flex-wrap justify-center gap-8">
        {dummyProducts.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-10">
        <button className="border border-[#8b3f1c] text-[#8b3f1c] px-6 py-2 rounded hover:bg-[#8b3f1c] hover:text-white transition">
          VIEW ALL
        </button>
      </div>
    </div>
  );
};

export default ShopByCategories;
