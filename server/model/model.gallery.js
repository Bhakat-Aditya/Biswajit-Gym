import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  photoUrl: { type: String, required: true },
  publicId: { type: String, required: true }, // Needed to delete from Cloudinary later
}, { timestamps: true });

export default mongoose.model("Gallery", gallerySchema);