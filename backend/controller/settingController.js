import Setting from "../models/Setting.js";
import fs from "fs";
import path from "path";

export const createOrUpdateSetting = async (req, res) => {
  try {
    const {
      instagram,
      facebook,
      contactno,
      email,
      web,
      termsCondition,
      privacyPolicy,
    } = req.body;

    let setting = await Setting.findOne();

    if (setting) {
      // Update existing document
      setting.facebook = facebook || setting.facebook;
      setting.instagram = instagram || setting.instagram;
      setting.contactno = contactno || setting.contactno;
      setting.email = email || setting.email;
      setting.web = web || setting.web;
      setting.termsCondition = termsCondition || setting.termsCondition;
      setting.privacyPolicy = privacyPolicy || setting.privacyPolicy;

      if (req.file) {
        if (setting.logo) {
          const oldPath = path.join(process.cwd(), "uploads/logo", setting.logo);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        setting.logo = req.file.filename;
      }

      await setting.save();
      return res.status(200).json({ success: true, message: "Setting updated", setting });
    } else {
      // Create new document
      const newSetting = new Setting({
        facebook,
        instagram,
        contactno,
        email,
        web,
        termsCondition,
        privacyPolicy,
        logo: req.file ? req.file.filename : undefined,
      });

      await newSetting.save();
      return res.status(201).json({ success: true, message: "Setting created", setting: newSetting });
    }
  } catch (err) {
    console.error("Error in Setting:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getSetting = async (req, res) => {
  try {
    const setting = await Setting.findOne();
    if (!setting) return res.status(404).json({ message: "Setting not found" });

    res.status(200).json({ success: true, setting });
  } catch (err) {
    console.error("Error fetching setting:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
