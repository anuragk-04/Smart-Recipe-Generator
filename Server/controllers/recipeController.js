import Recipe from "../models/Recipe.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

// GET SINGLE RECIPE
export const getSingleRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).lean();
    if (!recipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }

    const user = await User.findById(req.user.id);

    const userFavorites = Array.isArray(user?.favorites) ? user.favorites : [];
    const userRatings = Array.isArray(user?.ratings) ? user.ratings : [];

    // Check if favorited
    const isFavorite = userFavorites
      .map((r) => r.toString())
      .includes(recipe._id.toString());

    // Check if user has rated this recipe before
    const ratingObj = userRatings.find(
      (r) => r.recipe.toString() === recipe._id.toString()
    );

    const userRating = ratingObj ? ratingObj.rating : null;
    
    return res.status(200).json({
      success: true,
      recipe,
      isFavorite,
    });
  } catch (error) {
    console.error("getSingleRecipe error:", error);
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

    const ingredientWeight = {};

    user.favorites
      .filter((rec) => rec && rec.ingredients)  
      .forEach((rec) => {
        rec.ingredients.forEach((ing) => {
          const key = ing.name.toLowerCase();
          ingredientWeight[key] = (ingredientWeight[key] || 0) + 5;
        });
      });

    user.ratings
      .filter((r) => r.recipe && r.recipe.ingredients)
      .forEach(({ recipe, rating }) => {
        if (rating >= 4) {
          recipe.ingredients.forEach((ing) => {
            const key = ing.name.toLowerCase();
            ingredientWeight[key] = (ingredientWeight[key] || 0) + 3;
          });
        }
      });

    const scored = allRecipes.map((rec) => {
      let score = 0;

      rec.ingredients.forEach((ing) => {
        const key = ing.name.toLowerCase();
        score += ingredientWeight[key] || 0;
      });

      score += (rec.averageRating || 0) * 2;

      return { ...rec, score };
    });

    scored.sort((a, b) => b.score - a.score);

    return res.status(200).json({ success: true, recipes: scored });
  } catch (error) {
    console.error("Recommendation Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// SMART RECIPE GENERATION
export const generateSmartRecipes = async (req, res) => {
  try {
    const {
      ingredients = [],
      dietPreference = null,
      difficulty = null,
    } = req.body;

    const normalizedInputIngredients = Array.isArray(ingredients)
      ? ingredients
          .map((i) =>
            typeof i === "string"
              ? i.trim().toLowerCase()
              : i?.name?.toLowerCase() || ""
          )
          .filter(Boolean)
      : [];

    const user = await User.findById(req.user.id)
      .populate("favorites")
      .populate("ratings.recipe");

    const allRecipes = await Recipe.find().lean();
    const favoriteIds = new Set(
      (user.favorites || [])
        .filter((r) => r && r._id)
        .map((r) => r._id.toString())
    );

    const ingredientWeight = {};
    const dietWeight = {};

    (user.favorites || [])
      .filter((rec) => rec && rec.ingredients)
      .forEach((rec) => {
        rec.ingredients.forEach((ing) => {
          const key = ing.name.toLowerCase();
          ingredientWeight[key] = (ingredientWeight[key] || 0) + 6;
        });

        if (rec.dietPreference)
          dietWeight[rec.dietPreference] =
            (dietWeight[rec.dietPreference] || 0) + 6;
      });

    ;(user.ratings || [])
      .filter((r) => r.recipe && r.recipe.ingredients)
      .forEach(({ recipe, rating }) => {
        recipe.ingredients.forEach((ing) => {
          const key = ing.name.toLowerCase();
          ingredientWeight[key] =
            (ingredientWeight[key] || 0) + (rating || 0) * 2;
        });

        if (recipe.dietPreference)
          dietWeight[recipe.dietPreference] =
            (dietWeight[recipe.dietPreference] || 0) + (rating || 0) * 2;
      });

    const filteredRecipes = allRecipes.filter((recipe) => {
      if (!recipe || !recipe.ingredients) return false;

      const normalizedRecipeIngredients = recipe.ingredients.map((ing) =>
        ing?.name?.toLowerCase()
      );

      const hasIngredientMatch =
        normalizedInputIngredients.length === 0
          ? true
          : normalizedRecipeIngredients.some((ing) =>
              normalizedInputIngredients.includes(ing)
            );

      if (!hasIngredientMatch) return false;

      if (dietPreference && recipe.dietPreference !== dietPreference)
        return false;
      if (difficulty && recipe.difficulty !== difficulty) return false;

      return true;
    });

    // SCORE RECIPES
    const scored = filteredRecipes.map((recipe) => {
      let score = 0;

      if (favoriteIds.has(recipe._id.toString())) score += 80;

      recipe.ingredients.forEach((ing) => {
        const key = ing.name.toLowerCase();
        if (ingredientWeight[key]) score += ingredientWeight[key];
      });

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


// PUBLISH RECIPE (Final Fixed Version)
export const publishRecipe = async (req, res) => {
  try {
    const {
      name,
      cookingTime,
      difficulty,
      dietPreference,
      servingSize,
      ingredients,
      instructions,
      nutrition,
    } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    const uploadedImg = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "recipe_images" }
    );

    const parsedIngredients = JSON.parse(ingredients);
    const parsedInstructions = JSON.parse(instructions);
    const parsedNutrition = nutrition ? JSON.parse(nutrition) : {};

    const cleanedIngredients = parsedIngredients.map((ing) => ({
      name: ing.name,
      amount: Number(ing.amount),
      unit: ing.unit || "",
    }));

    const newRecipe = await Recipe.create({
      name,
      image: uploadedImg.secure_url,
      ingredients: cleanedIngredients,
      instructions: parsedInstructions,
      cookingTime,
      difficulty,
      dietPreference,
      servingSize,
      nutrition: parsedNutrition,
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
