import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import {
  getWishlist,
  removeFromWishlist,
} from "../../user/pages/wishlistService";
import { useAuth } from "../auth/UserAuthContext";
import { toast } from "react-toastify";
import { IMG_URL } from "../../admin/config";

const Userwishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useAuth(); // Getting token from AuthContext

  // Fetching wishlist from backend
  const fetchWishlist = async () => {
    try {
      const res = await getWishlist(token);

      if (res.data.wishlist) {
        setWishlistItems(res.data.wishlist.products);
      } else {
        setWishlistItems([]);
      }
    } catch (error) {
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  // Handle remove item
  const handleRemoveItem = async (productId) => {
    try {
      await removeFromWishlist(productId, token);
      toast.success("Product removed from wishlist");

      fetchWishlist(); // Refresh wishlist
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="container mx-auto px-4 py-25">
      <div className="mb-6 text-sm text-gray-500">
        Home &gt; My Account &gt; Wishlist
      </div>

      <div className="text-2xl font-bold text-[#8b3f1c]">Wishlist</div>

      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar />

        <main className="w-full  md:w-3/4">
          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : Array.isArray(wishlistItems) && wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems
                .filter((item) => item?.product) // null product hata dega
                .map((item) => (
                  <div
                    key={item.product._id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm text-center p-4 flex flex-col justify-between"
                  >
                    <div>
                      <img
                        src={
                          item?.product?.images?.[0]
                            ? `${IMG_URL}/product/${item.product.images[0]}`
                            : "/placeholder.png"
                        }
                        alt={item?.product?.name || "Product"}
                        className="w-full h-auto object-cover mx-auto mb-4 rounded-md"
                      />
                      <h3 className="font-semibold text-lg">
                        {item?.product?.name || "No Name"}
                      </h3>
                    </div>

                    <div className="mt-4">
                      <p className="text-lg font-bold text-gray-800 mb-4">
                        ₹{item?.product?.price || 0}
                      </p>

                      <div className="flex justify-around items-center text-sm text-gray-600">
                        <button
                          onClick={() => handleRemoveItem(item.product._id)}
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
