import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const Layout = () => {
  return (
    <div className="flex">
      {/* Sidebar Permanent Rahega */}
      <Sidebar />

      {/* Page Content */}
      <main className="flex-1 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
