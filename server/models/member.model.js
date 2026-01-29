import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  photoUrl: String, 
  height: String,
  weight: String,
  membershipType: { 
    type: String, 
    enum: ['Monthly', 'Half-Yearly', 'Yearly'],
    required: true
  },
  joinDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
  status: { type: String, default: 'Active' } 
});

const Member = mongoose.model('Member', memberSchema);

export default Member;