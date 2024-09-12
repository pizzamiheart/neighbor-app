import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CallPage.css';

function CallPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callStatus, setCallStatus] = useState('');

  const handlePhoneChange = (e) => {
    // Remove any non-digit characters from the input
    const cleaned = e.target.value.replace(/\D/g, '');
    // Limit to 10 digits
    const trimmed = cleaned.slice(0, 10);
    // Format the number as (XXX) XXX-XXXX
    const formatted = trimmed.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    setPhoneNumber(formatted);
  };

  const initiateCall = async () => {
    // Remove formatting and add +1 prefix
    const fullNumber = '+1' + phoneNumber.replace(/\D/g, '');

    if (fullNumber.length !== 12) {
      setCallStatus('Please enter a valid 10-digit phone number');
      return;
    }

    setCallStatus('Grab your phone! Neighbor is giving you a call');

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

  return (
    <div className="call-page">
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
        <h1>Ready to Call Your Neighbor?</h1>
        <h3>Whatever your technical issues or questions are, Neighbor can help you troubleshoot!</h3>
        <div className="input-container">
          <div className="phone-input">
            <span className="prefix">+1</span>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="(123) 456-7890"
            />
          </div>
          <button onClick={initiateCall}>Start Call</button>
        </div>
        <p>Neighbor is an artificial intelligence designed to be always available and helpful. It's most helpful when you provide more detail of what you're experiencing.</p>
        <div className="call-status">{callStatus}</div>
      </main>
    </div>
  );
}

export default CallPage;
