require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(ejsLayouts);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/auth", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));

app.get("/", (req, res) => {
  if (req.session.user) {
    return res.redirect("/admin/dashboard");
  }
  res.redirect("/auth/login");
});

const isAuthenticated = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  res.redirect("/auth/login");
};

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
