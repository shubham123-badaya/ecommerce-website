// DryFruitsPage.jsx
import React from "react";

// Sample data for dry fruits
const dryFruits = [
  {
    name: "Cashew (Kaju)",
    img: "https://www.dryfruitbasket.in/storage/media/n2pFvGro2stUiHHyu1vK19VfvG7nXNnrh3SdrVsx.jpg",
  },
  {
    name: "Anjir (Figs)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
  },
  {
    name: "Kishmish (Raisins)",
    img: "https://www.dryfruitbasket.in/storage/media/n2pFvGro2stUiHHyu1vK19VfvG7nXNnrh3SdrVsx.jpg",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/n2pFvGro2stUiHHyu1vK19VfvG7nXNnrh3SdrVsx.jpg",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/n2pFvGro2stUiHHyu1vK19VfvG7nXNnrh3SdrVsx.jpg",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
  },
  {
    name: "Millets Seeds ",
    img: "https://www.dryfruitbasket.in/storage/media/n2pFvGro2stUiHHyu1vK19VfvG7nXNnrh3SdrVsx.jpg",
  },
  {
    name: "Oats Seeds ",
    img: "https://www.dryfruitbasket.in/storage/media/AbrYNLL2461tKPF0qrgW7tb3TrRdubNsThXXvX0d.jpg",
  },
];

const Dates = () => {
  return (
    <div className="min-h-screen w-full  pb-20  bg-white">
      {/* Header Banner */}
      <div
        className="w-full mx-auto h-50 flex items-center justify-center "
        style={{
          backgroundImage:
            "url('https://www.dryfruitbasket.in/storage/media/7fxdAWoTMfRXJVYPYLCm9e8HTkcaGnpDucGpRFnB.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm font-semibold">
        Home &gt; Dry Fruits
      </div>
      <div className="max-w-7xl mx-auto px-4 space-y-5   py-4 text-md text-gray-900">
        <p>
          Dates (also known as khajur) are a highly nutritious sweet fruit that
          work well as a substitute for refined sugar. Rich in iron and several
          essential minerals, dates can be enjoyed raw or in desserts leading
          more people to buy dates online. A lot of healthy bakers buy kimia
          dates online as a healthy substitute for pastries and cakes.
        </p>
        <p>
          Whether eaten by itself or added to a sweet dish, these tiny dates are
          a powerhouse of nutrition. DryFruit Basket is ideal to buy dates
          online with an extensive collection of Safawi, Oman, Medjoul, Khimiya,
          and Ajwa Dates. Our user-friendly website makes khajur online shopping
          an easy task for everyone looking for healthy alternatives.
        </p>
        <p>
          Whether eaten by itself or added to a sweet dish, these tiny dates are
          a powerhouse of nutrition. DryFruit Basket is ideal to buy dates
          online with an extensive collection of Safawi, Oman, Medjoul, Khimiya,
          and Ajwa Dates. Our user-friendly website makes khajur online shopping
          an easy task for everyone looking for healthy alternatives.
        </p>
        <p>
          You can enjoy premium freshness when you buy khajoor online from our
          website as they are free from any additives, preservatives, or
          artificial colours. We partner with the best growers and source dates
          directly from them for our customers who prefer to buy dates online.
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto mt-10  space-y-20 px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 space-y-1  md:grid-cols-4 gap-6">
          {dryFruits.map((fruit, index) => (
            <div
              key={index}
              className=" p-4 border border-gray-300 flex flex-col items-center bg-white shadow- hover:shadow-md transition-shadow rounded duration-500"
            >
              <img
                src={fruit.img}
                alt={fruit.name}
                className="w-40 h-80 hover:scale-160 overflow-hidden scale-140 object-contain  mb-4"
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

export default Dates;
