import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./Chatbot.css";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.log("Speech Recognition not supported in this browser");
    }
  }, []);
  const handleSend = async () => {
    if (!userInput.trim()) return;
  
    const newMessages = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);
  
    try {
      let response;
  
      if (userInput.toLowerCase().includes("calories in")) {
        response = await axios.post("http://127.0.0.1:5000/get_calories", { meal: userInput.replace("calories in", "").trim() });
      } else if (userInput.toLowerCase().includes("remaining calories")) {
        response = await axios.post("http://127.0.0.1:5000/remaining_calories", { daily_limit: 2000, consumed: 1400 });
      } else if (userInput.toLowerCase().includes("exercise")) {
        const excessCalories = parseInt(userInput.match(/\d+/)) || 300;
        response = await axios.post("http://127.0.0.1:5000/recommend_exercise", { excess_calories: excessCalories });
      } else if (userInput.toLowerCase().includes("recipe")) {
        const preference = userInput.replace("recipe", "").trim() || "healthy";
        response = await axios.post("http://127.0.0.1:5000/suggest_recipe", { preference });
      } else {
        response = { data: { error: "Sorry, I don't understand that request." } };
      }
  
      // ✅ Fix: Ensure the bot message is not appended twice
      const botMessage = response.data.exercise || response.data.recipe || response.data.calories || response.data.error;
      setMessages((prevMessages) => [...prevMessages, { role: "bot", content: botMessage }]);
  
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { role: "bot", content: "Error fetching response. Try again." }]);
    }
  
    setUserInput("");
  };
  

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setUserInput(speechResult);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <motion.div className="chat-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="chat-header">Nutrition & Fitness Chatbot</div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <motion.div key={index} className={msg.role === "user" ? "user-msg" : "bot-msg"} initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
            <strong>{msg.role === "user" ? "You: " : "AI: "}</strong> {msg.content}
          </motion.div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Ask about calories, exercise, or recipes..." />
        <button onClick={handleSend}>Send</button>
        <button onClick={startListening} disabled={isListening}>{isListening ? "Listening..." : "🎤 Voice"}</button>
      </div>
    </motion.div>
  );
};

export default Chatbot;  
