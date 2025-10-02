import React from "react";
import bg from "./image.png"; // 👈 top banner background

function AboutCompany() {
  const sections = [
    {
      title: "Greetings from DryFruit Basket!",
      text: [
        "DryFruit Basket is a premium health food brand and online dry fruit store in India. Established in 1996, we are dedicated to providing quality wholesale dry fruits online that are rich in nutrients and taste.",
        "Our hygienic packaging ensures that each product is carefully sealed to preserve its flavour and freshness. Be it for your personal health goals or luxury gifting solutions, DryFruit Basket simplifies dry fruits online shopping by bringing quality, flavour, and packaging under one roof.",
        "We source all our products from reputed growers and comply with all the standards of the Food Safety and Standards Authority of India (FSSAI) to ensure consistent quality at all times. For those looking to buy dry fruits online, we bring you over 70 different varieties of dry fruits, nuts, seeds, and raisins.",
      ],
      img: "https://www.dryfruitbasket.in/themes/storefront/public/images/about-us-responsive-img.jpg",
      reverse: false,
    },
    {
      text: [
        "Our basket of dry fruits and nuts are sourced from the top-notch quality growers, and cleaned, sorted and packaged manually to ensure that their freshness and flavor is well preserved. We offer last-mile delivery with innovative packaging, to keep dry fruits and nuts fresh and free from impurities.",
        "Quality is synonymous with DryFruit Basket. We meticulously comply with the standards of Food Safety and Standards Authority of India (FSSAI) at our cleaning and packaging facility. We also follow stringent quality control practices. This helps us deliver dry fruits and nuts of premium quality and taste.",
        "Shop premium quality of dry fruits and nuts online.",
      ],
      img: "https://www.dryfruitbasket.in/themes/storefront/public/images/about-us-responsive-img-1.jpg",
      reverse: true,
    },
    {
      title: "Our Vision",
      text: [
        "We envision becoming the customer’s first choice for dry fruits and nuts, by bringing the freshest and highest quality to maximum number of customers through our online venture.",
      ],
      img: "https://www.dryfruitbasket.in/themes/storefront/public/images/vission-mission-responsive-img.jpg",
      reverse: false,
      subtitle: "Mission",
      subtitleText:
        "We endeavor to achieve our vision by following a pro-customer approach and adhering to international standards of quality, right from selection of dry fruits and nuts to product delivery.",
    },
  ];

  return (
    <div className="w-full mt-15 min-h-screen bg-white">
      {/* Top Banner */}
      <div
        className="w-full h-48 sm:h-64 md:h-72 flex items-center justify-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Header */}
      <div className="w-full py-8 sm:py-12 border-b border-gray-200">
        <div className="max-w-6xl mx-auto  flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-[#92553d] text-sm sm:text-base">Home 👈 About Us</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              About Us
            </h1>
          </div>
          <button className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 text-sm sm:text-base">
            DOWNLOAD BROCHURE
          </button>
        </div>
      </div>

      {/* Zig-Zag Sections */}
      <div className="w-full">
        {sections.map((sec, index) => (
          <div
            key={index}
            className={`w-full flex flex-col md:flex-row ${
              sec.reverse ? "md:flex-row-reverse" : ""
            }`}
            style={{
              backgroundImage: `url(${sec.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay for readability */}
            <div className="w-full bg-black/40 flex items-center justify-center">
              <div className="max-w-5xl p-8 sm:p-12 text-center md:text-left">
                {sec.title && (
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {sec.title}
                  </h2>
                )}
                {sec.text.map((para, i) => (
                  <p
                    key={i}
                    className="text-white/90 mb-4 text-sm sm:text-base md:text-lg leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
                {sec.subtitle && (
                  <div className="mt-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      {sec.subtitle}
                    </h3>
                    <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mt-2">
                      {sec.subtitleText}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutCompany;
