import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./Header"

const Layout = () => {
  return (
    <div className="flex p-1">
      {/* Sidebar Permanent Rahega */}
      <Sidebar />

      {/* Page Content */}
      <main className="flex-1 p-1 bg-gray-100 min-h-screen">
        <Header/>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
