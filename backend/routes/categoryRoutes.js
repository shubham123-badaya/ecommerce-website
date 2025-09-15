import express from "express";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controller/categoryController.js";

import { uploadCategory  } from "../middleware/uploadMiddleware.js"; 
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// --- Routes ---
router.get("/", getCategories);
router.post("/create", verifyAdmin, uploadCategory , addCategory);
router.put("/update/:id", verifyAdmin, uploadCategory , updateCategory); 
router.delete("/delete/:id", verifyAdmin, deleteCategory); 

export default router;
