import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, min: 1, max: 5 },
});

const nutritionSchema = new mongoose.Schema({
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 }, // grams
  carbs: { type: Number, default: 0 },   // grams
  fat: { type: Number, default: 0 },     // grams
});

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: String,
    ingredients: { type: [String], required: true },

    // Updated to accept multiple step-by-step instructions
    instructions: { type: [String], required: true },

    cookingTime: Number,
    difficulty: String,
    dietPreference: String,

    nutrition: nutritionSchema,

    favoriteCount: { type: Number, default: 0 },
    ratings: [ratingSchema],
    averageRating: { type: Number, default: 0 },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);
