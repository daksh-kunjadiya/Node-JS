const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const { redirectIfAuthenticated } = require('../middleware/auth');

const router = express.Router();

// Registration routes
router.get('/register', redirectIfAuthenticated, (req, res) => {
  res.render('register', { error: null, user: null });
});
router.post('/register', redirectIfAuthenticated, register);

// Login routes
router.get('/login', redirectIfAuthenticated, (req, res) => {
  res.render('login', { error: null, user: null });
});
router.post('/login', redirectIfAuthenticated, login);

// Logout route
router.post('/logout', logout);

module.exports = router;