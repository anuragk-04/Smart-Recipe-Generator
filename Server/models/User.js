import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Already have this:
    favorites: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }
    ],

    // NEW: store what user rated
    ratings: [
      {
        recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
