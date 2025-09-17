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
      <h2 className="text-2xl font-bold mb-10">E-Commerce </h2>
      <nav className="flex flex-col gap-4 text-gray-700 font-bold">
        <Link to="/dashboard" className="hover:bg-gray-400 p-3 rounded-lg">
          Dashboard
        </Link>
        <Link to="/products" className="hover:bg-gray-400 p-3 rounded-lg">
          Products
        </Link>
        <Link to="/orders" className="hover:bg-gray-400 p-3 rounded-lg">
          Orders
        </Link>
        <Link to="/customers" className="hover:bg-gray-400 p-3 rounded-lg">
          Customers
        </Link>
        <Link to="/reports" className="hover:bg-gray-400 p-3 rounded-lg">
          Reports
        </Link>
        <Link to="/" className="hover:bg-gray-400 p-3 rounded-lg">
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="mt-8 text-white bg-red-600 hover:bg-red-700 p-3 rounded-lg text-left"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
