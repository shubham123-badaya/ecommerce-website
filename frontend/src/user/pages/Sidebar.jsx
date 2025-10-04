// src/components/Sidebar.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faUser, 
  faBox, 
  faHeart, 
  faFileInvoice, 
  faMapMarkerAlt, 
  faSignOutAlt, 
  faTableColumns
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

// Array of all sidebar links. Easy to add, remove, or reorder.
const sidebarLinks = [
  { name: 'Dashboard', icon: faTableColumns, path: '/user/dashboard' },
  { name: 'My Profile', icon: faUser, path: '/user/profile' },
  { name: 'My Order', icon: faBox, path: '/user/order' },
  { name: 'My Wishlist', icon: faHeart, path: '/user/wishlist' },
  { name: 'Billing Information', icon: faFileInvoice, path: '/user/bill' },
  { name: 'Log Out', icon: faSignOutAlt, path: '/logout' },
];

const Sidebar = () => {
  return (
    <aside className="w-full md:w-1/4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <nav>
          <ul>
            {sidebarLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  end={link.path === '/dashboard'} // Prevents matching child routes like '/dashboard/profile'
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-3 my-1 rounded-md text-gray-700 hover:bg-yellow-100 transition-colors duration-200 ${
                      isActive ? 'bg-yellow-50 font-bold text-gray-900' : ''
                    }`
                  }
                >
                  <FontAwesomeIcon icon={link.icon} className="w-5 h-5 text-gray-500" />
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;