import Gallery from "../model/model.gallery.js";
import { v2 as cloudinary } from "cloudinary";

export const uploadPhoto = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No photo uploaded" });

        // Upload to Cloudinary 'gym_gallery' folder
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "gym_gallery" },
                (error, result) => { if (error) reject(error); else resolve(result); }
            );
            uploadStream.end(req.file.buffer);
        });

        const newPhoto = new Gallery({
            photoUrl: result.secure_url,
            publicId: result.public_id
        });

        await newPhoto.save();
        res.status(201).json({ success: true, data: newPhoto });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getGallery = async (req, res) => {
    try {
        // If 'limit' query is passed, return only that many (for Landing Page)
        const { limit } = req.query;
        let query = Gallery.find().sort({ createdAt: -1 });

        if (limit) {
            query = query.limit(parseInt(limit));
        }

        const photos = await query;
        res.status(200).json({ success: true, data: photos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const deletePhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const photo = await Gallery.findById(id);
        if (!photo) return res.status(404).json({ message: "Photo not found" });

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(photo.publicId);

        // Delete from DB
        await Gallery.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Photo deleted" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};