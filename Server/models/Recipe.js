import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, min: 1, max: 5 },
});

const nutritionSchema = new mongoose.Schema({
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
});

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: String,

    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },

    cookingTime: Number,

    // ⭐ Difficulty: only 3 allowed values
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    // ⭐ Diet preference: fixed safe options only (NO HALAL)
    dietPreference: {
      type: String,
      default: "None",
    },

    nutrition: nutritionSchema,

    favoriteCount: { type: Number, default: 0 },
    ratings: [ratingSchema],
    averageRating: { type: Number, default: 0 },

    author: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);
