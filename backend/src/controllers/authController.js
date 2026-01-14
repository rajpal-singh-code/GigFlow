const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 2. Hash password
    const hashed = await bcrypt.hash(password, 10);

    // 3. Create new user
    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    // 4. Send response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user._id);

  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    })
    .json({
      success: true,
      data: user,
    });
};

exports.logout = async (req, res) => {
  res.clearCookie("token").json({ 
    success: true ,
    message: "Logged out successfully"
  });
};

exports.me = async (req, res) => {
  res.json(req.user);
};
