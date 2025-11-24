import express from "express";
import {
  getRecommendedRecipes,
  getSingleRecipe,
  generateSmartRecipes,
  publishRecipe,
} from "../controllers/recipeController.js";

import { auth } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Generate Smart AI Recipes
router.post("/generate-smart", auth, generateSmartRecipes);

// Publish Own Recipe 
router.post("/publish", auth, upload.single("image"), publishRecipe);

// Personalized recommendations
router.get("/recommended", auth, getRecommendedRecipes);

// Get single recipe must remain last
router.get("/:id", auth, getSingleRecipe);

export default router;
