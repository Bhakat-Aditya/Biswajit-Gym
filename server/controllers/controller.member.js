import Member from "../model/model.member.js";
import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configure Email Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Ensure you use an App Password if 2FA is on
    }
});

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

        if (!req.file) return res.status(400).json({ message: "Photo is required" });

        // 1. Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "gym_members" },
                (error, result) => { if (error) reject(error); else resolve(result); }
            );
            uploadStream.end(req.file.buffer);
        });

        // 2. Save to DB
        const expiryDate = calculateExpiry(joiningDate, membershipType);
        const newMember = new Member({
            name, email, phone, age, height, weight, membershipType, joiningDate,
            expiryDate,
            photoUrl: result.secure_url
        });

        await newMember.save();

        // 3. SEND WELCOME EMAIL
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "🔥 Welcome to Sports Complex Gym!",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
                    <h2 style="color: #d32f2f;">SPORTS COMPLEX GYM</h2>
                    <p>Hi <strong>${name}</strong>,</p>
                    <p>Welcome to the tribe! Your <strong>${membershipType}</strong> membership has been activated.</p>
                    <p><strong>Joining Date:</strong> ${new Date(joiningDate).toDateString()}</p>
                    <p><strong>Expiry Date:</strong> ${expiryDate.toDateString()}</p>
                    <hr />
                    <p>Get ready to crush your goals. See you on the floor!</p>
                </div>
            `
        };

        // Send email but don't block response if it fails
        transporter.sendMail(mailOptions).catch(err => console.log("Email failed:", err));

        res.status(201).json({ success: true, message: "Member added & Email sent!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// NEW: Manual Reminder for Admin Dashboard
export const sendManualReminder = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await Member.findById(id);

        if (!member) return res.status(404).json({ message: "Member not found" });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: member.email,
            subject: "📢 Reminder: Membership Expiring Soon",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
                    <h2 style="color: #d32f2f;">SPORTS COMPLEX GYM</h2>
                    <p>Hi <strong>${member.name}</strong>,</p>
                    <p>This is a friendly reminder that your gym membership is set to expire on:</p>
                    <h3 style="color: #333;">${new Date(member.expiryDate).toDateString()}</h3>
                    <p>Please renew your plan to continue your access.</p>
                    <br/>
                    <p><em>Train Hard,</em><br/>Admin Team</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Reminder email sent!" });

    } catch (error) {
        console.error("Reminder Error:", error);
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

        // Find members expiring between Now and 5 days
        const members = await Member.find({
            expiryDate: { $gte: today, $lte: fiveDaysFromNow }
        });

        res.status(200).json({ success: true, data: members });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};