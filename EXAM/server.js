const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
const { authenticateToken } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ Connected to MongoDB successfully'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  console.log('💡 Please ensure your MongoDB connection string is correct in the .env file');
  console.log('💡 If using MongoDB Atlas, make sure your IP is whitelisted and credentials are correct');
  // Don't exit the process, let the app run without database for now
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Make user available in all views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/recipes', authenticateToken, recipeRoutes);

// Home route
app.get('/', (req, res) => {
  res.redirect('/recipes');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});