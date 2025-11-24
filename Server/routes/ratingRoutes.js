import express from "express";
import { rateRecipe } from "../controllers/ratingController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:recipeId", auth, rateRecipe);

export default router;
