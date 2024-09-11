import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './MessagePage.css';

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
      typeMessage(data.message);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      typeMessage("I'm sorry, I'm having trouble responding right now. Please try again later.");
    }
  };

  const typeMessage = (message) => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < message.length) {
        setMessages(prev => {
          const newMessages = [...prev];
          if (newMessages[newMessages.length - 1].sender === 'bot') {
            newMessages[newMessages.length - 1].text += message[i];
          } else {
            newMessages.push({ sender: 'bot', text: message[i] });
          }
          return newMessages;
        });
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Adjust this value to change typing speed
  };

  const clearChat = () => {
    setMessages([]);
    setInput('');
    setIsTyping(false); // Reset typing indicator
    // Force a re-render by updating a state
    setForceUpdate(prev => !prev);
  };

  const [forceUpdate, setForceUpdate] = useState(false);

  return (
    <div className="message-page">
      <nav>
        <Link to="/">Home</Link> | <Link to="/message">Message Neighbor</Link> | <Link to="/call">Call Neighbor</Link>
      </nav>
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
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
          />
          <div className="button-container">
            <button onClick={() => sendMessage(input)}>Send</button>
            <button onClick={clearChat}>Clear Chat</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagePage;
