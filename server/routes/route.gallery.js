import express from "express";
import multer from "multer";
import { uploadPhoto, getGallery, deletePhoto } from "../controllers/controller.gallery.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("photo"), uploadPhoto);
router.get("/", getGallery);
router.delete("/:id", deletePhoto);

export default router;