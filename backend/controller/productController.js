import Product from "../models/Product.js";
import fs from "fs";
import path from "path";

// ----------------------
// Get all products
// ----------------------
export const getProducts = async (req, res) => {
  try {
    const { type } = req.query;
    let filter = {};

    // ✅ Filtering by type
    if (type === "best-selling") filter.isBestSelling = 1;
    if (type === "new-arrival") filter.isNewArrival = 1;
    if (type === "top-rated") filter.isTopRated = 1;

    const products = await Product.find(filter)
      .populate("category", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ----------------------
// Create product
// ----------------------
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      stock,
      description,
      variants,
      is_featured,
      isBestSelling,
      isNewArrival,
      isTopRated
    } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ message: "Name, category and price are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageFile = req.file.filename;

    const product = new Product({
      name: name.trim(),
      category,
      price,
      stock: stock || 0,
      description: description || "",
      variants: variants ? JSON.parse(variants) : [],
      images: [imageFile],
      is_featured: is_featured === "1" || is_featured === 1 ? 1 : 0,
      isBestSelling: isBestSelling === "1" || isBestSelling === 1 ? 1 : 0,
      isNewArrival: isNewArrival === "1" || isNewArrival === 1 ? 1 : 0,
      isTopRated: isTopRated === "1" || isTopRated === 1 ? 1 : 0
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });

  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ----------------------
// Update product
// ----------------------
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      category,
      price,
      stock,
      description,
      variants,
      is_featured,
      isBestSelling,
      isNewArrival,
      isTopRated
    } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (name) product.name = name.trim();
    if (category) product.category = category;
    if (price) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (description) product.description = description;
    if (variants) product.variants = JSON.parse(variants);

    if (is_featured !== undefined) {
      product.is_featured = is_featured === "1" || is_featured === 1 ? 1 : 0;
    }
    if (isBestSelling !== undefined) {
      product.isBestSelling = isBestSelling === "1" || isBestSelling === 1 ? 1 : 0;
    }
    if (isNewArrival !== undefined) {
      product.isNewArrival = isNewArrival === "1" || isNewArrival === 1 ? 1 : 0;
    }
    if (isTopRated !== undefined) {
      product.isTopRated = isTopRated === "1" || isTopRated === 1 ? 1 : 0;
    }

    if (req.file) {
      if (product.images.length > 0) {
        const oldImagePath = path.join(process.cwd(), "uploads/product", product.images[0]);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Error deleting old product image:", err.message);
        });
      }
      product.images = [req.file.filename];
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product
    });

  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ----------------------
// Delete product
// ----------------------
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // ✅ Image delete karna (agar hai to)
    if (product.images && product.images.length > 0) {
      product.images.forEach((img) => {
        const imagePath = path.join(process.cwd(), "uploads/product", img);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting product image:", err.message);
          } else {
            console.log("Deleted product image:", img);
          }
        });
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product and its images deleted successfully"
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
