import Recipe from "../models/Recipe.js";

export const rateRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const { rating } = req.body; // value 1–5
  const userId = req.user._id;

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });

  //  Check if user already rated
  const existing = recipe.ratings.find(
    (r) => r.user.toString() === userId.toString()
  );

  if (existing) {
    // update previous rating
    recipe.ratingSum = recipe.ratingSum - existing.value + rating;
    existing.value = rating;
  } else {
    recipe.ratings.push({ user: userId, value: rating });
    recipe.ratingCount += 1;
  }

  //  Recalculate average
  const total = recipe.ratings.reduce((sum, r) => sum + r.value, 0);
  recipe.averageRating = Number((total / recipe.ratingCount).toFixed(2));

  await recipe.save();

  res.json({
    message: "Rating updated",
    averageRating: recipe.averageRating,
    ratingCount: recipe.ratingCount,
  });
};
