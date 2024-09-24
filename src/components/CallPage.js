import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CallPage.css';
import { Typography, Box, TextField, Button, Modal, AppBar, Toolbar } from '@mui/material';

function CallPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callStatus, setCallStatus] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handlePhoneChange = (e) => {
    const cleaned = e.target.value.replace(/\D/g, '');
    const trimmed = cleaned.slice(0, 10);
    const formatted = trimmed.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    setPhoneNumber(formatted);
  };

  const initiateCall = async () => {
    const fullNumber = '+1' + phoneNumber.replace(/\D/g, '');

    if (fullNumber.length !== 12) {
      setCallStatus('Please enter a valid 10-digit phone number');
      return;
    }

    setOpenModal(true);
    setCallStatus('Initiating call...');

    try {
      const response = await fetch('/.netlify/functions/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: fullNumber }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        setCallStatus(`Error: ${data.error || 'Failed to initiate call'}`);
      }
    } catch (error) {
      console.error('Error initiating call:', error);
      setCallStatus('Error initiating call. Please try again.');
    }
  };

  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Neighbor</Typography>
          <Button color="inherit" component={Link} to="/" size="small">Home</Button>
          <Button color="inherit" component={Link} to="/message" size="small">Chat</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        px: 2,
        overflowY: 'auto'
      }}>
        <Box sx={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Ready to give your Neighbor a call?
          </Typography>
          <Typography variant="body1" paragraph align="center" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            • You will receive a call in about 10 seconds.<br />
            • The call will come from an unknown number and a random city.<br />
            • Please ensure you allow calls from unknown numbers.<br />
            • If you have Do Not Disturb enabled, please turn it off.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, width: '100%' }}>
            <Typography variant="h6" sx={{ mr: 1 }}>+1</Typography>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="(123) 456-7890"
              size="small"
            />
          </Box>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={initiateCall} 
            sx={{ py: 1, px: 3, width: '100%' }}
          >
            Start Call
          </Button>
          {callStatus && (
            <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: 'center' }}>
              {callStatus}
            </Typography>
          )}
        </Box>
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="call-instructions-modal"
        aria-describedby="call-instructions-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="call-instructions-modal" variant="h6" component="h2">
            Grab your phone! Neighbor is giving you a call!
          </Typography>
          <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default CallPage;