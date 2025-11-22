import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "./models/Recipe.js";
import { recipesData } from "./data/recipesData.js";

dotenv.config();

const seedRecipes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB connected");

    await Recipe.deleteMany({});
    console.log(" Old recipes removed");

    await Recipe.insertMany(recipesData);
    console.log(" New recipes added!");

    process.exit();
  } catch (error) {
    console.error(" Seed failed:", error);
    process.exit(1);
  }
};

seedRecipes();
