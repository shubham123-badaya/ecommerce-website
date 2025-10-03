// DryFruitsPage.jsx
import React from "react";

// Sample data for dry fruits
const dryFruits = [
  {
    name: "Cashew (Kaju)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
  },
  {
    name: "Anjir (Figs)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
  },
  {
    name: "Kishmish (Raisins)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
  },
];

const DryFruitsPage = () => {
  return (
    <div className="min-h-screen w-full mt-15 pb-15  bg-white">
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
      ></div>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 py-4 text-sm text-gray-600">
        Home &gt; Dry Fruits
      </div>
      <div className="max-w-6xl mx-auto px-6 py-4 text-xl font-bold  text-[#92553d]">
        Dry Fruits
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto mt-10 space-y-20 px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 space-y-1  md:grid-cols-4 gap-6">
          {dryFruits.map((fruit, index) => (
            <div
              key={index}
              className=" p-8 flex flex-col items-center bg-white border border-gray-300 hover:shadow-md transition-shadow rounded"
            >
              <img
                src={fruit.img}
                alt={fruit.name}
                className="w-40 h-80 object-contain  mb-4"
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
