import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBox,
  faHeart,
  faFileInvoice,
  faSignOutAlt,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ setUser, setIsProfileOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    if (setUser) setUser(null);
    if (setIsProfileOpen) setIsProfileOpen(false);
    navigate("/"); // Redirect to homepage
  };

  const sidebarLinks = [
    { name: "Dashboard", icon: faTableColumns, path: "/user/dashboard" },
    { name: "My Profile", icon: faUser, path: "/user/profile" },
    { name: "My Order", icon: faBox, path: "/user/order" },
    { name: "My Wishlist", icon: faHeart, path: "/user/wishlist" },
    { name: "Billing Information", icon: faFileInvoice, path: "/user/bill" },
  ];

  return (
    <aside className="w-full  md:w-1/4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <nav>
          <ul>
            {sidebarLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  end={link.path === "/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-3 my-1 rounded-md text-gray-700 hover:bg-yellow-100 transition-colors duration-200 ${
                      isActive ? "bg-yellow-100 font-bold text-gray-900" : ""
                    }`
                  }
                >
                  <FontAwesomeIcon
                    icon={link.icon}
                    className="w-5 h-5 text-gray-500"
                  />
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}

            {/* Logout Button */}
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 p-3 my-1 rounded-md text-gray-700 hover:bg-red-100 transition-colors duration-200"
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="w-5 h-5 text-red-500"
                />
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
