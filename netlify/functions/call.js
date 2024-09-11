const axios = require("axios");

exports.handler = async function(event, context) {
  console.log('Received event:', event);

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { phoneNumber } = JSON.parse(event.body);
    console.log('Parsed phone number:', phoneNumber);

    if (!process.env.BLAND_API_KEY || !process.env.BLAND_PATHWAY_ID) {
      throw new Error('Missing required environment variables');
    }

    console.log('Initiating call to Bland AI API');
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

    console.log('Bland AI API response:', response.data);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, callId: response.data.call_id }),
    };
  } catch (error) {
    console.error('Error in call function:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Bland AI API error response:', error.response.data);
      console.error('Bland AI API error status:', error.response.status);
      console.error('Bland AI API error headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from Bland AI API');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    return { 
      statusCode: 500, 
      body: JSON.stringify({ 
        success: false, 
        error: error.response ? error.response.data : error.message 
      }) 
    };
  }
};