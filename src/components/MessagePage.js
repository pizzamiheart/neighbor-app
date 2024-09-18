import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, TextField, Button, AppBar, Toolbar, Grid } from '@mui/material';

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
    <Box sx={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden'
    }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Chat with Neighbor</Typography>
          <Box>
            <Button color="inherit" component={Link} to="/" size="small">Home</Button>
            <Button color="inherit" component={Link} to="/call" size="small">Call</Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ p: 1, bgcolor: 'background.paper' }}>
        <Typography variant="body2" align="center">
          Here, you can message with your neighbor to help with your tech issues/questions. 
          Select from the common issues prompt, or type your own message in the box below to get started!
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', p: 1, flexGrow: 1, overflow: 'hidden' }}>
        <Box sx={{ mb: 1, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
          <Typography variant="subtitle2" sx={{ p: 0.5 }}>Common Issues</Typography>
          <Grid container spacing={1} sx={{ p: 0.5 }}>
            {commonIssues.map((issue, index) => (
              <Grid item xs={6} key={index}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  size="small"
                  onClick={() => handleCommonIssueClick(issue.prompt)}
                  sx={{ textTransform: 'none', fontSize: '0.7rem' }}
                >
                  {issue.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Box 
          sx={{ 
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1,
            overflow: 'hidden',
            maxHeight: 'calc(100vh - 300px)', // Adjust this value as needed
          }}
        >
          <Box 
            ref={chatBoxRef}
            sx={{ 
              flexGrow: 1,
              overflowY: 'auto',
              p: 1,
              display: 'flex',
              flexDirection: 'column-reverse',
            }}
          >
            <Box>
              {messages.map((message, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    mb: 0.5, 
                    textAlign: message.sender.toLowerCase() === 'you' ? 'right' : 'left'
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      display: 'inline-block',
                      bgcolor: message.sender.toLowerCase() === 'you' ? 'primary.light' : 'grey.200',
                      color: message.sender.toLowerCase() === 'you' ? 'white' : 'text.primary',
                      p: 0.5,
                      borderRadius: 1,
                      maxWidth: '80%',
                      fontSize: '0.8rem'
                    }}
                  >
                    <strong>{message.sender}:</strong> {message.text}
                  </Typography>
                </Box>
              ))}
              {isTyping && (
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', fontSize: '0.8rem' }}>
                    Neighbor is typing...
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          
          <Box sx={{ 
            p: 0.5, 
            borderTop: 1, 
            borderColor: 'divider'
          }}>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question here..."
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                size="small"
                sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem', py: 0.5 } }}
              />
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => sendMessage(input)}
                sx={{ minWidth: '60px', fontSize: '0.8rem', py: 0.5 }}
              >
                Send
              </Button>
            </Box>
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
    </Box>
  );
}

export default MessagePage;