// src/user/pages/WishlistPage.jsx

import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Adjust path if needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faShareAlt } from '@fortawesome/free-solid-svg-icons';

// Mock data for the wishlist items. In a real app, this would come from an API.
const initialWishlistItems = [
  {
    id: 1,
    name: 'Pine Nuts',
    image: 'https://tse2.mm.bing.net/th/id/OIP.Do3r4LEB6BtrJO_nG0v4HQAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3', // Replace with your actual image path
    price: 799.00,
    weight: '100 g',
  },
  {
    id: 2,
    name: 'Prunes',
    image: 'https://m.media-amazon.com/images/I/8129YkQGR4L._SL1500_.jpg', // Replace with your actual image path
    price: 100.00,
    weight: '100 g',
  },
  // Add more wishlist items here
];

const Userwishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  // Placeholder function to handle removing an item
  const handleRemoveItem = (itemId) => {
    setWishlistItems(currentItems => currentItems.filter(item => item.id !== itemId));
    console.log(`Removed item with id: ${itemId}`);
  };

  return (
    <div className="container mx-auto px-4 py-25">
      <div className="mb-6 text-sm text-gray-500">
        Home &gt; My Account &gt; Wishlist
      </div>
       <div className="text-2xl font-bold text-[#8b3f1c]">Wishlist</div>

      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar />

        <main className="w-full md:w-3/4">
         
          
          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-sm text-center p-4 flex flex-col justify-between">
                  <div>
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover mx-auto mb-4 rounded-md" />
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                  </div>
                  <div className="mt-4">
                    <select defaultValue={item.weight} className="w-full border border-gray-300 rounded-md p-2 bg-white mb-2">
                      <option>100 g</option>
                      <option>250 g</option>
                      <option>500 g</option>
                    </select>
                    <p className="text-lg font-bold text-gray-800 mb-4">₹{item.price.toFixed(2)}</p>
                    <div className="flex justify-around items-center text-sm text-gray-600">
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="flex items-center space-x-2 hover:text-red-600"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                        <span>Remove</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-blue-600">
                        <FontAwesomeIcon icon={faShareAlt} />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-gray-500">Your wishlist is empty.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Userwishlist;