// src/components/ChatBox.jsx
import { useEffect, useState, useRef } from "react";
import { socket } from "../socket";
import "./ChatBox.css";

function ChatBox({ userName, role }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const chatLogRef = useRef(null);

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, []);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === "") return;
    const msg = {
      from: userName,
      role,
      text: input.trim(),
    };
    socket.emit("chatMessage", msg);
    setInput("");
  };

  return (
    <div className="chat-container">
      <button onClick={() => setShowChat(!showChat)} className="chat-toggle">
        {showChat ? "Close Chat" : "💬 Chat"}
      </button>

      {showChat && (
        <div className="chat-box">
          <div className="chat-log" ref={chatLogRef}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${msg.role === "teacher" ? "teacher" : "student"}`}
              >
                <strong>{msg.from}</strong>: {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
