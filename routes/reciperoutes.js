const express = require("express");
const Recipe = require("../models/Recipe");
const protect = require("../middleware/auth");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// Create recipe
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      category,
      area,
      ingredients,
      instructions,
      cookingTime,
      servings,
      mealDbId
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Recipe image is required" });
    }

    const recipe = await Recipe.create({
      title,
      category,
      area,
      ingredients: JSON.parse(ingredients || "[]"),
      instructions,
      cookingTime: Number(cookingTime || 0),
      servings: Number(servings || 1),
      image: req.file.path,
      imagePublicId: req.file.filename,
      user: req.user._id,
      mealDbId
    });

    res.status(201).json({ message: "Recipe created", recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one recipe
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("user", "name email");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update recipe
router.put("/:id", protect, upload.single("image"), async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    let updateData = { ...req.body };

    if (req.file) {
      if (recipe.imagePublicId) {
        await cloudinary.uploader.destroy(recipe.imagePublicId);
      }

      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
    }

    if (updateData.ingredients && typeof updateData.ingredients === "string") {
      updateData.ingredients = JSON.parse(updateData.ingredients);
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, updateData, {
      new: true
    });

    res.status(200).json({ message: "Recipe updated", recipe: updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete recipe
router.delete("/:id", protect, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (recipe.imagePublicId) {
      await cloudinary.uploader.destroy(recipe.imagePublicId);
    }

    await Recipe.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;