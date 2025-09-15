import express from "express";
import { createCoupon, getCoupons, updateCoupon, deleteCoupon } from "../controller/couponController.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// Only admin can create, update, delete coupons
router.post("/add", verifyAdmin, createCoupon);
router.get("/all", verifyAdmin, getCoupons);
router.put("/update/:id", verifyAdmin, updateCoupon);
router.delete("/delete/:id", verifyAdmin, deleteCoupon);

export default router;
