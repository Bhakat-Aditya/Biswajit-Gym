import Member from "../model/model.member.js";
import { v2 as cloudinary } from "cloudinary";

// Helper to calculate expiry
const calculateExpiry = (joiningDate, type) => {
    const date = new Date(joiningDate);
    if (type === "Monthly") date.setMonth(date.getMonth() + 1);
    else if (type === "Half-Yearly") date.setMonth(date.getMonth() + 6);
    else if (type === "Yearly") date.setFullYear(date.getFullYear() + 1);
    return date;
};

export const addMember = async (req, res) => {
    try {
        const { name, email, phone, age, height, weight, membershipType, joiningDate } = req.body;

        // 1. Handle Image Upload
        if (!req.file) return res.status(400).json({ message: "Photo is required" });

        // Upload to Cloudinary stream
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "gym_members" },
                (error, result) => { if (error) reject(error); else resolve(result); }
            );
            uploadStream.end(req.file.buffer);
        });

        // 2. Calculate Expiry
        const expiryDate = calculateExpiry(joiningDate, membershipType);

        // 3. Save to DB
        const newMember = new Member({
            name, email, phone, age, height, weight, membershipType, joiningDate,
            expiryDate,
            photoUrl: result.secure_url
        });

        await newMember.save();
        res.status(201).json({ success: true, message: "Member added successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getActiveMembers = async (req, res) => {
    try {
        const members = await Member.find({ expiryDate: { $gt: new Date() } }).sort({ name: 1 });
        res.status(200).json({ success: true, data: members });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getExpiringMembers = async (req, res) => {
    try {
        const today = new Date();
        const fiveDaysFromNow = new Date();
        fiveDaysFromNow.setDate(today.getDate() + 5);

        // Find members expiring between Now and 5 days from now
        const members = await Member.find({
            expiryDate: { $gte: today, $lte: fiveDaysFromNow }
        });

        res.status(200).json({ success: true, data: members });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};