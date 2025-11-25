import Recipe from "../models/Recipe.js";

export const rateRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const { rating } = req.body;
  const userId = req.user._id;

  if (rating === undefined || rating < 0.5 || rating > 5)
    return res.status(400).json({ message: "Invalid rating value" });

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });

  const existing = recipe.ratings.find(
    (r) => r.user.toString() === userId.toString()
  );

  if (existing) {
    existing.rating = rating;
  } else {
    recipe.ratings.push({ user: userId, rating }); 
  }

  const total = recipe.ratings.reduce((sum, r) => sum + r.rating, 0);
  const count = recipe.ratings.length;

  recipe.averageRating = count > 0 ? Number((total / count).toFixed(2)) : 0;

  await recipe.save();

  res.json({
    message: "Rating updated",
    averageRating: recipe.averageRating,
    ratingCount: count,
    userRating: rating,
  });
};
