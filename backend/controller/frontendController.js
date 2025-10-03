import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Slider from "../models/Slider.js";
import AboutUs from "../models/AboutUs.js";
import Blog from "../models/Blog.js";
import path from "path";
import fs from "fs";

// --- Existing Product / Category / Slider APIs ---
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

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ is_featured: 1 }).sort({ createdAt: -1 });

    res.status(200).json({
      count: categories.length,
      categories: categories.map((cat) => ({
        id: cat._id,
        title: cat.title,
        is_featured: cat.is_featured
      }))
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProductsByType = async (req, res) => {
  try {
    const { type } = req.query; 

    let filter = {};
    if (type === "best") filter.isBestSelling = 1;
    if (type === "new") filter.isNewArrival = 1;
    if (type === "top") filter.isTopRated = 1;

    const products = await Product.find(filter);

    res.status(200).json({
      type,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAboutUs = async (req, res) => {
  try {
    const aboutUs = await AboutUs.findOne();
    if (!aboutUs) {
      return res.status(404).json({ message: "About Us not found" });
    }
    res.status(200).json({ aboutUs });
  } catch (err) {
    console.error("Error fetching About Us:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



export const getLatestBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(3);
    res.status(200).json({ count: blogs.length, blogs });
  } catch (err) {
    console.error("Error fetching latest blogs:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blog);
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
