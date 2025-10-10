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
    <section className="w-full bg-[#f9f7ef] py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-12 sm:mb-16">
        WHAT OUR CLIENTS SAY
      </h2>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-md text-center px-6 py-10 relative sm:px-4 sm:py-8"
          >
            {/* Image */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 sm:-top-8">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white"
                />
                {/* Quote Icon */}
                <div className="absolute bottom-0 right-0 bg-[#7a3e2e] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  “
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="mt-12 sm:mt-10 italic text-sm sm:text-xs text-gray-700">
              {item.text}
            </div>
            <p className="mt-4 text-[#7a3e2e] font-medium">{item.name}</p>
          </div>
        ))}
      </div>

      {/* Slider Dots */}
      <div className="flex justify-center mt-8 sm:mt-6 space-x-2">
        <span className="w-6 h-1 rounded-full bg-[#7a3e2e]"></span>
        <span className="w-3 h-1 rounded-full bg-gray-300"></span>
        <span className="w-3 h-1 rounded-full bg-gray-300"></span>
      </div>
    </section>
  );
};

export default Testimonials;
