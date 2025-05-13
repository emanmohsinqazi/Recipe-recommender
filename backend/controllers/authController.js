// /controllers/authController.js

import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import Chat from '../models/chatModel.js';
import generateToken from '../utils/createToken.js';  // Assuming you have a utility to generate tokens

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate user credentials
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = createToken(user);

    // Fetch the chat history for the logged-in user
    const chatHistory = await Chat.find({ userId: user._id }).sort({ timestamp: -1 });

    // Send the token and chat history to the client
    res.json({
      message: "Login successful",
      token,
      chatHistory,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to log in", error: error.message });
  }
};
