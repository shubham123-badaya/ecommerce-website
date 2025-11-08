import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import WhatsAppButton from "./WhatsAppButton";

const FrontendLayout = () => {
  return (
    <div className="">
      <Navbar />
      <main className="pt-20 md:pt-24 lg:pt-32 min-h-screen">
        <Outlet />
        <WhatsAppButton/>
      </main>

      <Footer />
    </div>
  );
};

export default FrontendLayout;
