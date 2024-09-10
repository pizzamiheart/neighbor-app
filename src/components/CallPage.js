import React, { useState } from 'react';

function CallPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callStatus, setCallStatus] = useState('');

  const initiateCall = async () => {
    if (!/^\+1\d{10}$/.test(phoneNumber)) {
      setCallStatus('Please enter a valid phone number in the format +1123456789');
      return;
    }

    setCallStatus('Initiating call...');

    try {
      const response = await fetch('/.netlify/functions/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phoneNumber }),
      });
      const data = await response.json();
      
      if (response.ok && data.callId) {
        setCallStatus(`Call initiated successfully. Call ID: ${data.callId}`);
      } else {
        setCallStatus(`Error: ${data.error || 'Failed to initiate call'}`);
      }
    } catch (error) {
      console.error('Error initiating call:', error);
      setCallStatus('Error initiating call. Please try again.');
    }
  };

  return (
    <div className="call-page">
      <h3>If you'd like to speak to Neighbor, enter your phone number to receive a call and talk through your tech issues.</h3>
      <p>Neighbor is an artificial intelligence designed to be always available and helpful. It's most helpful when you provide more detail of what you're experiencing.</p>
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="+1 (123) 456-7890"
      />
      <button onClick={initiateCall}>Start Call</button>
      <div className="call-status">{callStatus}</div>
    </div>
  );
}

export default CallPage;
