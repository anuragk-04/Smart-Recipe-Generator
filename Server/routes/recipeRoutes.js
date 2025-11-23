import express from "express";
import {
  createRecipe,
  getAllRecipes,
  getRecommendedRecipes,
  findRecipes,
  toggleFavorite,
  rateRecipe,
  getSingleRecipe,
  getHomeRecipes,
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

// Fetch all recipes
router.get("/all", auth, getAllRecipes);

// Personalized recommendations
router.get("/recommended", auth, getRecommendedRecipes);

// Find recipe by ingredients + diet
router.post("/find", auth, findRecipes);

// Toggle favorite
router.patch("/:id/favorite", auth, toggleFavorite);

// Rate recipe
router.patch("/:id/rate", auth, rateRecipe);

// Home feed
router.get("/home", auth, getHomeRecipes);

// Get single recipe ✅ must remain last
router.get("/:id", auth, getSingleRecipe);

export default router;
