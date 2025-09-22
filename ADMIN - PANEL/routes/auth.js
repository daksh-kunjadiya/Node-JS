const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login", { layout: "layouts/main", error: null });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.render("login", {
        layout: "layouts/main",
        error: "Invalid credentials",
      });
    }
    req.session.user = { id: user._id, email: user.email, role: user.role };
    res.redirect("/admin/dashboard");
  } catch (err) {
    res.render("login", { layout: "layouts/main", error: "Server error" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/auth/login");
});

async function createDefaultAdmin() {
  const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!adminExists) {
    const admin = new User({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
    });
    await admin.save();
    console.log("Default admin created");
  }
}

module.exports = router;
