const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');
const User = require('../models/User');

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate('author', 'username')
      .populate('comments')
      .sort({ createdAt: -1 });
    
    res.render('recipeList', { recipes, user: req.user });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.render('error', { 
      message: 'Error loading recipes',
      user: req.user 
    });
  }
};

// Get user's recipes
const getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.user._id })
      .populate('author', 'username')
      .populate('comments')
      .sort({ createdAt: -1 });
    
    res.render('myRecipes', { recipes, user: req.user });
  } catch (error) {
    console.error('Error fetching user recipes:', error);
    res.render('error', { 
      message: 'Error loading your recipes',
      user: req.user 
    });
  }
};

// Show recipe form
const showRecipeForm = (req, res) => {
  res.render('recipeForm', { recipe: null, user: req.user });
};

// Create recipe
const createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      servings,
      difficulty,
      category
    } = req.body;

    // Parse ingredients and instructions
    const parsedIngredients = ingredients.split('\n').map(line => {
      const [quantity, ...nameParts] = line.trim().split(' ');
      return { quantity, name: nameParts.join(' ') };
    }).filter(ing => ing.name);

    const parsedInstructions = instructions.split('\n').map((instruction, index) => ({
      step: index + 1,
      description: instruction.trim()
    })).filter(inst => inst.description);

    const recipe = new Recipe({
      title,
      description,
      ingredients: parsedIngredients,
      instructions: parsedInstructions,
      cookingTime: parseInt(cookingTime),
      servings: parseInt(servings),
      difficulty,
      category,
      author: req.user._id
    });

    await recipe.save();

    // Add recipe to user's recipes
    await User.findByIdAndUpdate(req.user._id, {
      $push: { recipes: recipe._id }
    });

    res.redirect('/recipes');
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.render('recipeForm', { 
      recipe: null, 
      error: 'Error creating recipe. Please try again.',
      user: req.user 
    });
  }
};

// Get single recipe
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username' }
      });

    if (!recipe) {
      return res.render('error', { 
        message: 'Recipe not found',
        user: req.user 
      });
    }

    res.render('recipeItem', { recipe, user: req.user });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.render('error', { 
      message: 'Error loading recipe',
      user: req.user 
    });
  }
};

// Delete recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if user is author or admin
    if (recipe.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ recipe: req.params.id });
    
    // Remove recipe from user's recipes
    await User.findByIdAndUpdate(recipe.author, {
      $pull: { recipes: req.params.id }
    });

    res.redirect('/recipes/my');
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add comment
const addComment = async (req, res) => {
  try {
    const { content, rating } = req.body;
    
    const comment = new Comment({
      content,
      rating: rating ? parseInt(rating) : undefined,
      author: req.user._id,
      recipe: req.params.id
    });

    await comment.save();

    // Add comment to recipe
    await Recipe.findByIdAndUpdate(req.params.id, {
      $push: { comments: comment._id }
    });

    res.redirect(`/recipes/${req.params.id}`);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.redirect(`/recipes/${req.params.id}`);
  }
};

module.exports = {
  getAllRecipes,
  getUserRecipes,
  showRecipeForm,
  createRecipe,
  getRecipe,
  deleteRecipe,
  addComment
};