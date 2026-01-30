import express from "express";
import multer from "multer";
import {
    addMember,
    getActiveMembers,
    getExpiringMembers,
    sendManualReminder // Import this
} from "../controllers/controller.member.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("photo"), addMember);
router.get("/", getActiveMembers);
router.get("/expiring", getExpiringMembers);
router.post("/:id/remind", sendManualReminder); // New Route

export default router;