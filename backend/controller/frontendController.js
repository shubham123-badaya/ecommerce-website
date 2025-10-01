import Product from "../models/Product.js";
import Category from "../models/Category.js";

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
