import React from "react";
import Navbar from "../frontend/components/Navbar";
import HomeSlider from "../frontend/pages/home/HomeSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShopByCategories from "../frontend/pages/home/shopbycate/ShopByCategories";
import ShopBySecondCategories from "../frontend/pages/home/shopbycate/ShopBySecondCategories";
import AboutUs from "../frontend/pages/home/AboutUs";
import LatestBlog from "../frontend/pages/home/LatestBlog";
import BenefitsSection from "../frontend/pages/home/BenefitsSection";

function FrontendRoutes() {
  return (
    <div>
      {" "}
      {/* Adjust as per navbar height */}
      <Navbar />
      <div className="pt-[150px]">
        <HomeSlider />
        <ShopByCategories />
        <ShopBySecondCategories/>
        <AboutUs/>
        <LatestBlog/>
        <BenefitsSection/>
      </div>
    </div>
  );
}

export default FrontendRoutes;
