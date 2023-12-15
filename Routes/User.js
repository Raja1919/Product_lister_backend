const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User.js"); // Import the User model

const router = express.Router(); // Create an instance of Express

// Register a user
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    return res.status(201).json({ message: "user Created" });
  }
  res.status(404).json({ message: "user Already exist" });
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists and the password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create and sign a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token expiration time
      });

      // Send the token to the client
      res.json({
        token,
        user: { _id: user._id, name: user.name, email: user.email },
      });
    } else {
      res.status(401).json({ result: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Get User details
router.get("/user-details/:id", async (req, res) => {
  try {
    const results = await User.findById(req.params.id);
    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Update the user profile after gathering details
router.put("/user-details/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
