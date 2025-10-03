import express from "express";
import { 
  createBlog, 
  getAllBlogs, 
  getBlogById, 
  updateBlog, 
  deleteBlog 
} from "../controller/blogController.js";
import { uploadBlog } from "../middleware/uploadMiddleware.js"; 
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", verifyAdmin, uploadBlog, createBlog);

// Get all blogs
router.get("/all_blogs", getAllBlogs);

// Get single blog by ID
router.get("/blog_detail/:id", verifyAdmin, getBlogById);

// Update blog (Admin)
router.put("/update/:id", verifyAdmin, uploadBlog, updateBlog);

// Delete blog (Admin)
router.delete("/delete/:id", verifyAdmin, deleteBlog);

export default router;
