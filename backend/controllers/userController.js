import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import createToken from "../utils/createToken.js";
import validator from "validator";

// Validation helper functions
const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!validator.isEmail(email)) return "Please enter a valid email address";
  return null;
};

const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
    return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
  }
  return null;
};

const validateUsername = (username) => {
  if (!username) return "Username is required";
  if (username.length < 3) return "Username must be at least 3 characters";
  if (username.length > 30) return "Username cannot exceed 30 characters";
  return null;
};

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validate inputs
  const usernameError = validateUsername(username);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (usernameError || emailError || passwordError) {
    return res.status(400).json({
      error: usernameError || emailError || passwordError,
    });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .json({ error: "User with this email already exists" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      preferences: newUser.preferences,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message || "Invalid user data",
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate inputs
  const emailError = validateEmail(email);
  if (emailError) {
    return res.status(400).json({ error: emailError });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      createToken(res, existingUser._id);
      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        preferences: existingUser.preferences,
      });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error during login" });
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching user profile" });
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate inputs if provided
    if (req.body.username) {
      const usernameError = validateUsername(req.body.username);
      if (usernameError) {
        return res.status(400).json({ error: usernameError });
      }
      user.username = req.body.username;
    }

    if (req.body.email) {
      const emailError = validateEmail(req.body.email);
      if (emailError) {
        return res.status(400).json({ error: emailError });
      }

      // Check if email already exists (but not by the current user)
      const emailExists = await User.findOne({
        email: req.body.email,
        _id: { $ne: req.user._id },
      });

      if (emailExists) {
        return res.status(400).json({ error: "Email already in use" });
      }

      user.email = req.body.email;
    }

    if (req.body.password) {
      const passwordError = validatePassword(req.body.password);
      if (passwordError) {
        return res.status(400).json({ error: passwordError });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    // Update preferences if provided
    if (req.body.preferences) {
      if (req.body.preferences.theme) {
        if (["light", "dark"].includes(req.body.preferences.theme)) {
          user.preferences.theme = req.body.preferences.theme;
        } else {
          return res.status(400).json({ error: "Invalid theme preference" });
        }
      }

      if (req.body.preferences.notifications !== undefined) {
        user.preferences.notifications = !!req.body.preferences.notifications;
      }
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      preferences: updatedUser.preferences,
    });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error updating profile" });
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isAdmin) {
      return res.status(403).json({ error: "Cannot delete admin user" });
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate inputs if provided
    if (req.body.username) {
      const usernameError = validateUsername(req.body.username);
      if (usernameError) {
        return res.status(400).json({ error: usernameError });
      }
      user.username = req.body.username;
    }

    if (req.body.email) {
      const emailError = validateEmail(req.body.email);
      if (emailError) {
        return res.status(400).json({ error: emailError });
      }

      // Check if email already exists (but not by this user)
      const emailExists = await User.findOne({
        email: req.body.email,
        _id: { $ne: req.params.id },
      });

      if (emailExists) {
        return res.status(400).json({ error: "Email already in use" });
      }

      user.email = req.body.email;
    }

    // Handle admin status update
    if (req.body.isAdmin !== undefined) {
      user.isAdmin = Boolean(req.body.isAdmin);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      preferences: updatedUser.preferences,
    });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error updating user" });
  }
    // Generate a token
      const token = createToken(user);
  
      // Fetch the chat history for the logged-in user
      const chatHistory = await Chat.find({ userId: user._id }).sort({ timestamp: -1 });
  
      // Send the token and chat history to the client
      res.json({
        // **message: "Login successful",**
        token,
        chatHistory,
      });
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};
