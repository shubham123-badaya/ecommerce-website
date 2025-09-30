import React from "react";
import { Routes, Route } from "react-router-dom";
import FrontendLayout from "../frontend/components/layout/FrontendLayout";

// Pages
import HomeRoutes from "../frontend/pages/home/HomeRoutes";
import Dryfruit from "../frontend/pages/dryfruit/dryfruit";
import NutsBerries from "../frontend/pages/nuts_berries/NutsBerries";
import Dates from "../frontend/pages/dates/Dates";
import Seeds from "../frontend/pages/seeds/Seeds";

function FrontendRoutes() {
  return (
    <Routes>
      <Route element={<FrontendLayout />}>
        <Route path="/" element={<HomeRoutes />} />
        <Route path="/dryfruit" element={<Dryfruit />} />
        <Route path="/seeds" element={<Seeds />} />
        <Route path="/dates" element={<Dates />} />
        <Route path="/nuts_berries" element={<NutsBerries />} />
      </Route>
    </Routes>
  );
}

export default FrontendRoutes;
