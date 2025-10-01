import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

// Add product to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find or create user's wishlist
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    // Check if product already in wishlist
    const exists = wishlist.products.find(p => p.product?.toString() === productId);
    if (exists) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    wishlist.products.push({ product: productId });
    await wishlist.save();

    // Populate product details for response
    await wishlist.populate("products.product");

    res.status(200).json({
      message: "Product added to wishlist",
      wishlist
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user's wishlist
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishlist = await Wishlist.findOne({ user: userId }).populate("products.product");
    if (!wishlist) {
      return res.status(200).json({ message: "Wishlist is empty", wishlist: [] });
    }
    res.status(200).json({ wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (p) => p.product.toString() !== productId
    );

    await wishlist.save();
    await wishlist.populate("products.product");

    res.status(200).json({
      message: "Product removed from wishlist",
      wishlist
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
