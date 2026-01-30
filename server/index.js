import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

// Routes
import leadRoutes from './routes/route.lead.js';
import memberRoutes from './routes/route.member.js';

dotenv.config();

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));

// --- DB Connection ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🔥 MongoDB Connected");
    } catch (err) {
        console.error("DB Connection Error:", err);
    }
};

// --- Routes ---
app.use('/api/leads', leadRoutes);
app.use('/api/members', memberRoutes);

// --- Cron Job for Email (Simplified integration here) ---
// Note: You can keep the Cron logic in a separate controller or utils file to keep index clean, 
// but for Vercel Cron function, the existing logic in your original file is fine.

app.get('/', (req, res) => res.send('Gym Server Running...'));

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

export default app;