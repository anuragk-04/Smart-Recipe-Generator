import express from "express";
import {
  getFavorites,
  toggleFavorite,
} from "../controllers/favoriteController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:recipeId",auth, toggleFavorite);
router.get("/", auth, getFavorites);

export default router;
