import express from "express";
import multer from "multer";
import { addMember, getActiveMembers, getExpiringMembers } from "../controllers/controller.member.js";

const router = express.Router();
// Use memory storage for direct Cloudinary upload
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("photo"), addMember);
router.get("/", getActiveMembers);
router.get("/expiring", getExpiringMembers);

export default router;