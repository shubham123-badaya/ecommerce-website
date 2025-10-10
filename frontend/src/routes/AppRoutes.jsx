import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { toast } from "react-toastify";

// ---------- Frontend Layout & Pages ----------
import FrontendLayout from "../frontend/components/layout/FrontendLayout";
import HomeRoutes from "../frontend/pages/home/HomeRoutes";
import Dryfruit from "../frontend/pages/dryfruit/dryfruit";
import Seeds from "../frontend/pages/seeds/Seeds";
import Dates from "../frontend/pages/dates/Dates";
import NutsBerries from "../frontend/pages/nuts_berries/NutsBerries";
import ProductDetail from "../frontend/pages/seeds/ProductDetails";
import AllBlogsPage from "../frontend/pages/blog/AllBlogsPage.js.jsx";
import BlogDetails from "../frontend/pages/blog/BlogDetails";
import About_Company from "../frontend/pages/about/About_Company";
import MyAccount from "../frontend/pages/MyAccounts/MyAccount";
import Register from "../frontend/pages/MyAccounts/Register";
import ResetPassword from "../frontend/pages/MyAccounts/ResetPassword";
import Contact from "../frontend/pages/customercare/Contact";
import TermsConditions from "../frontend/pages/customercare/TermsConditions";
import PrivacyPolicy from "../frontend/pages/customercare/PrivacyPolicy";

// ---------- User Pages ----------
import UserDashboard from "../user/pages/UserDashboard";
import UserProfile from "../user/pages/UserProfile";
import UserOrder from "../user/pages/UserOrder";
import UserBilling from "../user/pages/UserBilling";
import Userwishlist from "../user/pages/Userwishlist";

// ---------- Admin Layout & Pages ----------
import Layout from "../admin/layout/layout";
import Login from "../admin/auth/Login";
import Dashboard from "../admin/dashboard/AdminDashboard";
import Customers from "../admin/pages/Customers";
import Orders from "../admin/pages/Orders";
import Reports from "../admin/pages/Reports";
import CategoryListPage from "../admin/pages/category/CategoryListPage";
import AddCategoryPage from "../admin/pages/category/AddCategoryPage";
import EditCategoryPage from "../admin/pages/category/EditCategoryPage";
import SliderListPage from "../admin/pages/sliders/SliderListPage";
import AddSliderPage from "../admin/pages/sliders/AddSliderPage";
import EditSliderPage from "../admin/pages/sliders/EditSliderPage";
import CouponListPage from "../admin/pages/coupon/CouponListPage";
import AddCouponPage from "../admin/pages/coupon/AddCouponPage";
import EditCouponPage from "../admin/pages/coupon/EditCouponPage";
import ProductListPage from "../admin/pages/products/ProductListPage";
import AddProductPage from "../admin/pages/products/AddProductPage";
import UpdateProductPage from "../admin/pages/products/UpdateProductPage";

// ---------- Protected Route ----------
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    toast.error("Please login first");
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

// ---------- App Routes ----------
function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* ---------- Frontend Pages with Layout ---------- */}
        <Route element={<FrontendLayout />}>
          <Route path="/" element={<HomeRoutes />} />
          <Route path="/dryfruit" element={<Dryfruit />} />
          <Route path="/seeds" element={<Seeds />} />
          <Route path="/dates" element={<Dates />} />
          <Route path="/nuts_berries" element={<NutsBerries />} />
          <Route path="/product/:name" element={<ProductDetail />} />
          <Route path="/blogs" element={<AllBlogsPage />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/about_company" element={<About_Company />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget/reset" element={<ResetPassword />} />
          <Route path="/contact_us" element={<Contact />} />
          <Route path="/terms_conditions" element={<TermsConditions />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />

          {/* User routes */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/order" element={<UserOrder />} />
          <Route path="/user/bill" element={<UserBilling />} />
          <Route path="/user/wishlist" element={<Userwishlist />} />
        </Route>

        {/* ---------- Admin Login (No FrontendLayout) ---------- */}
        <Route path="/admin/login" element={<Login />} />

        {/* ---------- Protected Admin Routes ---------- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="category_list" element={<CategoryListPage />} />
          <Route path="category_add" element={<AddCategoryPage />} />
          <Route path="category_update/:id" element={<EditCategoryPage />} />
          <Route path="slider_list" element={<SliderListPage />} />
          <Route path="slider_add" element={<AddSliderPage />} />
          <Route path="slider_update/:id" element={<EditSliderPage />} />
          <Route path="coupons_list" element={<CouponListPage />} />
          <Route path="coupons_add" element={<AddCouponPage />} />
          <Route path="coupons_update/:id" element={<EditCouponPage />} />
          <Route path="products_list" element={<ProductListPage />} />
          <Route path="products_add" element={<AddProductPage />} />
          <Route path="products_update/:id" element={<UpdateProductPage />} />
        </Route>

        {/* ---------- Catch-all ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
