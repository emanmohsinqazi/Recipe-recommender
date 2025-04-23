import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Send, Mic, MicOff, Bot, User, ArrowDown, Info } from 'lucide-react';

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.log("Speech Recognition not supported in this browser");
    }
    
    // Add initial welcome message
    if (messages.length === 0) {
      setMessages([
        { 
          role: "bot", 
          content: "Hello! I'm your Nutrition & Fitness Assistant. You can ask me about calories in food, remaining calories, exercise recommendations, or recipe suggestions." 
        }
      ]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      if (chatWindowRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatWindowRef.current;
        const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
        setShowScrollButton(isScrolledUp);
      }
    };

    const chatWindow = chatWindowRef.current;
    if (chatWindow) {
      chatWindow.addEventListener("scroll", handleScroll);
      return () => chatWindow.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
        response = { data: { error: "Sorry, I don't understand that request. Try asking about calories, exercise, or recipes." } };
      }
  
      const botMessage = response.data.exercise || response.data.recipe || response.data.calories || response.data.error;
      setMessages((prevMessages) => [...prevMessages, { role: "bot", content: botMessage }]);
  
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { role: "bot", content: "Error fetching response. Please check your connection and try again." }]);
    }
  
    setUserInput("");
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
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
    <div 
      className="min-h-screen flex items-center justify-center p-4 md:p-8"
      style={{ background: "linear-gradient(to right, #bfdbfe, #e9d5ff)" }}
    >
      <motion.div 
        className="w-full max-w-3xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ height: "80vh" }}
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white flex items-center">
          <Bot className="h-6 w-6 mr-3" />
          <div>
            <h2 className="font-bold text-lg">Nutrition & Fitness Assistant</h2>
            <p className="text-xs text-white/80">Ask me about calories, exercise, or recipes</p>
          </div>
        </div>
        
        {/* Chat Window */}
        <div 
          ref={chatWindowRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
          style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fillOpacity='0.05' fillRule='evenodd'/%3E%3C/svg%3E')",
            backgroundAttachment: "fixed"
          }}
        >
          {messages.map((msg, index) => (
            <motion.div 
              key={index} 
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 10, x: msg.role === "user" ? 20 : -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === "user" 
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-tr-none" 
                    : "bg-white shadow-md rounded-tl-none"
                }`}
              >
                <div className="flex items-center mb-1">
                  {msg.role === "user" ? (
                    <User className="h-4 w-4 mr-1 text-white/80" />
                  ) : (
                    <Bot className="h-4 w-4 mr-1 text-purple-500" />
                  )}
                  <span className={`text-xs font-medium ${msg.role === "user" ? "text-white/80" : "text-gray-500"}`}>
                    {msg.role === "user" ? "You" : "Assistant"}
                  </span>
                </div>
                <div className={msg.role === "user" ? "text-white" : "text-gray-800"}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Scroll to bottom button */}
        {showScrollButton && (
          <motion.button
            className="absolute bottom-20 right-4 bg-purple-600 text-white p-2 rounded-full shadow-lg"
            onClick={scrollToBottom}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <ArrowDown className="h-5 w-5" />
          </motion.button>
        )}
        
        {/* Chat Input */}
        <div className="p-4 border-t border-gray-200 bg-white/90">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about calories, exercise, or recipes..."
              className="flex-1 px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800"
            />
            <button
              onClick={handleSend}
              disabled={!userInput.trim()}
              className={`p-3 rounded-lg ${
                userInput.trim() 
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-md" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              } transition-all`}
            >
              <Send className="h-5 w-5" />
            </button>
            <button
              onClick={startListening}
              disabled={isListening}
              className={`p-3 rounded-lg ${
                isListening 
                  ? "bg-red-500 text-white animate-pulse" 
                  : "bg-gray-100 text-purple-600 hover:bg-gray-200"
              } transition-all`}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
          </div>
          
          <div className="mt-2 text-xs text-gray-500 flex items-center">
            <Info className="h-3 w-3 mr-1" />
            <span>Try asking: "calories in a banana" or "suggest a healthy recipe"</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Chatbot;