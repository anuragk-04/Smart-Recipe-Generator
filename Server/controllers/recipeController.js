import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

// ------------------------------------
// CREATE NEW RECIPE
// ------------------------------------
export const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create({ ...req.body, createdBy: req.user.id });

    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      recipe,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------
// FETCH ALL RECIPES SORTED BY POPULARITY
// ------------------------------------
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .sort({ favoriteCount: -1, averageRating: -1 })
      .lean();

    res.status(200).json({ success: true, recipes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------
// FIND RECIPES BASED ON INGREDIENTS + DIET
// ------------------------------------
export const findRecipes = async (req, res) => {
  try {
    const { ingredients, dietPreference } = req.body;

    const filter = {
      ingredients: { $in: ingredients },
    };

    if (dietPreference) filter.dietPreference = dietPreference;

    const recipes = await Recipe.find(filter)
      .sort({ favoriteCount: -1, averageRating: -1 });

    res.status(200).json({ success: true, recipes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------
// GET SINGLE RECIPE
// ------------------------------------
export const getSingleRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------
// ADD OR REMOVE FROM FAVORITES
// ------------------------------------
export const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe)
      return res.status(404).json({ success: false, message: "Recipe not found" });

    const alreadyFav = user.favorites.includes(recipe._id);

    if (alreadyFav) {
      user.favorites.pull(recipe._id);
      recipe.favoriteCount -= 1;
    } else {
      user.favorites.push(recipe._id);
      recipe.favoriteCount += 1;
    }

    await user.save();
    await recipe.save();

    res.status(200).json({
      success: true,
      message: alreadyFav
        ? "Removed from favorites"
        : "Added to favorites",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------
// RATE A RECIPE
// ------------------------------------
export const rateRecipe = async (req, res) => {
  try {
    const { rating } = req.body;
    const userId = req.user.id;

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ success: false, message: "Recipe not found" });

    // remove old rating if exists
    recipe.ratings = recipe.ratings.filter((r) => r.user.toString() !== userId);

    // add new rating
    recipe.ratings.push({ user: userId, rating });

    // recompute average rating
    recipe.averageRating =
      recipe.ratings.reduce((sum, r) => sum + r.rating, 0) /
      recipe.ratings.length;

    await recipe.save();

    res.status(200).json({ success: true, message: "Rating updated", recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------
// PERSONALIZED RECOMMENDATIONS
// FAVORITES → HIGH RATING → RANDOM REST
// ------------------------------------
export const getRecommendedRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const recipes = await Recipe.find()
      .lean()
      .sort({ favoriteCount: -1, averageRating: -1 });

    const favSet = new Set(user.favorites.map((id) => id.toString()));

    const sorted = [
      ...recipes.filter((r) => favSet.has(r._id.toString())),
      ...recipes.filter((r) => !favSet.has(r._id.toString())),
    ];

    res.status(200).json({ success: true, recipes: sorted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------
// HOME FEED — FAVORITES → HIGH RATING → NEWEST
// ------------------------------------
export const getHomeRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("favorites");

    const favSet = new Set(user.favorites.map((id) => id.toString()));

    // Fetch all recipes sorted by rating then createdAt
    const allRecipes = await Recipe.find()
      .sort({ averageRating: -1, createdAt: -1 })
      .lean();

    // Reorder: favorites first
    const sorted = [
      ...allRecipes.filter((r) => favSet.has(r._id.toString())),
      ...allRecipes.filter((r) => !favSet.has(r._id.toString())),
    ];

    res.status(200).json({
      success: true,
      recipes: sorted,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
