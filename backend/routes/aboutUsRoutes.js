// routes/aboutRoutes.js
import express from "express";
import { getAboutUs, createOrUpdateAboutUs } from "../controller/aboutUsController.js";
import { uploadAboutUs } from "../middleware/uploadMiddleware.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();


// Admin create or update
router.get("/", verifyAdmin, getAboutUs);
router.post("/", verifyAdmin, uploadAboutUs, createOrUpdateAboutUs);

export default router;
