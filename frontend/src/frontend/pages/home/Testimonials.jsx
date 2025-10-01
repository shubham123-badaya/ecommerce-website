import React from "react";

const testimonials = [
  {
    name: "Ronak",
    text: "Premium quality of dryfruits with best prices.",
    image:
      "https://www.dryfruitbasket.in/storage/media/client/202211111954_client_8.jpg",
  },
  {
    name: "Ankush",
    text: "Really awesome taste and ultimate packing... Very genuine product… Thanks",
    image:
      "https://www.dryfruitbasket.in/storage/media/client/202211111954_client_8.jpg",
  },
  {
    name: "Aniket",
    text: "Blueberries and other dryfruits quality is really good. Nice packing. You can carry easily along with you in office. Value for money product.",
    image:
      "https://www.dryfruitbasket.in/storage/media/client/202211111954_client_8.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full bg-[#f9f7ef] p-20 border border-b  relative overflow-hidden">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-20 ">
        WHAT OUR CLIENTS SAY
      </h2>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-6 grid gap-8 md:grid-cols-3">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-md text-center px-6 py-10 relative"
          >
            {/* Image */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-10">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white"
                />
                {/* Quote Icon */}
                <div className="absolute bottom-0 right-0 bg-[#7a3e2e] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  “
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="mt-10 italic text-sm text-gray-700">
              {item.text}
            </div>
            <p className="mt-4 text-[#7a3e2e] font-medium">{item.name}</p>
          </div>
        ))}
      </div>

      {/* Slider Dots */}
      <div className="flex justify-center mt-15 space-x-2">
        <span className="w-6 h-1 rounded-full bg-[#7a3e2e]"></span>
        <span className="w-3 h-1 rounded-full bg-gray-300"></span>
        <span className="w-3 h-1 rounded-full bg-gray-300"></span>
      </div>
    </section>
  );
};

export default Testimonials;
