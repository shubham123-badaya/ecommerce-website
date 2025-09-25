// DryFruitsPage.jsx
import React from "react";

// Sample data for dry fruits
const dryFruits = [
  {
    name: "Cashew (Kaju)",
    img: "https://www.dryfruitbasket.in/themes/storefront/public/images/products/cashews.jpg",
  },
  {
    name: "Anjir (Figs)",
    img: "https://www.dryfruitbasket.in/themes/storefront/public/images/products/anjir.jpg",
  },
  {
    name: "Kishmish (Raisins)",
    img: "https://www.dryfruitbasket.in/themes/storefront/public/images/products/kishmish.jpg",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/themes/storefront/public/images/products/walnut.jpg",
  },
    {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/themes/storefront/public/images/products/walnut.jpg",
  },  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/themes/storefront/public/images/products/walnut.jpg",
  },  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/themes/storefront/public/images/products/walnut.jpg",
  },  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/themes/storefront/public/images/products/walnut.jpg",
  },
];

const DryFruitsPage = () => {
  return (
    <div className="min-h-screen w-full pt-20  bg-white">
      {/* Header Banner */}
      <div
        className="w-full mx-auto h-50 flex items-center justify-center "
        style={{
          backgroundImage:
            "url('https://www.dryfruitbasket.in/storage/media/kROAwYhhT3QPVBuMbKAHXRJcmBo3EuQAlZ43CnHD.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <h1 className="text-5xl font-bold text-brown-800">Dry Fruits</h1> */}
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-600">
        Home &gt; Dry Fruits
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto mt-10 space-y-20 px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 space-y-1 0  md:grid-cols-4 gap-6">
          {dryFruits.map((fruit, index) => (
            <div
              key={index}
              className="border p-8 flex flex-col items-center bg-white shadow-sm hover:shadow-md transition-shadow rounded"
            >
              <img
                src={fruit.img}
                alt={fruit.name}
                className="w-40 h-40 object-contain  mb-4"
              />
              <br />
              <h2 className="font-semibold  text-center">{fruit.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DryFruitsPage;
