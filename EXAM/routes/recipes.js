const express = require("express");
const {
  getAllRecipes,
  getUserRecipes,
  showRecipeForm,
  createRecipe,
  getRecipe,
  deleteRecipe,
  addComment,
} = require("../controllers/recipeController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Recipe routes
router.get("/", getAllRecipes);
router.get("/my", authenticateToken, getUserRecipes);
router.get("/new", authenticateToken, showRecipeForm);
router.post("/new", authenticateToken, createRecipe);
router.get("/:id", getRecipe);
router.delete("/:id", authenticateToken, deleteRecipe);
router.post("/:id/comments", authenticateToken, addComment);

module.exports = router;
