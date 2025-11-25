import User from "../models/User.js";
import Recipe from "../models/Recipe.js";

// ADD OR REMOVE FROM FAVORITES
export const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recipe = await Recipe.findById(req.params.recipeId);
    console.log('user',user);
    console.log('recipe',req.params.id);
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


//  GET USER FAVORITES
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("favorites")
      .select("favorites");

    res.status(200).json({
      success: true,
      recipes: user.favorites || [],
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
