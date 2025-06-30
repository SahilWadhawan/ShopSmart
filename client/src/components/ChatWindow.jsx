import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { addToCart } = useCart();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([
      { sender: "bot", text: "Hi! I’m your shopping assistant 🤖" },
      {
        sender: "bot",
        text:
          "You can try:\n" +
          "- Add 2 Redmi Smartphone to cart\n" +
          "- Show me budget laptops\n" +
          "- Add 1 Apple iPad to cart\n" +
          "- Recommend a smartwatch",
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post("https://shopsmart-backend-v25b.onrender.com/api/chat", {
        message: input,
      });

      const botMessage = res.data;

      if (botMessage.action === "add_to_cart" && botMessage.product) {
        addToCart(botMessage.product, botMessage.quantity || 1);
      }

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botMessage.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    }

    setIsTyping(false);
  };

  const renderFormattedText = (text) => {
    const lines = text.split("\n");

    return lines.map((line, idx) => {
      const isBullet = /^(\-|\•)\s/.test(line.trim());
      const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g); 

      return (
        <p
          key={idx}
          className={`mb-2 leading-relaxed ${isBullet ? "pl-4 list-disc" : ""}`}
        >
          {parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={i} className="font-semibold">
                  {part.slice(2, -2)}
                </strong>
              );
            } else if (part.startsWith("*") && part.endsWith("*")) {
              return (
                <em key={i} className="italic">
                  {part.slice(1, -1)}
                </em>
              );
            } else {
              return <span key={i}>{part}</span>;
            }
          })}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 max-h-[80vh] bg-white border rounded-lg shadow-xl flex flex-col z-50">
      <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-lg">
        <span className="font-bold">Shopping Assistant</span>
        <button onClick={onClose} className="text-xl font-bold">
          &times;
        </button>
      </div>

      <div className="flex-1 p-3 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-3 text-sm ${
              msg.sender === "bot" ? "text-left" : "text-right"
            }`}
          >
            <div
              className={`inline-block px-3 py-2 rounded-lg whitespace-pre-wrap ${
                msg.sender === "bot"
                  ? "bg-gray-200 text-black"
                  : "bg-blue-500 text-white"
              }`}
            >
              {renderFormattedText(msg.text)}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="text-sm text-left text-gray-500 my-2">
            <span className="inline-block bg-gray-100 px-3 py-2 rounded-lg">
              Typing...
            </span>
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="p-2 flex border-t">
        <input
          className="flex-1 p-2 border rounded-l focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;