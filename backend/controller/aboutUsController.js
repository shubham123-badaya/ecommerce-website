import AboutUs from "../models/AboutUs.js";
import fs from "fs";
import path from "path";

export const createOrUpdateAboutUs = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    let aboutUs = await AboutUs.findOne(); 

    if (aboutUs) {
      // Update existing document
      aboutUs.title = title;
      aboutUs.description = description;

      // Update image if file provided
      if (req.file) {
        if (aboutUs.image) {
          const oldPath = path.join(process.cwd(), "uploads/about", aboutUs.image);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        aboutUs.image = req.file.filename;
      }

      await aboutUs.save();
      return res.status(200).json({ success: true, message: "About Us updated", aboutUs });
    } else {
      // Create new document
      const newAbout = new AboutUs({
        title,
        description,
        image: req.file ? req.file.filename : undefined,
      });

      await newAbout.save();
      return res.status(201).json({ success: true, message: "About Us created", aboutUs: newAbout });
    }
  } catch (err) {
    console.error("Error in About Us:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get About Us
export const getAboutUs = async (req, res) => {
  try {
    const aboutUs = await AboutUs.findOne();
    if (!aboutUs) {
      return res.status(404).json({ message: "About Us not found" });
    }
    res.status(200).json({ aboutUs });
  } catch (err) {
    console.error("Error fetching About Us:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
