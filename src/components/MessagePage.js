import React, { useState, useEffect, useRef } from 'react';

function MessagePage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef(null);

  const prompts = [
    "How do I turn on my computer?",
    "My internet isn't working",
    "How do I send an email?",
    "My printer isn't printing"
  ];

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (message) => {
    setMessages(prev => [...prev, { sender: 'user', text: message }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message }),
      });
      const data = await response.json();
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: data.message }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: "I'm sorry, I'm having trouble responding right now. Please try again later." }]);
    }
  };

  return (
    <div className="message-page">
      <h2>Chat with Neighbor</h2>
      <div className="chat-container">
        <div className="prompts">
          {prompts.map((prompt, index) => (
            <button key={index} onClick={() => sendMessage(prompt)}>{prompt}</button>
          ))}
        </div>
        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
          {isTyping && <div className="typing-indicator">...</div>}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
          />
          <button onClick={() => sendMessage(input)}>Send</button>
          <button onClick={() => setMessages([])}>Clear Chat</button>
          <input type="file" accept="image/*" />
        </div>
      </div>
    </div>
  );
}

export default MessagePage;
