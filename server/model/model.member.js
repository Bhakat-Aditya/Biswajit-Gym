import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    photoUrl: { type: String, required: true }, // Cloudinary URL
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    height: { type: Number }, // in cm
    weight: { type: Number }, // in kg
    membershipType: {
        type: String,
        enum: ["Monthly", "Half-Yearly", "Yearly"],
        required: true
    },
    joiningDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true }, // Calculated automatically
    status: { type: String, enum: ["Active", "Expired"], default: "Active" }
}, { timestamps: true });

export default mongoose.model("Member", memberSchema);