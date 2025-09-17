import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

// Frontend Pages
import Home from "../frontend/pages/Home";

// Admin Pages
import Login from "../admin/auth/sign_in.jsx";
import Dashboard from "../admin/dashboard/AdminDashboard.jsx";
import Layout from "../admin/layout/layout.jsx";
import Customers from "../frontend/pages/Customers.jsx";
import Orders from "../frontend/pages/Orders.jsx";
import Products from "../frontend/pages/Products.jsx";
import Reports from "../frontend/pages/Reports.jsx";

// ---------- ProtectedRoute ----------
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    toast.error("Please login first");
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

// ---------- AppRoutes ----------
function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Routes (Layout + Sidebar) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Optional: redirect unknown routes */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
