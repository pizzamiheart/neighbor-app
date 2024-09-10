const express = require('express');
const router = express.Router();
const axios = require('axios');
const { BLAND_API_KEY } = require('../config/config');

router.post('/', async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    const response = await axios.post('https://us.api.bland.ai/v1/calls', {
      phone_number: phoneNumber,
      task: 'Assist with tech issues',
      model: 'enhanced',
      language: 'en',
      voice: 'nat',
      max_duration: 12
    }, {
      headers: {
        'Authorization': BLAND_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log('API Response:', response.data);

    if (response.data && response.data.call_id) {
      res.json({ message: 'Call initiated successfully', callId: response.data.call_id });
    } else {
      console.error('Unexpected response structure:', response.data);
      res.status(500).json({ error: 'Unexpected response from Bland AI' });
    }
  } catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while initiating the call.' });
  }
});

module.exports = router;