import Recipe from "../models/Recipe.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

// GET SINGLE RECIPE
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

// PERSONALIZED RECOMMENDATIONS
export const getRecommendedRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("favorites")
      .populate("ratings.recipe");

    const allRecipes = await Recipe.find().lean();

    // --- Ingredient preference weight map ---
    const ingredientWeight = {};

    user.favorites.forEach((rec) => {
      (rec.ingredients || []).forEach((ing) => {
        const key = ing.toLowerCase();
        ingredientWeight[key] = (ingredientWeight[key] || 0) + 5;
      });
    });

    // Add weight from recipes user rated >= 4 
    user.ratings.forEach(({ recipe, rating }) => {
      if (!recipe) return;

      if (rating >= 4) {
        (recipe.ingredients || []).forEach((ing) => {
          const key = ing.toLowerCase();
          ingredientWeight[key] = (ingredientWeight[key] || 0) + 3;
        });
      }
    });

    const scored = allRecipes.map((rec) => {
      let score = 0;

      // Ingredient match score
      (rec.ingredients || []).forEach((ing) => {
        const key = ing.toLowerCase();
        if (ingredientWeight[key]) score += ingredientWeight[key];
      });

      score += (rec.averageRating || 0) * 2;

      return { ...rec, score };
    });

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
      dietPreference = null, 
      difficulty = null,   
    } = req.body;

    const user = await User.findById(req.user.id)
      .populate("favorites")
      .populate("ratings.recipe");

    const allRecipes = await Recipe.find().lean();

    const favoriteIds = new Set(user.favorites.map((r) => r._id.toString()));

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

    // Apply filters: dietPreference + difficulty
    const applyFilters = (recipe) => {
      if (dietPreference && recipe.dietPreference !== dietPreference)
        return false;

      if (difficulty && recipe.difficulty !== difficulty)
        return false;

      return true;
    };

    // Filter by ingredients + user filters
    const filteredRecipes = allRecipes.filter((recipe) => {
      const hasIngredientMatch = recipe.ingredients.some((ing) =>
        ingredients.includes(ing.toLowerCase())
      );

      if (!hasIngredientMatch) return false;

      return applyFilters(recipe);
    });

    const scored = filteredRecipes.map((recipe) => {
      let score = 0;

      // Favorite recipes are pushed on top
      if (favoriteIds.has(recipe._id.toString())) score += 80;

      // Ingredient similarity
      (recipe.ingredients || []).forEach((ing) => {
        const key = ing.toLowerCase();
        if (ingredientWeight[key]) score += ingredientWeight[key];
      });

      // Diet preference match 
      if (dietPreference && recipe.dietPreference === dietPreference)
        score += 10;

      if (recipe.averageRating) score += recipe.averageRating * 4;
      if (recipe.favoriteCount) score += recipe.favoriteCount * 2;

      return { ...recipe, score };
    });
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

    const uploadedImg = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "recipe_images" }
    );

    const newRecipe = await Recipe.create({
      name,
      image: uploadedImg.secure_url,
      ingredients: JSON.parse(ingredients),
      instructions: JSON.parse(instructions),
      cookingTime,
      difficulty,
      dietPreference,
      nutrition: nutrition ? JSON.parse(nutrition) : undefined,
      author: req.user.name,     
      createdBy: req.user._id,   
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