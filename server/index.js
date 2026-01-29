import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// FIXED: Changed filename from 'admin.routes.js' to 'admin.route.js'
import adminRoutes from './routes/admin.route.js';
import Member from './models/member.model.js';
import Lead from './models/lead.model.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "*" // Replace with your frontend URL in production
}));

// --- OPTIMIZED DB CONNECTION FOR VERCEL ---
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Disable mongoose buffering to fail fast if no connection
        };

        cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}
// -------------------------------------------

// Routes (Wrap in async to ensure DB connects first)
app.use('/api/admin', async (req, res, next) => {
    await connectToDatabase();
    next();
}, adminRoutes);

// Public Lead Generation
app.post('/api/register-lead', async (req, res) => {
    try {
        await connectToDatabase();
        const newLead = new Lead(req.body);
        await newLead.save();
        res.status(201).json({ message: "Details submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to submit details" });
    }
});

// CRON JOB: Renewals (FIXED LOGIC)
app.get('/api/cron/check-renewal', async (req, res) => {
    try {
        await connectToDatabase();

        // 1. Calculate the start and end of the "5th day from now"
        const today = new Date();
        const targetStart = new Date(today);
        targetStart.setDate(today.getDate() + 5);
        targetStart.setHours(0, 0, 0, 0); // 00:00:00 on that day

        const targetEnd = new Date(targetStart);
        targetEnd.setHours(23, 59, 59, 999); // 23:59:59 on that day

        // 2. Find members expiring EXACTLY within that 24-hour window
        const expiringMembers = await Member.find({
            expiryDate: {
                $gte: targetStart,
                $lte: targetEnd
            }
        });

        if (expiringMembers.length > 0) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
            });

            for (const member of expiringMembers) {
                // Wrap in try/catch so one bad email doesn't stop the whole loop
                try {
                    await transporter.sendMail({
                        from: process.env.EMAIL,
                        to: member.email,
                        subject: 'Gym Membership Renewal Reminder',
                        text: `Hi ${member.name}, just a friendly reminder that your gym membership expires in exactly 5 days. Please renew to keep your streak going!`
                    });
                } catch (mailError) {
                    console.error(`Failed to email ${member.email}:`, mailError);
                }
            }
        }

        res.json({ success: true, emailedCount: expiringMembers.length });
    } catch (error) {
        console.error("Cron Job Error:", error);
        res.status(500).json({ error: "Cron job failed" });
    }
});

app.get('/', (req, res) => {
    res.send('Gym Server is Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;