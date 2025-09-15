import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../admin/auth/sign_in.jsx";
// import Dashboard from "../pages/Dashboard";
// import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Superadmin Login */}
        <Route path="/admin/login" element={<Login />} />
        {/* <Route path="/admin/dashboard" element={<Dashboard />} />

        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
