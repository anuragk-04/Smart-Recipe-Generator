import express from "express";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../controllers/favoriteController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:recipeId", auth, addFavorite);
router.delete("/:recipeId", auth, removeFavorite);
router.get("/", auth, getFavorites);

export default router;
