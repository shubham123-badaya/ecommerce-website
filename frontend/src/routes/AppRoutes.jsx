import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { toast } from "react-toastify";

// ---------- Frontend Pages ----------
import FrontendRoutes from "../routes/FrontendRoutes.jsx";

// ---------- Admin Pages ----------
import Login from "../admin/auth/sign_in.jsx";
import Dashboard from "../admin/dashboard/AdminDashboard.jsx";
import Layout from "../admin/layout/layout.jsx";
import Customers from "../admin/pages/Customers.jsx";
import Orders from "../admin/pages/Orders.jsx";
import Reports from "../admin/pages/Reports.jsx";
import CategoryListPage from "../admin/pages/category/CategoryListPage.jsx";
import AddCategoryPage from "../admin/pages/category/AddCategoryPage.jsx";
import EditCategoryPage from "../admin/pages/category/EditCategoryPage.jsx";
import SliderListPage from "../admin/pages/sliders/SliderListPage.jsx";
import AddSliderPage from "../admin/pages/sliders/AddSliderPage.jsx";
import EditSliderPage from "../admin/pages/sliders/EditSliderPage.jsx";
import CouponListPage from "../admin/pages/coupon/CouponListPage.jsx";
import AddCouponPage from "../admin/pages/coupon/AddCouponPage.jsx";
import EditCouponPage from "../admin/pages/coupon/EditCouponPage.jsx";
import ProductListPage from "../admin/pages/products/ProductListPage.jsx";
import AddProductPage from "../admin/pages/products/AddProductPage.jsx";
import UpdateProductPage from "../admin/pages/products/UpdateProductPage.jsx";
import Dryfruit from "../frontend/pages/dryfruit/dryfruit.jsx";
import Seeds from "../frontend/pages/seeds/Seeds.jsx";
import Dates from "../frontend/pages/dates/Dates.jsx";
import NutsBerries from "../frontend/pages/nuts_berries/NutsBerries.jsx";
import FrontendLayout from "../frontend/components/layout/FrontendLayout.jsx";
import ProductDetail from "../frontend/pages/seeds/ProductDetails.jsx";
import AllBlogsPage from "../frontend/pages/blog/AllBlogsPage.js.jsx";

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
        <Route element={<FrontendLayout />}>
          {/* ---------- Frontend Routes ---------- */}
          <Route path="/" element={<FrontendRoutes />} />
          <Route path="/dryfruit" element={<Dryfruit />} />
          <Route path="/seeds" element={<Seeds />} />
          <Route path="/product/:name" element={<ProductDetail />} />
          <Route path="/blogs" element={<AllBlogsPage />} />

          <Route path="/dates" element={<Dates />} />
          <Route path="/nuts_berries" element={<NutsBerries />} />
        </Route>
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
          <Route
            path="/admin/coupons_update/:id"
            element={<EditCouponPage />}
          />
          {/* products  */}
          <Route path="/admin/products_list" element={<ProductListPage />} />
          <Route path="/admin/products_add" element={<AddProductPage />} />
          <Route
            path="/admin/products_update/:id"
            element={<UpdateProductPage />}
          />
        </Route>

        {/* ---------- Catch-all (Optional) ---------- */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
