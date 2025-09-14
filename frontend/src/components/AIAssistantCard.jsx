import React, { useState } from 'react';

export default function AIAssistantCard() {
  const [message, setMessage] = useState('');
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    console.log("Sending message:", message);
    setMessage('');
  };

  return (
    <div className="card p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold mb-4">My Gym Bro AI</h3>
      <div className="flex-grow space-y-4 overflow-y-auto pr-2 mb-4 h-64">
        {/* Chat messages would be mapped here from state in a real app */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-lg">smart_toy</span>
          </div>
          <div className="bg-blue-900/50 p-3 rounded-lg rounded-tl-none">
            <p className="text-sm">Hey! I'm your AI Gym Bro. Ask me anything about fitness, nutrition, or your workout plan.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 justify-end">
          <div className="bg-gray-700/50 p-3 rounded-lg rounded-br-none">
            <p className="text-sm">What's a good alternative for bench press?</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center border-2 border-[var(--primary-color)] flex-shrink-0">
            <span className="material-symbols-outlined text-lg">person</span>
          </div>
        </div>
      </div>
      <form onSubmit={handleSendMessage} className="relative mt-auto">
        <input 
          className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-all" 
          placeholder="Ask your AI Gym Bro..." 
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[var(--primary-color)] rounded-md hover:bg-blue-500 transition-colors">
          <span className="material-symbols-outlined">send</span>
        </button>
      </form>
    </div>
  );
}