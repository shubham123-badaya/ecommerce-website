import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "ProductId and quantity required" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: userId });

    const itemTotal = product.price * quantity;

    if (cart) {
      // Check if product already exists
      const existingItemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
        cart.items[existingItemIndex].total += itemTotal;
      } else {
        cart.items.push({
          product: productId,
          quantity,
          price: product.price,
          total: itemTotal
        });
      }

      // Recalculate cart totalPrice
      cart.totalPrice = cart.items.reduce((acc, item) => acc + item.total, 0);

      await cart.save();
    } else {
      cart = new Cart({
        user: userId,
        items: [{
          product: productId,
          quantity,
          price: product.price,
          total: itemTotal
        }],
        totalPrice: itemTotal
      });

      await cart.save();
    }

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
