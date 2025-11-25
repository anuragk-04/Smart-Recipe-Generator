import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, min: 1, max: 5 },
});

const ingredientItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true }, 
  unit: { type: String, default: "" },
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

    ingredients: {
      type: [ingredientItemSchema],
      required: true,
    },

    instructions: { type: [String], required: true },

    cookingTime: Number,

    servingSize: {
      type: Number,
      required: true,
      default: 1, 
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

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
