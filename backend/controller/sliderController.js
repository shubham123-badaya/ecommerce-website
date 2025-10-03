import Slider from "../models/Slider.js";
import fs from "fs";
import path from "path";

// Get all sliders
export const getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find().sort({ createdAt: -1 });
    res.status(200).json(sliders);
  } catch (err) {
    console.error("Error fetching sliders:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Add new slider
export const addSlider = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newSlider = new Slider({
      image: req.file.filename, 
    });

    await newSlider.save();

    res.status(201).json({
      success: true,
      message: "Slider added successfully",
      slider: newSlider,
    });
  } catch (err) {
    console.error("Error adding slider:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update slider (replace image)
export const updateSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const slider = await Slider.findById(id);

    if (!slider) {
      return res.status(404).json({ message: "Slider not found" });
    }

    if (req.file) {
      // Purani image delete karo
      const oldImagePath = path.join(process.cwd(), "uploads/slider", slider.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Error deleting old slider image:", err.message);
      });

      slider.image = req.file.filename;
    }

    await slider.save();

    res.status(200).json({
      success: true,
      message: "Slider updated successfully",
      slider,
    });
  } catch (err) {
    console.error("Error updating slider:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete slider
export const deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const slider = await Slider.findById(id);

    if (!slider) {
      return res.status(404).json({ message: "Slider not found" });
    }

    // Purani image delete
    const imagePath = path.join(process.cwd(), "uploads/slider", slider.image);
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Error deleting slider image:", err.message);
    });

    await Slider.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Slider and its image deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting slider:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
