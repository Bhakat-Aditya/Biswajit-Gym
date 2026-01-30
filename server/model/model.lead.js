import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["New", "Contacted", "Converted", "Rejected"], 
    default: "New" 
  },
}, { timestamps: true });

export default mongoose.model("Lead", leadSchema);