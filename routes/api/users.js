const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

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
    // Check if user exists
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    // Check if password matches password in database
    bcrypt.compare(password, user.password).then(isMatched => {
      if (isMatched) {
        // User Matched

        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});
module.exports = router;
