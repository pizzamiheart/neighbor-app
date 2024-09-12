import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CallPage.css';

function CallPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callStatus, setCallStatus] = useState('');

  const initiateCall = async () => {
    if (!/^\+1\d{10}$/.test(phoneNumber)) {
      setCallStatus('Please enter a valid phone number in the format +1123456789');
      return;
    }

    setCallStatus('Grab your phone! Neighbor is giving you a call');

    try {
      const response = await fetch('/.netlify/functions/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phoneNumber }),
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

  return (
    <div className="call-page">
      <nav>
        <Link to="/">Home</Link> | <Link to="/message">Message Neighbor</Link> | <Link to="/call">Call Neighbor</Link>
      </nav>
      <div className="call-container">
        <h1>Ready to Call Your Neighbor?</h1>
        <h3>Whatever your technical issues or questions are, Neighbor can help you troubleshoot!</h3>
        <div className="input-container">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1 (123) 456-7890"
          />
          <button onClick={initiateCall}>Start Call</button>
        </div>
        <p>Neighbor is an artificial intelligence designed to be always available and helpful. It's most helpful when you provide more detail of what you're experiencing.</p>
        <div className="call-status">{callStatus}</div>
      </div>
    </div>
  );
}

export default CallPage;
