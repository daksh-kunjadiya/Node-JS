const express = require('express');
const {
  getAllRecipes,
  getUserRecipes,
  showRecipeForm,
  createRecipe,
  getRecipe,
  deleteRecipe,
  addComment
} = require('../controllers/recipeController');

const router = express.Router();

// Recipe routes
router.get('/', getAllRecipes);
router.get('/my', getUserRecipes);
router.get('/new', showRecipeForm);
router.post('/new', createRecipe);
router.get('/:id', getRecipe);
router.delete('/:id', deleteRecipe);
router.post('/:id/comments', addComment);

module.exports = router;