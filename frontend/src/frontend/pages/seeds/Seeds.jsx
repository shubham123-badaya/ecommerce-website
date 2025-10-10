// DryFruitsPage.jsx
import React from "react";
import { Link } from "react-router-dom";

// Sample data for dry fruits
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
      "Crunchy and full of flavor, sunflower seeds are a healthy substitute for candy bars. High in vitamin E, fiber, and iron. Help lower blood pressure, prevent migraines, and have anti-inflammatory properties.",
  },
  {
    name: "Kishmish (Raisins)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
    price: 40,
    oldPrice: 120,
    weight: "100g",
    description:
      "Crunchy and full of flavor, sunflower seeds are a healthy substitute for candy bars. High in vitamin E, fiber, and iron. Help lower blood pressure, prevent migraines, and have anti-inflammatory properties.",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
    price: 40,
    oldPrice: 120,
    weight: "100g",
    description:
      "Crunchy and full of flavor, sunflower seeds are a healthy substitute for candy bars. High in vitamin E, fiber, and iron. Help lower blood pressure, prevent migraines, and have anti-inflammatory properties.",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
    price: 40,
    oldPrice: 120,
    weight: "100g",
    description:
      "Crunchy and full of flavor, sunflower seeds are a healthy substitute for candy bars. High in vitamin E, fiber, and iron. Help lower blood pressure, prevent migraines, and have anti-inflammatory properties.",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
    price: 40,
    oldPrice: 120,
    weight: "100g",
    description:
      "Crunchy and full of flavor, sunflower seeds are a healthy substitute for candy bars. High in vitamin E, fiber, and iron. Help lower blood pressure, prevent migraines, and have anti-inflammatory properties.",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
    price: 40,
    oldPrice: 120,
    weight: "100g",
    description:
      "Crunchy and full of flavor, sunflower seeds are a healthy substitute for candy bars. High in vitamin E, fiber, and iron. Help lower blood pressure, prevent migraines, and have anti-inflammatory properties.",
  },
  {
    name: "Walnuts (Akhrot)",
    img: "https://www.dryfruitbasket.in/storage/media/MbZbj4xG03oByliTd48UfKqA9AFUpePzxhUDYZqf.jpg",
    price: 40,
    oldPrice: 120,
    weight: "100g",
    description:
      "Crunchy and full of flavor, sunflower seeds are a healthy substitute for candy bars. High in vitamin E, fiber, and iron. Help lower blood pressure, prevent migraines, and have anti-inflammatory properties.",
  },
  {
    name: "Millets Seeds ",
    img: "https://www.dryfruitbasket.in/storage/media/BL3K5VKbM4opFRgfzELwYmuXlJ67NsTdjubz6LuJ.jpg",
    price: 40,
    oldPrice: 120,
    weight: "100g",
    description:
      "Crunchy and full of flavor, sunflower seeds are a healthy substitute for candy bars. High in vitamin E, fiber, and iron. Help lower blood pressure, prevent migraines, and have anti-inflammatory properties.",
  },
  {
    name: "Oats Seeds ",
    img: "https://www.dryfruitbasket.in/storage/media/AbrYNLL2461tKPF0qrgW7tb3TrRdubNsThXXvX0d.jpg",
    price: 40,
    oldPrice: 120,
    weight: "100g",
    description:
      "Crunchy and full of flavor, sunflower seeds are a healthy substitute for candy bars. High in vitamin E, fiber, and iron. Help lower blood pressure, prevent migraines, and have anti-inflammatory properties.",
  },
];

const Seeds = () => {
  return (
    <div className="min-h-screen w-full  pb-20  bg-white">
      {/* Header Banner */}
      <div
        className="w-full mx-auto h-50 flex items-center justify-center "
        style={{
          backgroundImage:
            "url('https://www.dryfruitbasket.in/storage/media/Ehv4TMvu9C14yJl7rqrwIiDHWQbTl5jKziUz8fUN.jpg')",
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
      <div className="max-w-7xl mx-auto px-6 space-y-5 font-serif  py-4 text-md text-gray-600">
        <p>
          Seeds are a key source of vegetarian protein, fiber, and healthy fats
          along with essential vitamins and minerals. Order seeds online and
          enjoy their goodness in combination with a healthy diet, as they can
          help support better overall health and immunity.
        </p>
        <p>
          A great way to ensure you never run out of stock is to buy seeds
          online. However, freshness is critical to avoid stale or pungent
          seeds. Often people purchase seeds online or old packs from their
          store and find that the seeds are stale or non-edible.
        </p>
        <p>
          At DryFruit Basket, we pride ourselves on supplying only fresh and
          premium-quality seeds at all times. Every time a customer purchases
          seeds online, fresh and hygienically-sealed packages are delivered to
          their doorstep. The wide variety on our website makes it easy for
          everyone to buy seeds online of different kinds.
        </p>
        <p>
          Order seeds online to give your health a boost of antioxidants and
          essential nutrients from the comfort of your home. Our hygienic
          packaging and storage guarantee freshness making these a perfect
          gifting solution during the festive season as well. Simply visit our
          website and comfortably purchase seeds online by adding desired
          products to the cart and completing the checkout information.
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
              <Link to={`/product/${encodeURIComponent(fruit.name)}`}>
                <img
                  src={fruit.img}
                  alt={fruit.name}
                  className="w-40 h-80 hover:scale-160 overflow-hidden scale-140 object-contain  mb-4"
                />
                <br />
                <h2 className="font-semibold  text-center">{fruit.name}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Seeds;
