import express from 'express';
import Lead from '../models/lead.model.js'; // Note the .js extension is required in Node imports!
import Member from '../models/member.model.js';

const router = express.Router();

// GET all Leads
router.get('/leads', async (req, res) => {
    try {
        const leads = await Lead.find().sort({ date: -1 });
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET all Members
router.get('/members', async (req, res) => {
    try {
        const members = await Member.find().sort({ joinDate: -1 });
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST (Add) a Member
router.post('/add-member', async (req, res) => {
    try {
        const newMember = new Member(req.body);
        await newMember.save();
        res.status(201).json(newMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;