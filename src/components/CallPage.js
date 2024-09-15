import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CallPage.css';
import Layout from './Layout';
import { Typography, Box, TextField, Button, Modal } from '@mui/material';

function CallPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callStatus, setCallStatus] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handlePhoneChange = (e) => {
    // Remove any non-digit characters from the input
    const cleaned = e.target.value.replace(/\D/g, '');
    // Limit to 10 digits
    const trimmed = cleaned.slice(0, 10);
    // Format the number as +1 (XXX) XXX-XXXX
    const formatted = '+1 ' + trimmed.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    setPhoneNumber(formatted);
  };

  const initiateCall = async () => {
    // Remove formatting and add +1 prefix
    const fullNumber = '+1' + phoneNumber.replace(/\D/g, '');

    if (fullNumber.length !== 12) {
      setCallStatus('Please enter a valid 10-digit phone number');
      return;
    }

    setOpenModal(true); // Open the modal with instructions
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
    <Layout title="Call Neighbor AI">
      <Box sx={{ 
        maxWidth: 600, 
        mx: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        height: 'calc(100vh - 64px)' // Adjust based on your AppBar height
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ready to give your Neighbor a call?
        </Typography>
        <TextField
          fullWidth
          label="Phone Number"
          variant="outlined"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="+1 (123) 456-7890"
          margin="normal"
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={initiateCall} 
          fullWidth
          sx={{ py: 1.5, px: 3 }} // Adjust padding to reduce side area
        >
          Start Call
        </Button>
        {callStatus && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {callStatus}
          </Typography>
        )}
        {/* Your existing call functionality components */}
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
            Important Call Information
          </Typography>
          <Typography id="call-instructions-description" sx={{ mt: 2 }}>
            • You will receive a call in about 10 seconds.
            <br />
            • The call will come from an unknown number and a random city.
            <br />
            • Please ensure you allow calls from unknown numbers.
            <br />
            • If you have Do Not Disturb enabled, please turn it off.
          </Typography>
          <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
            I understand
          </Button>
        </Box>
      </Modal>
    </Layout>
  );
}

export default CallPage;
