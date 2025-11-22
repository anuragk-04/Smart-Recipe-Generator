import User from "../models/User.js";
import Recipe from "../models/Recipe.js";

// ✅ ADD TO FAVORITES
export const addFavorite = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const user = await User.findById(req.user.id);
    const recipe = await Recipe.findById(recipeId);

    if (!recipe)
      return res.status(404).json({ success: false, message: "Recipe not found" });

    if (!user.favorites.includes(recipeId)) {
      user.favorites.push(recipeId);
      await user.save();

      recipe.favoriteCount = Math.max((recipe.favoriteCount || 0) + 1, 0);
      await recipe.save();
    }

    res.status(200).json({
      success: true,
      message: "Added to favorites",
      favorites: user.favorites,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ REMOVE FROM FAVORITES
export const removeFavorite = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const user = await User.findById(req.user.id);
    const recipe = await Recipe.findById(recipeId);

    if (!recipe)
      return res.status(404).json({ success: false, message: "Recipe not found" });

    if (user.favorites.includes(recipeId)) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== recipeId
      );
      await user.save();

      recipe.favoriteCount = Math.max((recipe.favoriteCount || 0) - 1, 0);
      await recipe.save();
    }

    res.status(200).json({
      success: true,
      message: "Removed from favorites",
      favorites: user.favorites,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET USER FAVORITES (FULL RECIPE DETAILS)
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("favorites") // pulls full recipe data
      .select("favorites");

    res.status(200).json({
      success: true,
      favorites: user.favorites || [],
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
