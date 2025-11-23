import express from "express";
import multer from "multer";
import { detectIngredients } from "../controllers/aiController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/detect-ingredients", upload.single("image"), detectIngredients);

export default router;
