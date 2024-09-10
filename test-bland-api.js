const axios = require('axios');
require('dotenv').config(); // Make sure you have dotenv installed

const BLAND_API_KEY = process.env.BLAND_API_KEY;

async function testBlandAPI() {
  try {
    const response = await axios.post('https://us.api.bland.ai/v1/calls', {
      phone_number: '+18286061626', // Replace with a valid test phone number
      task: 'Test call',
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
  } catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
  }
}

testBlandAPI();