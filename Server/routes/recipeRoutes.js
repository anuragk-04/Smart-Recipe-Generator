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
} from "../controllers/recipeController.js";

import {auth} from "../middleware/authMiddleware.js";

const router = express.Router();

// Create recipe
router.post("/create", auth, createRecipe);

// Fetch all sorted recipes
router.get("/all", auth, getAllRecipes);

// Personalized recommendations
router.get("/recommended", auth, getRecommendedRecipes);

// Find recipe by ingredients & diet
router.post("/find", auth, findRecipes);

// Get single recipe details
router.get("/:id", auth, getSingleRecipe);

// Favorite / Unfavorite recipe
router.post("/favorite/:id", auth, toggleFavorite);

// Rate a recipe
router.post("/rate/:id", auth, rateRecipe);

router.get("/home", auth, getHomeRecipes);

export default router;
