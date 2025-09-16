import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Frontend Pages
import Home from "../frontend/pages/Home";

// Admin Pages

import Login from "../admin/auth/sign_in.jsx";
// import Dashboard from "../pages/Dashboard";
// import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* ---------- Frontend Routes ---------- */}
        <Route path="/" element={<Home />} />
        {/* Superadmin Login */}
        <Route path="/admin/login" element={<Login />} />
        {/* <Route path="/admin/dashboard" element={<Dashboard />} />

        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
