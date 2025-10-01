import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const FrontendLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="pt-18">
        <Outlet /> {/* This is where the page content will render */}
      </main>
      <Footer />
    </div>
  );
};

export default FrontendLayout;
