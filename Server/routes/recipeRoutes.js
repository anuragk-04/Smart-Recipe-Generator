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
} from "../controllers/recipeController.js";

import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create recipe
router.post("/generate-smart", auth, generateSmartRecipes);


// Fetch all sorted recipes
router.get("/all", auth, getAllRecipes);

// Personalized recommendations
router.get("/recommended", auth, getRecommendedRecipes);

// Find recipe by ingredients & diet
router.post("/find", auth, findRecipes);

//  Toggle Favorite — PUT/PATCH recommended
router.patch("/:id/favorite", auth, toggleFavorite);

//  Rate recipe — PUT/PATCH recommended
router.patch("/:id/rate", auth, rateRecipe);

//  Home listing sorted
router.get("/home", auth, getHomeRecipes);

//  MUST COME LAST — otherwise it blocks others
router.get("/:id", auth, getSingleRecipe);

export default router;
