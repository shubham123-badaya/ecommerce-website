import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Slider from "../models/Slider.js";


export const getCategoryByProduct = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const products = await Product.find({ category: categoryId });

    res.status(200).json({
      category: {
        id: category._id,
        name: category.title,
      },
      products,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }
    const products = await Product.find({
      title: { $regex: q, $options: "i" }
    });

    res.status(200).json({
      query: q,
      results: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find().sort({ createdAt: -1 });
    res.status(200).json({
      count: sliders.length,
      sliders
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
