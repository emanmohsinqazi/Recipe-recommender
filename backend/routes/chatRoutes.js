// /routes/chatRoutes.js

import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';  // Import your authentication middleware
import Chat from '../models/chatModel.js';

const router = express.Router();

// Route to fetch chat history
router.route("/chat-history").get(authenticate, async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user's ID is available in req.user after authentication
    const chats = await Chat.find({ userId }).sort({ timestamp: -1 }); // Fetch chat history sorted by timestamp
    
    // Send the chat history back as a response
    res.json({ chatHistory: chats });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chat history", error: error.message });
  }
});

export default router;
