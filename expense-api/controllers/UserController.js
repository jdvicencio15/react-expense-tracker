



const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");


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


const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400);
      throw new Error("Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error("Email not found");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 1000 * 60 * 15; // 15 mins

    await user.save();

    res.status(200).json({
      success: true,
      message: "Reset token generated",
      resetToken,
    });

  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {

    const { token, password } = req.body;

    if (!token || !password) {
      res.status(400);
      throw new Error("Token and password are required");
    }

    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be at least 6 characters");
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400);
      throw new Error("Invalid or expired reset token");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
    registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};