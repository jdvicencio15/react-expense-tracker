const User = require("../models/User");
const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");


const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!firstName || !lastName || !email || !password) {
  res.status(400);
  throw new Error("All fields are required");
    }

    if (password.length < 6) {
  res.status(400);
  throw new Error("Password must be at least 6 characters");
    }
    
    if (existingUser) {
      res.status(400);
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

   res.status(201).json({
  success: true,
  message: "User registered successfully",
  token: generateToken(user._id),
  data: {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  },
});
  } catch (error) {
    next(error);
  }
};




const loginUser = async (req, res, next) => {
  try {
    // Get login credentials
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    // Login successful
   res.status(200).json({
  success: true,
  message: "Login successful",
  token: generateToken(user._id),
  data: {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  },
});

  } catch (error) {
    next(error);
  }
};






module.exports = {
  registerUser,
  loginUser,
};