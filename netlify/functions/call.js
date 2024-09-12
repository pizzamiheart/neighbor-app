const axios = require("axios");

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { phoneNumber } = JSON.parse(event.body);
    console.log('Initiating call to:', phoneNumber); // Add this line for logging

    const response = await axios.post('https://us.api.bland.ai/v1/calls', {
      phone_number: phoneNumber,
      task: "Assist with tech issues",
      model: "enhanced",
      language: "en",
      voice: "nat",
      pathway_id: process.env.BLAND_PATHWAY_ID,
      max_duration: 12
    }, {
      headers: {
        'Authorization': process.env.BLAND_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log('Call initiated successfully'); // Add this line for logging

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, callId: response.data.call_id }),
    };
  } catch (error) {
    console.error('Error in call function:', error.message); // Add this line for logging
    return { statusCode: 500, body: JSON.stringify({ success: false, error: error.message }) };
  }
};