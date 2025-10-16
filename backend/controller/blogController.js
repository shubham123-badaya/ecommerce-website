import Blog from "../models/Blog.js";
import path from "path";
import fs from "fs";

// Create blog
export const createBlog = async (req, res) => {
  
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newBlog = new Blog({
      title,
      description,
      image: req.file ? req.file.filename : undefined,
    });

    await newBlog.save();
    res
      .status(201)
      .json({ success: true, message: "Blog created", blog: newBlog });
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ count: blogs.length, blogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get single blog by ID
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

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (title) blog.title = title;
    if (description) blog.description = description;

    if (req.file) {
      // Delete old image if exists
      if (blog.image) {
        const oldPath = path.join(process.cwd(), "uploads/blog", blog.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      blog.image = req.file.filename;
    }

    await blog.save();
    res.status(200).json({ success: true, message: "Blog updated", blog });
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.image) {
      const imagePath = path.join(process.cwd(), "uploads/blog", blog.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Blog.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Blog deleted" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
