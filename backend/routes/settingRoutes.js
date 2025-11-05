import express from "express";
import { createOrUpdateSetting, getSetting } from "../controller/settingController.js";
import { verifyAdmin } from "../middleware/auth.js";
import { uploadLogo } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Admin create/update
router.post("/create", verifyAdmin, uploadLogo, createOrUpdateSetting);
router.get("/", getSetting);



export default router;  
