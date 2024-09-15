import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './MessagePage.css';
import Layout from './Layout';
import { Typography, Box, TextField, Button, Paper, AppBar, Toolbar } from '@mui/material';

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
    <Layout title="Chat with Neighbor AI">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Chat with Neighbor
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/call">Call</Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ maxWidth: { xs: '100%', sm: '800px' }, mx: 'auto', p: 2 }}>
          <Paper elevation={3} sx={{ mb: 2, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Common Issues
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {commonIssues.map((issue, index) => (
                <Button 
                  key={index} 
                  variant="outlined" 
                  size="small"
                  onClick={() => handleCommonIssueClick(issue.prompt)}
                >
                  {issue.label}
                </Button>
              ))}
            </Box>
          </Paper>
          <Paper 
            elevation={3} 
            sx={{ 
              height: { xs: '50vh', sm: '60vh' }, 
              overflowY: 'auto',
              p: 2,
              mb: 2
            }}
            ref={chatBoxRef}
          >
            {messages.map((message, index) => (
              <Box 
                key={index} 
                sx={{ 
                  mb: 1, 
                  textAlign: message.sender.toLowerCase() === 'you' ? 'right' : 'left'
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    display: 'inline-block',
                    bgcolor: message.sender.toLowerCase() === 'you' ? 'primary.light' : 'grey.200',
                    color: message.sender.toLowerCase() === 'you' ? 'white' : 'text.primary',
                    p: 1,
                    borderRadius: 1
                  }}
                >
                  <strong>{message.sender}:</strong> {message.text}
                </Typography>
              </Box>
            ))}
            {isTyping && (
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                  Neighbor is typing...
                </Typography>
              </Box>
            )}
          </Paper>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here..."
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => sendMessage(input)}
              sx={{ alignSelf: 'flex-end' }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>
      {showPopup && (
        <Box 
          sx={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            bgcolor: 'rgba(0,0,0,0.5)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Paper sx={{ p: 2, maxWidth: '80%' }}>
            <Typography>Just a moment while your Neighbor finishes this thought!</Typography>
            <Button onClick={() => setShowPopup(false)} sx={{ mt: 1 }}>Close</Button>
          </Paper>
        </Box>
      )}
    </Layout>
  );
}

export default MessagePage;