import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './MessagePage.css';

function MessagePage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const chatBoxRef = useRef(null);

  const commonIssues = [
    { prompt: "How do I reset my Wi-Fi router?", label: "Reset Wi-Fi Router" },
    { prompt: "My computer is running slow. What can I do?", label: "Slow Computer" },
    { prompt: "How do I update my smartphone's operating system?", label: "Update Smartphone" },
    { prompt: "I'm running out of iCloud storage. What should I do?", label: "iCloud Storage" }
  ];

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);  

  const sendMessage = async (message) => {
    if (isTyping) {
      setShowPopup(true);
      return;
    }
    addMessageToChat('You', message);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message }),
      });
      const data = await response.json();
      await typeMessage(data.message, 'Neighbor');
    } catch (error) {
      console.error('Error sending message:', error);
      addMessageToChat('Neighbor', "Sorry, I encountered an error. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const addMessageToChat = (sender, message) => {
    setMessages(prev => [...prev, { sender, text: message }]);
  };

  const typeMessage = (message, sender) => {
    return new Promise((resolve) => {
      let i = 0;
      const intervalId = setInterval(() => {
        if (i < message.length) {
          setMessages(prev => {
            const newMessages = [...prev];
            if (newMessages[newMessages.length - 1].sender === sender) {
              newMessages[newMessages.length - 1].text += message[i];
            } else {
              newMessages.push({ sender, text: message[i] });
            }
            return newMessages;
          });
          i++;
        } else {
          clearInterval(intervalId);
          resolve();
        }
      }, 30);
    });
  };

  const handleCommonIssueClick = (prompt) => {
    if (isTyping) {
      setShowPopup(true);
    } else {
      sendMessage(prompt);
    }
  };

  return (
    <div className="message-page">
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/message">Chat with AI</Link></li>
            <li><Link to="/call">Speak Live</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>Neighbor</h1>
        <h2>Your Friendly Tech Assistant</h2>
        <div className="chat-container">
          <div className="common-issues">
            <h3>Common Issues</h3>
            {commonIssues.map((issue, index) => (
              <button key={index} onClick={() => handleCommonIssueClick(issue.prompt)}>{issue.label}</button>
            ))}
          </div>
          <div className="chat-box">
            <div id="chat-messages" ref={chatBoxRef}>
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender.toLowerCase()}`}>
                  <strong>{message.sender}:</strong> {message.text}
                </div>
              ))}
              {isTyping && (
                <div id="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              )}
            </div>
            <div className="input-area">
              <textarea
                id="user-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question here..."
                rows="3"
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              />
              <button id="send-button" onClick={() => sendMessage(input)}>Send</button>
            </div>
          </div>
        </div>
      </main>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Just a moment while your Neighbor finishes this thought!</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessagePage;