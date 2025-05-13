import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'bot'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const chatSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  messages: [messageSchema],
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
