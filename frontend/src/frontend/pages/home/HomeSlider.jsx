import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ---------- Custom Arrow Buttons ----------
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-[#8b3f1c] text-5xl hover:scale-110 transition-transform duration-300"
  >
    <SlArrowRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-[#8b3f1c] text-5xl hover:scale-110 transition-transform duration-300"
  >
    <SlArrowLeft />
  </div>
);

// ---------- Main Slider ----------
const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const token =
    "9d6d13290389ef4455fc3e69449e774b200815e4c70b02651364281fc92ef197f39699d506fc95cd386a2a09a1f784bfece5bc5b6c5e41c227ecfba36c38b13a";

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/frontend/sliders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setSlides(res.data?.sliders?.filter((s) => s.image) || []);
      } catch (error) {
        console.error("Error fetching sliders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true,
    adaptiveHeight: false, // important: keep false
    fade: true, // smoother transition
  };

  return (
    <div className="relative w-full overflow-hidden">
      {loading ? (
        <div className="text-center py-20 text-gray-600 text-lg font-semibold">
          Loading sliders...
        </div>
      ) : slides.length === 0 ? (
        <div className="text-center py-20 text-gray-600 text-lg font-semibold">
          No sliders available.
        </div>
      ) : (
        <div className="w-full overflow-hidden">
          <Slider {...settings}>
            {slides.map((slide) => (
              <div key={slide._id} className="!m-0 !p-0">
                <div className="relative w-full h-[500px] sm:h-[300px] md:h-[400px] overflow-hidden">
                  <img
                    src={`http://localhost:5000/uploads/slider/${slide.image}`}
                    alt={slide.title || "Slide"}
                    className="w-full h-full object-cover object-center block"
                  />

                  {slide.title && (
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-lg shadow-lg">
                      <h2 className="text-[#8b3f1c] text-2xl font-bold drop-shadow-md">
                        {slide.title}
                      </h2>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default HeroSlider;
                                                                                                                                                                                  