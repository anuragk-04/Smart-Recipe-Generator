import Recipe from "../models/Recipe.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

// ------------------------------------
// GET SINGLE RECIPE
// ------------------------------------
export const getSingleRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).lean();
    if (!recipe)
      return res.status(404).json({ success: false, message: "Recipe not found" });

    const user = await User.findById(req.user.id);

    const isFavorite = user.favorites
      .map((id) => id.toString())
      .includes(recipe._id.toString());

    res.status(200).json({
      success: true,
      recipe,
      isFavorite,
    });
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
    const user = await User.findById(req.user.id)
      .populate("favorites")
      .populate("ratings.recipe");

    const allRecipes = await Recipe.find().lean();

    // --- Ingredient preference weight map ---
    const ingredientWeight = {};

    // --- 1. Add strong weight for Favorite Recipes ingredients ---
    user.favorites.forEach((rec) => {
      (rec.ingredients || []).forEach((ing) => {
        const key = ing.toLowerCase();
        ingredientWeight[key] = (ingredientWeight[key] || 0) + 5;
      });
    });

    // --- 2. Add weight from recipes user rated >= 4 ---
    user.ratings.forEach(({ recipe, rating }) => {
      if (!recipe) return;

      if (rating >= 4) {
        (recipe.ingredients || []).forEach((ing) => {
          const key = ing.toLowerCase();
          ingredientWeight[key] = (ingredientWeight[key] || 0) + 3;
        });
      }
    });

    // --- 3. Score each recipe globally ---
    const scored = allRecipes.map((rec) => {
      let score = 0;

      // Ingredient match score
      (rec.ingredients || []).forEach((ing) => {
        const key = ing.toLowerCase();
        if (ingredientWeight[key]) score += ingredientWeight[key];
      });

      // Recipe rating weight (makes good recipes appear higher)
      score += (rec.averageRating || 0) * 2;

      return { ...rec, score };
    });

    // --- 4. Sort (highest score first) ---
    scored.sort((a, b) => b.score - a.score);

    return res.status(200).json({ success: true, recipes: scored });
  } catch (error) {
    console.error("Recommendation error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const generateSmartRecipes = async (req, res) => {
  try {
    const {
      ingredients = [],
      dietPreference = null, // string
      difficulty = null,     // string
    } = req.body;

    const user = await User.findById(req.user.id)
      .populate("favorites")
      .populate("ratings.recipe");

    const allRecipes = await Recipe.find().lean();

    const favoriteIds = new Set(user.favorites.map((r) => r._id.toString()));

    // -----------------------------------------------------
    // 1️⃣ Build user preference weights
    // -----------------------------------------------------
    const ingredientWeight = {};
    const dietWeight = {};

    // Favorites → strong preference
    user.favorites.forEach((rec) => {
      (rec.ingredients || []).forEach((ing) => {
        const key = ing.toLowerCase();
        ingredientWeight[key] = (ingredientWeight[key] || 0) + 6;
      });

      if (rec.dietPreference)
        dietWeight[rec.dietPreference] =
          (dietWeight[rec.dietPreference] || 0) + 6;
    });

    // Ratings → rating-based weights
    user.ratings.forEach(({ recipe, rating }) => {
      if (!recipe) return;

      (recipe.ingredients || []).forEach((ing) => {
        const key = ing.toLowerCase();
        ingredientWeight[key] = (ingredientWeight[key] || 0) + rating * 2;
      });

      if (recipe.dietPreference)
        dietWeight[recipe.dietPreference] =
          (dietWeight[recipe.dietPreference] || 0) + rating * 2;
    });

    // -----------------------------------------------------
    // 2️⃣ Apply filters: dietPreference + difficulty
    // -----------------------------------------------------
    const applyFilters = (recipe) => {
      // Diet filter
      if (dietPreference && recipe.dietPreference !== dietPreference)
        return false;

      // Difficulty filter
      if (difficulty && recipe.difficulty !== difficulty)
        return false;

      return true;
    };

    // -----------------------------------------------------
    // 3️⃣ Filter by ingredients + user filters
    // -----------------------------------------------------
    const filteredRecipes = allRecipes.filter((recipe) => {
      const hasIngredientMatch = recipe.ingredients.some((ing) =>
        ingredients.includes(ing.toLowerCase())
      );

      if (!hasIngredientMatch) return false;

      return applyFilters(recipe);
    });

    // -----------------------------------------------------
    // 4️⃣ Score recipes
    // -----------------------------------------------------
    const scored = filteredRecipes.map((recipe) => {
      let score = 0;

      // Favorite recipes are pushed on top
      if (favoriteIds.has(recipe._id.toString())) score += 80;

      // Ingredient similarity boost
      (recipe.ingredients || []).forEach((ing) => {
        const key = ing.toLowerCase();
        if (ingredientWeight[key]) score += ingredientWeight[key];
      });

      // Diet preference match boost
      if (dietPreference && recipe.dietPreference === dietPreference)
        score += 10;

      // Quality signals
      if (recipe.averageRating) score += recipe.averageRating * 4;
      if (recipe.favoriteCount) score += recipe.favoriteCount * 2;

      return { ...recipe, score };
    });

    // -----------------------------------------------------
    // 5️⃣ Sort by score (descending)
    // -----------------------------------------------------
    scored.sort((a, b) => b.score - a.score);

    return res.status(200).json({ success: true, recipes: scored });

  } catch (err) {
    console.error("Smart Recipe Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};



export const publishRecipe = async (req, res) => {
  try {
    const {
      name,
      ingredients,
      instructions,
      cookingTime,
      difficulty,
      dietPreference,
      nutrition,
    } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    // ✅ Upload image buffer to Cloudinary (safe + fast)
    const uploadedImg = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "recipe_images" }
    );

    // ✅ Save recipe to DB
    const newRecipe = await Recipe.create({
      name,
      image: uploadedImg.secure_url,
      ingredients: JSON.parse(ingredients),
      instructions: JSON.parse(instructions),
      cookingTime,
      difficulty,
      dietPreference,
      nutrition: nutrition ? JSON.parse(nutrition) : undefined,
      author: req.user.name,     // ✅ display author
      createdBy: req.user._id,   // ✅ reference user
    });

    return res.status(201).json({
      success: true,
      message: "Recipe published successfully",
      recipe: newRecipe,
    });
  } catch (error) {
    console.error("Publish Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};