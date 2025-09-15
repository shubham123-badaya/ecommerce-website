import express from "express";
import { getSliders, addSlider, updateSlider, deleteSlider } from "../controller/sliderController.js";
import { uploadSlider } from "../middleware/uploadMiddleware.js";
import { verifyAdmin } from "../middleware/auth.js";


const router = express.Router();

// Public GET
router.get("/", getSliders);

// Admin CRUD
router.post("/create", verifyAdmin, uploadSlider, addSlider);
router.put("/update/:id", verifyAdmin, uploadSlider, updateSlider);
router.delete("/delete/:id", verifyAdmin, deleteSlider);

export default router;
