import Category from "../models/Category.js";
import fs from "fs";
import path from "path";

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add new category
export const addCategory = async (req, res) => {
  try {
    const { title, is_featured } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // ✅ Save only filename in DB
    const imageFile = req.file.filename;

    const newCategory = new Category({
      title: title.trim(),
      imageUrl: imageFile,
      is_featured: is_featured === "1" || is_featured === 1 ? 1 : 0,
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category added successfully",
      category: newCategory,
    });
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update existing category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, is_featured } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (title) category.title = title.trim();

    if (req.file) {
      // ✅ delete old image first
      if (category.imageUrl) {
        const oldPath = path.join(process.cwd(), "uploads/category", category.imageUrl);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      // ✅ save new filename
      category.imageUrl = req.file.filename;
    }

    if (is_featured !== undefined) {
      category.is_featured = is_featured === "1" || is_featured === 1 ? 1 : 0;
    }

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // ✅ Delete image if exists
    if (category.imageUrl) {
      const imagePath = path.join(process.cwd(), "uploads/category", category.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // ✅ Delete category from DB
    await Category.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Category and its image deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};
