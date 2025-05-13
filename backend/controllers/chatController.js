import Chat from "../models/chatModel.js";

export const saveChatMessage = async (req, res) => {
  const { userId, message, role } = req.body;

  if (!userId || !message || !role) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    let chat = await Chat.findOne({ userId });

    if (!chat) {
      chat = new Chat({ userId, messages: [] });
    }

    chat.messages.push({ role, content: message });
    await chat.save();

    res.status(200).json({ success: true, chat });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getChatHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const chat = await Chat.findOne({ userId });

    if (!chat) {
      return res.status(404).json({ message: "No chat history found." });
    }

    res.status(200).json(chat.messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
