import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

// ---------- Frontend Pages ----------
import Home from "../frontend/pages/Home";

// ---------- Admin Pages ----------
import Login from "../admin/auth/sign_in.jsx";
import Dashboard from "../admin/dashboard/AdminDashboard.jsx";
import Layout from "../admin/layout/layout.jsx";
import Customers from "../frontend/pages/Customers.jsx";
import Orders from "../frontend/pages/Orders.jsx";
import Products from "../frontend/pages/Products.jsx";
import Reports from "../frontend/pages/Reports.jsx";
import CategoryListPage from "../frontend/pages/category/CategoryListPage.jsx";
import AddCategoryPage from "../frontend/pages/category/AddCategoryPage.jsx";
import EditCategoryPage from "../frontend/pages/category/EditCategoryPage.jsx";
import SliderListPage from "../frontend/pages/sliders/SliderListPage.jsx";
import AddSliderPage from "../frontend/pages/sliders/AddSliderPage.jsx";
import EditSliderPage from "../frontend/pages/sliders/EditSliderPage.jsx";
import CouponListPage from "../frontend/pages/coupon/CouponListPage.jsx";
import AddCouponPage from "../frontend/pages/coupon/AddCouponPage.jsx";
import EditCouponPage from "../frontend/pages/coupon/EditCouponPage.jsx";

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
        {/* ---------- Frontend Routes ---------- */}
        <Route path="/" element={<Home />} />

        {/* ---------- Admin Routes ---------- */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes with Layout (Sidebar + Header etc.) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="reports" element={<Reports />} />
          {/* category  */}
          <Route path="/admin/category_list" element={<CategoryListPage />} />
          <Route path="/admin/category_add" element={<AddCategoryPage />} />
          <Route path="/admin/category_update/:id" element={<EditCategoryPage />} />
          {/* sliders  */}
          <Route path="/admin/slider_list" element={<SliderListPage />} />
          <Route path="/admin/slider_add" element={<AddSliderPage />} />
          <Route path="/admin/slider_update/:id" element={<EditSliderPage />} />
          {/* coupons  */}
          <Route path="/admin/coupons_list" element={<CouponListPage />} />
          <Route path="/admin/coupons_add" element={<AddCouponPage />} />
          <Route path="/admin/coupons_update/:id" element={<EditCouponPage />} />



        </Route>

        {/* ---------- Catch-all (Optional) ---------- */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
