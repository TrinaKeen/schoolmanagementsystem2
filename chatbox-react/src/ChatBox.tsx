import React, { useState } from "react";
import "./index.css";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, input.trim()]);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chatbox">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg}
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
//Referenced from Open-AI: ChatGPT on April.10,2025. Prompt: "What is a simple way to implement a chatbox feature using typescript?"