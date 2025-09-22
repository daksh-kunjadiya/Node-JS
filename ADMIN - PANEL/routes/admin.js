const express = require("express");
const User = require("../models/User");
const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  res.redirect("/auth/login");
};

router.use(isAuthenticated);

router.get("/dashboard", async (req, res) => {
  const totalUsers = await User.countDocuments();
  res.render("dashboard", {
    layout: "layouts/main",
    user: req.session.user,
    stats: { totalUsers },
  });
});

router.get("/users", async (req, res) => {
  const users = await User.find().select("-password");
  res.render("users", {
    layout: "layouts/main",
    user: req.session.user,
    users,
  });
});

router.get("/users/new", (req, res) => {
  res.render("edit-user", {
    layout: "layouts/main",
    user: req.session.user,
    title: "Create User",
    userData: { role: "user" },
  });
});

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect("/admin/users");
  } catch (err) {
    res.render("edit-user", {
      layout: "layouts/main",
      user: req.session.user,
      title: "Create User",
      error: err.message,
      userData: req.body,
    });
  }
});

router.get("/users/:id/edit", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).send("User  not found");
    res.render("edit-user", {
      layout: "layouts/main",
      user: req.session.user,
      title: "Edit User",
      userData: user,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.post("/users/:id", async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await require("bcryptjs").hash(req.body.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).send("User  not found");
    res.redirect("/admin/users");
  } catch (err) {
    res.render("edit-user", {
      layout: "layouts/main",
      user: req.session.user,
      title: "Edit User",
      error: err.message,
      userData: req.body,
    });
  }
});

router.post("/users/:id/delete", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/admin/users");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
