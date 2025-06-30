import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";
import ChatWindow from "./ChatWindow";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-1">
      {!open && (
        <div className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow animate-bounce">
          Use AI to place orders
        </div>
      )}

      {open ? (
        <ChatWindow onClose={() => setOpen(false)} />
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition"
        >
          <FaRobot size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;