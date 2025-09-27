import React from "react";
import { useParams } from "react-router-dom";
import Review from "./review";
import YouMayAlsoLike from "./YouMayAlsoLike";

const dryFruits = [
  {
    name: "Sunflower Seeds",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
    price: 40,
    oldPrice: 120,
    weight: "100g",
    description:
      "Crunchy and full of flavor, sunflower seeds are a healthy substitute for candy bars. High in vitamin E, fiber, and iron. Help lower blood pressure, prevent migraines, and have anti-inflammatory properties.",
  },
  {
    name: "Anjir (Figs)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
    price: 40,
    oldPrice: 120,
    weight: "100g",
    description:
      "Delicious dried figs rich in fiber and minerals. Help in digestion and provide natural energy.",
  },
  {
    name: "Kishmish (Raisins)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
    price: 40,
    oldPrice: 120,
    weight: "100g",
    description:
      "Naturally sweet raisins packed with antioxidants, iron, and energy-boosting properties.",
  },
  // ... other items remain unchanged
];

const ProductDetail = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const product = dryFruits.find((item) => item.name === decodedName);

  if (!product)
    return <div className="p-10 text-center">Product not found</div>;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-20 mt-10 font-serif">
        <div className="flex flex-col lg:flex-row  items-center lg:items-start">
          {/* Product Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={product.img}
              alt={product.name}
              className="w-64 sm:w-72 md:w-80 border hover:scale-130 border-gray-300 rounded"
            />
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2 space-y-5">
            <h1 className="text-2xl md:text-3xl text-[#8a6745] font-bold">
              {product.name}
            </h1>
            <p className="text-gray-700 text-sm md:text-base">
              {product.description}
            </p>

            <p className="text-base md:text-lg">
              <strong>Weight:</strong> {product.weight}
            </p>

            <div className="text-xl md:text-2xl text-[#8a6745] font-semibold">
              ₹{product.price.toFixed(2)}
              <span className="mx-2 text-gray-400">|</span>
              <span className="line-through text-[#8a6745]">
                ₹{product.oldPrice.toFixed(2)}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button className="bg-gray-700 text-white px-5 py-2 rounded hover:bg-gray-800 w-full sm:w-auto">
                Add to Cart
              </button>
              <button className="bg-[#8a6745] text-white px-5 py-2 rounded hover:bg-brown-800 w-full sm:w-auto">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <Review />

      {/* You May Also Like Section */}
      <YouMayAlsoLike />
    </>
  );
};

export default ProductDetail;
