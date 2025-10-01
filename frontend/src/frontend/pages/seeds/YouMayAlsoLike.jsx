import React from "react";

const products = [
  {
    id: 1,
    name: "Pumpkin Seeds",
    img: "https://www.dryfruitbasket.in/storage/media/99PStmaih70cGrJpInlsLlgO0ddw0TNd1EUTej7m.jpg",
    price: 285,
    oldPrice: 340,
  },
  {
    id: 2,
    name: "Chia Seeds",
    img: "https://www.dryfruitbasket.in/storage/media/mUTXL9yErhaNpYDR6i1lVKk2r49pOrHm7hc3fahB.jpg",
    price: 220,
    oldPrice: 260,
  },
  {
    id: 3,
    name: "Seven Seeds",
    img: "https://www.dryfruitbasket.in/storage/media/arfhvxen1tCXTUMOeU91AdxHZ4jWxwO0bFTXCWXV.jpg",
    price: 230,
    oldPrice: 280,
  },
  {
    id: 4,
    name: "Water Melon Seeds",
    img: "https://www.dryfruitbasket.in/storage/media/gTDKkSoG8MtmPNUFS4ZUAuwDvZKRrrffPYXqFUUJ.jpg",
    price: 285,
    oldPrice: 340,
  },
];

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white max-w-5xl shadow-md rounded-2xl p-4 text-center hover:shadow-lg transition">
      <img
        src={product.img}
        alt={product.name}
        className="w-40 h-60 object-contain mx-auto"
      />
      <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>

      {/* Quantity dropdown */}
      <select className="mt-2 border rounded-md px-2 py-1 text-sm">
        <option>100 g</option>
        <option>200 g</option>
        <option>500 g</option>
      </select>

      {/* Price */}
      <div className="mt-2">
        <span className="text-lg font-bold">₹{product.price}.00</span>{" "}
        <span className="line-through text-gray-400 text-sm">
          ₹{product.oldPrice}.00
        </span>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-3 mt-3">
        <button className="border rounded-full p-2 text-gray-500 hover:text-red-500">
          ❤
        </button>
        <button className="bg-[#8f6e52] text-white px-4 py-2 rounded-full hover:bg-orange-600">
          Add to Cart
        </button>
        <button className="border rounded-full p-2 text-gray-500 hover:text-blue-500">
          ⤴
        </button>
      </div>
    </div>
  );
};

const YouMayAlsoLike = () => {
  return (
    <section className="p-20">
      <h2 className="text-center text-xl font-bold uppercase tracking-wide mb-8">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default YouMayAlsoLike;
