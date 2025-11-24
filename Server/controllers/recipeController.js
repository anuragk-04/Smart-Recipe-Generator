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

    const favoriteIds = new Set(user.favorites.map((r) => r._id.toString()));

    //  Collect weighted ingredient preferences based on user ratings
    const ingredientWeight = {};
    const dietWeight = {};      

    //  From favorites → strong preference
    user.favorites.forEach((rec) => {
      (rec.ingredients || []).forEach((ing) => {
        const key = ing.toLowerCase();
        ingredientWeight[key] = (ingredientWeight[key] || 0) + 5;
      });

      if (rec.dietPreference)
        dietWeight[rec.dietPreference] = (dietWeight[rec.dietPreference] || 0) + 5;
    });

    //  From ratings — weighted by rating value
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

    //  Score all recipes
    const scored = allRecipes.map((recipe) => {
      let score = 0;

      // User marked favorite → big boost
      if (favoriteIds.has(recipe._id.toString())) score += 100;

      //  Ingredient similarity score
      (recipe.ingredients || []).forEach((ing) => {
        const key = ing.toLowerCase();
        if (ingredientWeight[key]) score += ingredientWeight[key];
      });

      //  Similar diet preference
      if (recipe.dietPreference && dietWeight[recipe.dietPreference])
        score += dietWeight[recipe.dietPreference] * 2;

      //  Global popularity
      score += (recipe.averageRating || 0) * 4; // rating weight
      score += (recipe.favoriteCount || 0) * 2; // trending weight

      return { ...recipe, score };
    });

    //  Sort highest score first
    scored.sort((a, b) => b.score - a.score);

    res.status(200).json({ success: true, recipes: scored });
  } catch (error) {
    console.error("Recommendation error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const generateSmartRecipes = async (req, res) => {
  try {
    const { ingredients, dietPreference } = req.body;
    const user = await User.findById(req.user.id)
      .populate("favorites")
      .populate("ratings.recipe");

    const allRecipes = await Recipe.find().lean();

    const favoriteIds = new Set(user.favorites.map((r) => r._id.toString()));

    const ingredientWeight = {};
    const dietWeight = {};

    // ✅ Learn from favorite recipes
    user.favorites.forEach((rec) => {
      (rec.ingredients || []).forEach((ing) => {
        const key = ing.toLowerCase();
        ingredientWeight[key] = (ingredientWeight[key] || 0) + 6;
      });
      if (rec.dietPreference)
        dietWeight[rec.dietPreference] = (dietWeight[rec.dietPreference] || 0) + 6;
    });

    // ✅ Learn from ratings — weighted
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

    // ✅ Score only recipes containing requested ingredients
    const scored = allRecipes
      .filter((recipe) =>
        recipe.ingredients.some((ing) =>
          ingredients.includes(ing.toLowerCase())
        )
      )
      .map((recipe) => {
        let score = 0;

        if (favoriteIds.has(recipe._id.toString())) score += 80;

        (recipe.ingredients || []).forEach((ing) => {
          const key = ing.toLowerCase();
          if (ingredientWeight[key]) score += ingredientWeight[key];
        });

        if (dietPreference && recipe.dietPreference === dietPreference) score += 10;

        if (recipe.averageRating) score += recipe.averageRating * 4;
        if (recipe.favoriteCount) score += recipe.favoriteCount * 2;

        return { ...recipe, score };
      });

    scored.sort((a, b) => b.score - a.score);

    res.status(200).json({ success: true, recipes: scored });
  } catch (err) {
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