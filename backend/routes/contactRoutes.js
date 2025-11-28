import express from "express";
import {
  addContact,
  getContact,
  deleteContact,
} from "../controller/contactController.js";

const router = express.Router();

// Get all contact messages (GET)
router.get("/", getContact);
// Add contact message (POST)
router.post("/create", addContact);

// Delete contact message by ID (DELETE)
router.delete("/delete/:id", deleteContact);

export default router;
