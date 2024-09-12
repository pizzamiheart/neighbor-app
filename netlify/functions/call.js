const axios = require("axios");

exports.handler = async function(event, context) {
  console.log('Received event:', event);

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { phoneNumber } = JSON.parse(event.body);
    console.log('Parsed phone number:', phoneNumber);

    console.log('Sending request to Bland AI');
    const response = await axios.post('https://us.api.bland.ai/v1/calls', {
      phone_number: phoneNumber,
      task: "Help users with tech questions and issues by conversing with them",
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
    console.log('Received response from Bland AI:', response.status, response.data);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, callId: response.data.call_id }),
    };
  } catch (error) {
    console.error('Error in call function:', error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ 
        success: false, 
        error: error.response ? error.response.data : error.message 
      }) 
    };
  }
};