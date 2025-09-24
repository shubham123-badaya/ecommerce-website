import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { toast } from "react-toastify";

// ---------- Frontend Pages ----------
import Home from "../routes/FrontendRoutes.jsx";

// ---------- Admin Pages ----------
import Login from "../admin/auth/sign_in.jsx";
import Dashboard from "../admin/dashboard/AdminDashboard.jsx";
import Layout from "../admin/layout/layout.jsx";
import Customers from "../admin/frontend/pages/Customers.jsx";
import Orders from "../admin/frontend/pages/Orders.jsx";
import Reports from "../admin/frontend/pages/Reports.jsx";
import CategoryListPage from "../admin/frontend/pages/category/CategoryListPage.jsx";
import AddCategoryPage from "../admin/frontend/pages/category/AddCategoryPage.jsx";
import EditCategoryPage from "../admin/frontend/pages/category/EditCategoryPage.jsx";
import SliderListPage from "../admin/frontend/pages/sliders/SliderListPage.jsx";
import AddSliderPage from "../admin/frontend/pages/sliders/AddSliderPage.jsx";
import EditSliderPage from "../admin/frontend/pages/sliders/EditSliderPage.jsx";
import CouponListPage from "../admin/frontend/pages/coupon/CouponListPage.jsx";
import AddCouponPage from "../admin/frontend/pages/coupon/AddCouponPage.jsx";
import EditCouponPage from "../admin/frontend/pages/coupon/EditCouponPage.jsx";
import ProductListPage from "../admin/frontend/pages/products/ProductListPage.jsx";
import AddProductPage from "../admin/frontend/pages/products/AddProductPage.jsx";
import UpdateProductPage from "../admin/frontend/pages/products/UpdateProductPage.jsx";

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
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="reports" element={<Reports />} />
          {/* category  */}
          <Route path="/admin/category_list" element={<CategoryListPage />} />
          <Route path="/admin/category_add" element={<AddCategoryPage />} />
          <Route
            path="/admin/category_update/:id"
            element={<EditCategoryPage />}
          />
          {/* sliders  */}
          <Route path="/admin/slider_list" element={<SliderListPage />} />
          <Route path="/admin/slider_add" element={<AddSliderPage />} />
          <Route path="/admin/slider_update/:id" element={<EditSliderPage />} />
          {/* coupons  */}
          <Route path="/admin/coupons_list" element={<CouponListPage />} />
          <Route path="/admin/coupons_add" element={<AddCouponPage />} />
          <Route path="/admin/coupons_update/:id"element={<EditCouponPage />} />
          {/* products  */}
          <Route path="/admin/products_list" element={<ProductListPage />} />
          <Route path="/admin/products_add" element={<AddProductPage/>} />
          <Route path="/admin/products_update/:id" element={<UpdateProductPage/>} />
          </Route>

        {/* ---------- Catch-all (Optional) ---------- */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
