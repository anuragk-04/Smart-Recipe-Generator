import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { rateRecipe } from "../controllers/ratingController.js";

const router = express.Router();

router.post("/:recipeId", protect, rateRecipe);

export default router;
