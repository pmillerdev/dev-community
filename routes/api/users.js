const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User modal
const User = require("../../models/User");

// @route  GET api/users/test
// @desc   Tests users route
// @access Public route
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route  POST api/users/register
// @desc   Register user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) return res.status(400).jsonp({ error: err });

    if (foundUser) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
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
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
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
        errors.password = "Password is incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route  GET api/users/current
// @desc   Return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
