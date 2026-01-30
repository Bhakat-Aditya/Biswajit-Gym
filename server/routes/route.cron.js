import express from "express";
import { checkRenewalAndNotify } from "../controllers/controller.cron.js";

const router = express.Router();

// This matches the path in your vercel.json
router.get("/check-renewal", checkRenewalAndNotify);

export default router;