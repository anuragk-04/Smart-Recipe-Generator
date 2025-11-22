require("dotenv").config();
const connectDB = require("../config/db");
const Recipe = require("../models/Recipe");

const seedData = [
  {
    name: "Tomato Pasta",
    image: "",
    ingredients: ["Tomato", "Pasta", "Garlic", "Olive Oil", "Basil"],
    dietTags: ["Vegetarian"],
    cookingTime: 25,
    difficulty: "Easy",
    steps: ["Boil pasta","Make sauce","Mix and serve"],
    nutrition: { calories: 450, protein: 12 }
  },
  {
    name: "Tomato Pasta",
    image: "",
    ingredients: ["Tomato", "Pasta", "Garlic", "Olive Oil", "Basil"],
    dietTags: ["Vegetarian"],
    cookingTime: 25,
    difficulty: "Easy",
    steps: ["Boil pasta","Make sauce","Mix and serve"],
    nutrition: { calories: 450, protein: 12 }
  },
  {
    name: "Tomato Pasta",
    image: "",
    ingredients: ["Tomato", "Pasta", "Garlic", "Olive Oil", "Basil"],
    dietTags: ["Vegetarian"],
    cookingTime: 25,
    difficulty: "Easy",
    steps: ["Boil pasta","Make sauce","Mix and serve"],
    nutrition: { calories: 450, protein: 12 }
  },
  // ... add 20+ items in similar format
];

const seed = async () => {
  try {
    await connectDB();
    await Recipe.deleteMany({});
    await Recipe.insertMany(seedData);
    console.log("Seeded recipes");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
