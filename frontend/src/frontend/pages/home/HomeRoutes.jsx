import React from "react";
import HomeSlider from "./HomeSlider";
import ShopByCategories from "./shopbycate/ShopByCategories";
import ShopBySecondCategories from "./shopbycate/ShopBySecondCategories";
import AboutUs from "../about/AboutUs";
import LatestBlog from "../blog/LatestBlog";
import BenefitsSection from "./BenefitsSection";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div >
      <HomeSlider />
      <ShopByCategories />
      <ShopBySecondCategories />
      <AboutUs />
      <LatestBlog />
      <BenefitsSection />
      <Testimonials/>
    </div>
  );
};

export default Home;
