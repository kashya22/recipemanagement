const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, default: "" },
  area: { type: String, default: "" },
  ingredients: [{ type: String }],
  instructions: { type: String, required: true },
  image: { type: String, required: true },
  imagePublicId: { type: String, default: "" },
  cookingTime: { type: Number, default: 0 },
  servings: { type: Number, default: 1 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mealDbId: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);