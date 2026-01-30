import Member from "../model/model.member.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use App Password if 2FA is on
  }
});

export const checkRenewalAndNotify = async (req, res) => {
  try {
    const today = new Date();
    const fiveDaysFromNow = new Date();
    fiveDaysFromNow.setDate(today.getDate() + 5);

    // 1. Find members expiring exactly 5 days from now (ignoring time)
    const startOfDay = new Date(fiveDaysFromNow.setHours(0, 0, 0, 0));
    const endOfDay = new Date(fiveDaysFromNow.setHours(23, 59, 59, 999));

    const expiringMembers = await Member.find({
      expiryDate: { $gte: startOfDay, $lte: endOfDay },
      status: "Active"
    });

    if (expiringMembers.length === 0) {
      return res.status(200).json({ message: "No memberships expiring in 5 days." });
    }

    // 2. Send Emails
    const emailPromises = expiringMembers.map(member => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: member.email,
        subject: "📢 Action Required: Gym Membership Expiring Soon",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
            <h2 style="color: #d32f2f;">Iron Forge Gym</h2>
            <p>Hi <strong>${member.name}</strong>,</p>
            <p>Your <strong>${member.membershipType}</strong> membership is expiring in <strong>5 days</strong> (on ${new Date(member.expiryDate).toDateString()}).</p>
            <p>Please visit the gym desk to renew and keep your streak alive!</p>
            <br/>
            <p><em>Stay Strong,</em><br/>Iron Forge Team</p>
          </div>
        `
      };
      return transporter.sendMail(mailOptions);
    });

    await Promise.all(emailPromises);

    console.log(`✅ Sent reminders to ${expiringMembers.length} members.`);
    res.status(200).json({ success: true, message: `Sent ${expiringMembers.length} emails.` });

  } catch (error) {
    console.error("Cron Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};