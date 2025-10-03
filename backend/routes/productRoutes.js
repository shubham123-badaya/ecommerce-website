import express from "express";
import { getProducts, addProduct, updateProduct, deleteProduct, getProductById } from "../controller/productController.js";
import { uploadProduct } from "../middleware/uploadMiddleware.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProducts);

// Admin CRUD
router.get("/:id", getProductById); 
router.post("/create", verifyAdmin, uploadProduct, addProduct);
router.put("/update/:id", verifyAdmin, uploadProduct, updateProduct);
router.delete("/delete/:id", verifyAdmin, deleteProduct);

export default router;
