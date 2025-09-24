import React from "react";

const BenefitsSection = () => {
  return (
    <section
      className="relative text-white"
      style={{
        backgroundImage:
          "url('https://www.dryfruitbasket.in/themes/storefront/public/images/benefits-bg-new.jpg?v=2.1.1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 py-16 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Benefits Of Dry <br /> Fruits and Nuts
          </h2>
          <p className="text-lg mb-6 text-gray-200">
            Dry Fruits and nuts everyday will <br />
            keep diseases and stress away.
          </p>
          <button className="bg-yellow-500 text-black font-semibold px-6 py-3 rounded hover:bg-yellow-600 transition">
            KNOW MORE
          </button>
        </div>

      
      </div>
    </section>
  );
};

export default BenefitsSection;
