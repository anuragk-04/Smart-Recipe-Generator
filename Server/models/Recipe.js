import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

const recipeSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    ingredients: [String],
    instructions: String,
    cookingTime: Number,
    dietPreference: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    favoriteCount: { type: Number, default: 0 },
    ratings: [ratingSchema],
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);
