import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {
  // handle login button
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/admin/login");
    }, 1000);
  };
  return (
    <aside className="w-64 bg-[#e2e2e2] text-black min-h-screen p-6">
      <h2 className="text-1xl h-20 w-20 rounded-full bg-red-800 flex items-center mx-auto p-3 text-white font-bold mb-10">E-Shop</h2>
      <nav className="flex flex-col gap-4 text-gray-700 font-bold">
        <Link to="/admin/dashboard" className="hover:bg-gray-400 p-3 rounded-lg">
          Dashboard
        </Link>
        <Link to="/admin/products" className="hover:bg-gray-400 p-3 rounded-lg">
          Products
        </Link>
        <Link to="/admin/orders" className="hover:bg-gray-400 p-3 rounded-lg">
          Orders
        </Link>
        <Link to="/admin/coupons_list" className="hover:bg-gray-400 p-3 rounded-lg">
          Coupon
        </Link>
        <Link to="/admin/slider_list" className="hover:bg-gray-400 p-3 rounded-lg">
          Sliders
        </Link>
        <Link to="/admin/category_list" className="hover:bg-gray-400 p-3 rounded-lg">
          Category
        </Link>
        <button
          onClick={handleLogout}
          className="mt-8 text-white bg-red-800 hover:bg-red-700 p-3 rounded-lg text-left"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
