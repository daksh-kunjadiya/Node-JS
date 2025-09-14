const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");
// const { authenticateToken } = require('./middleware/auth'); // disable auth until DB works

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ MongoDB Connection (no deprecated options)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    console.log("💡 Check your .env MONGODB_URI value and MongoDB service");
  });

// ✅ Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ✅ View Engine + Layouts
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout"); // views/layout.ejs

// Make user available in all views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// ✅ Routes
app.use("/auth", authRoutes);
// app.use('/recipes', authenticateToken, recipeRoutes); // enable later
app.use("/recipes", recipeRoutes);

// Home route
app.get("/", (req, res) => {
  res.redirect("/recipes");
});

// Test route
app.get("/test", (req, res) => {
  res.render("recipesList", { recipes: [], user: null });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
