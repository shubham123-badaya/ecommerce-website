import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
  logo: String,
  facebook: String,
  instagram: String,
  contactno: String,
  email: String,
  web: String,
  termsCondition: String,
  privacyPolicy: String,
}, { timestamps: true });

export default mongoose.model("Setting", settingSchema);
