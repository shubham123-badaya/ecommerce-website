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

const NutsBerries = () => {
  return (
    <div className="min-h-screen w-full pt-20 pb-20  bg-white">
      {/* Header Banner */}
      <div
        className="w-full mx-auto h-50 flex items-center justify-center "
        style={{
          backgroundImage:
            "url('https://www.dryfruitbasket.in/storage/media/XcOY7ql19b4XcDlaPRaEXiVs45lqPF1X1z8Tu2i7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm font-semibold">
        Home &gt; Dry Fruits
      </div>
      <div className="max-w-7xl mx-auto px-4 space-y-5   py-4 text-md text-gray-900">
        <p>
          A perfect snack often includes both sweet and savoury flavours.
          DryFruit Basket, a leading berries and nuts company, brings you the
          perfect snack-time solution with its nutrition-packed range of quality
          nuts and berries online.
        </p>
        <p>
          When looking to buy nuts online, you can choose from exotic Hazelnuts
          and Macadamia nuts to selenium-rich Brazil nuts. Combine these with
          the sweetness of black currants and berries from DryFruit Basket, a
          trusted berries and nuts company for a wholesome trail mix loaded with
          nutrition and flavour.
        </p>
        <p>
          Buying nuts and berries online is a comfortable way of supporting a
          healthier immune system and receiving essential nutrition, while
          possibly preventing certain health conditions such as diabetes and
          cognitive decline when consumed along with a healthy diet.
        </p>
        <p>
          Quality and freshness are important considerations when buying nuts
          and berries online. DryFruit Basket sources nuts and berries from
          reputed and pure sources only making it your number one choice to buy
          nuts online whether it is for yourself or as a gift.
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

export default NutsBerries;
