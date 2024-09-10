const OpenAI = require('openai');

console.log("API Key available:", !!process.env.OPENAI_API_KEY);
console.log("API Key starts with:", process.env.OPENAI_API_KEY?.substring(0, 4));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message } = JSON.parse(event.body);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: completion.choices[0].message.content }),
    };
  } catch (error) {
    console.error('Error:', error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'An error occurred while processing your request.' }) 
    };
  }
};