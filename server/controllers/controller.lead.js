import Lead from "../model/model.lead.js";

export const createLead = async (req, res) => {
    try {
        const newLead = new Lead(req.body);
        await newLead.save();
        res.status(201).json({ success: true, message: "Request sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find({ status: "New" }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: leads });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const updateLeadStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await Lead.findByIdAndUpdate(id, { status });
        res.status(200).json({ success: true, message: "Lead updated" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};