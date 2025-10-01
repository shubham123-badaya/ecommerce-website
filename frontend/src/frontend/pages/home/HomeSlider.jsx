import React from "react";
import Slider from "react-slick";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import CategoryTabs from "./shopbycate/CategoryTabs";

// Custom Arrow Buttons
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-[#8b3f1c] text-5xl"
  >
    <SlArrowRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute  left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-[#8b3f1c] text-5xl"
  >
    <SlArrowLeft />
  </div>
);

// Slider Component
const HeroSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const slides = [
    {
      id: 1,
      img: "/images/slider1.png", // Update this with your real image path
      title: "Discover Deliciously",
      subtitle: "Delightful Health Boosters!",
    },
    {
      id: 2,
      img: "/images/slider2.png",
      title: "Munch Better",
      subtitle: "Premium Dry Fruits & Snacks",
    },
    {
      id: 3,
      img: "/images/slider3.png",
      title: "Taste the Goodness",
      subtitle: "Handpicked & Hygienic Packaging",
    },
  ];

  return (
    <>
      {" "}
      <div className="relative    bg-blue-200">
        {" "}
        {/* margin to compensate for fixed navbar */}
        <Slider {...settings}>
          {slides.map((slide) => (
            <div key={slide.id}>
              <div
                className="h-[400px] w-full bg-cover bg-center relative flex items-center"
                style={{ backgroundImage: `url(${slide.img})` }}
              >
                <div className="pl-26">
                  <div className="flex itmes-center">
                    <h2 className="text-pink-600 text-4xl font-bold">
                      {slide.title}
                    </h2>
                  </div>
                  <p className="text-lg text-gray-700">{slide.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default HeroSlider;
