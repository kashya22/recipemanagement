const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { s } = req.query;
    const response = await axios.get(
      `${process.env.THEMEALDB_BASE_URL}/search.php?s=${s}`
    );
    res.status(200).json(response.data.meals || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/meal/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.THEMEALDB_BASE_URL}/lookup.php?i=${req.params.id}`
    );
    res.status(200).json(response.data.meals || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;