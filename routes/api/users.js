const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();

const User = require("../../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
})

// @Route                   POST /api/users
// @Description             Register a user
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const saltPassword = await bcrypt.hash(password, 10);
    let user = await User.findOne({ email }).select("-password");
    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: "User already exists",
          },
        ],
      });
    }

    user = new User({
      username: username,
      email: email,
      password: saltPassword,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        username: user.username,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          throw err;
        } else {
          return res.json({ token });
        }
      }
    );
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
