import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const FrontendLayout = () => {
  return (
    <div className="">
      <Navbar />
      <main className="pt-20 md:pt-24 lg:pt-32 ">
        <Outlet /> {/* This is where the page content will render */}
      </main>
      <Footer />
    </div>
  );
};

export default FrontendLayout;
