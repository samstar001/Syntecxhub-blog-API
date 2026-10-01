import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Logic for registering a new user
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Generate a 'salt' (random data) for the password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User and save to database
    user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Send a success response back to the client
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ error: err.message });
  }
};

// Logic for authenticating an existing user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Use bcrypt to compare the provided password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate a JWT containing the user's ID, signed with our SECRET
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the token to the user for future authenticated requests
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
