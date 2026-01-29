import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Import Routes
import adminRoutes from './routes/admin.routes.js';
import Member from './models/member.model.js';
import Lead from './models/lead.model.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "*" // Allow all origins for now (update for production later)
}));

// DB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ DB Error:", err));

// Routes
app.use('/api/admin', adminRoutes);

// Public Lead Generation Route (For the Landing Page)
app.post('/api/register-lead', async (req, res) => {
    try {
        const newLead = new Lead(req.body);
        await newLead.save();
        res.status(201).json({ message: "Details submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to submit details" });
    }
});

// Vercel Cron Job Route (Daily Check)
app.get('/api/cron/check-renewal', async (req, res) => {
    try {
        const fiveDaysFromNow = new Date();
        fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);

        // Logic to find members expiring in ~5 days
        // (We look for expiry dates between Now and Now+5 days)
        const expiringMembers = await Member.find({
            expiryDate: {
                $gte: new Date(),
                $lte: fiveDaysFromNow
            }
        });

        if (expiringMembers.length > 0) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
            });

            for (const member of expiringMembers) {
                await transporter.sendMail({
                    from: process.env.EMAIL,
                    to: member.email,
                    subject: 'Gym Membership Renewal Reminder',
                    text: `Hi ${member.name}, your gym membership is expiring soon. Please renew!`
                });
            }
        }

        res.json({ success: true, emailed: ({ RP: expiringMembers.length }) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Cron job failed" });
    }
});

// Base Route
app.get('/', (req, res) => {
    res.send('Gym Server is Running (ESM Mode)');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
