const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// Load User modal
const User = require("../../models/User");

// @route  GET api/users/test
// @desc   Tests users route
// @access Public route
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route  GET api/users/register
// @desc   Register user
// @access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) return res.status(400).jsonp({ error: err });

    if (foundUser) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const { name, email, password, avatar } = req.body;

      const avatarURL = gravatar.url(email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default value
      });

      bcrypt.hash(password, 10, (err, hash) => {
        User.create(
          { name, email, password: hash, avatar: avatarURL },
          (err, newUser) => {
            err ? console.log(err) : res.jsonp(newUser);
          }
        );
      });
    }
  });
});

// @route  GET api/users/login
// @desc   Login User / Return JWT
// @access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatched => {
      if (isMatched) {
        res.json({ msg: "Login Successful" });
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});
module.exports = router;
