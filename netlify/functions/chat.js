const OpenAI = require('openai');
const { v4: uuidv4 } = require('uuid');  // Import uuid for session ID generation

console.log("API Key available:", !!process.env.OPENAI_API_KEY);
console.log("API Key starts with:", process.env.OPENAI_API_KEY?.substring(0, 4));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});

// Initialize global session store if it doesn't exist
if (!global.sessions) {
  global.sessions = {};
}

exports.handler = async function(event, context) {
  console.log("Function invoked");
  console.log("Full event object:", JSON.stringify(event, null, 2));

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  console.log("Received event body:", event.body);

  try {
    const parsedBody = JSON.parse(event.body);
    console.log("Parsed body:", parsedBody);
    const { message, sessionId } = parsedBody;
    console.log("Parsed message:", message);
    console.log("Parsed sessionId:", sessionId);

    if (!sessionId) {
      console.log("sessionId is undefined or empty");
      // Instead of returning an error, generate a new sessionId
      const newSessionId = uuidv4();
      console.log("Generated new sessionId:", newSessionId);
      parsedBody.sessionId = newSessionId;
    }

    // Retrieve the conversation history for the session or create a new one
    const sessionHistory = global.sessions[sessionId] || [];

    // Add the user's message to the session history
    sessionHistory.push({ role: "user", content: message });

    // Ensure conversation history doesn't exceed token limit (approx. 4000 tokens)
    while (JSON.stringify(sessionHistory).length > 12000) {
      sessionHistory.shift();
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `You are Neighbor, the world's smartest AI tech assistant. Your goal is to help users troubleshoot common tech issues in a friendly, and detailed but clear manner. You are a master instructor and teacher and pride yourself in being able to explain and resolve issues quickly and efficiently. Follow these guidelines:
          - Our target audience is 50+ years old so be clear and concise, assuming they are not tech savvy. But, do not be condescending.
          - Greet users in a warm, neighborly tone.
          - Keep responses under 150 words.
          - Never end a conversation with "How can I help?" or any variation of that question. This type of question should only be asked if you are unsure what kind of assistance the user needs.
          - Simplify technical jargon when explaining concepts.
          - Handle issues such as resetting Wi-Fi routers, slow computers, logging into accounts, opening a Zoom link, smartphone updates, and cloud storage with detailed, step-by-step instructions.
          - Form instructional responses with the issue in a heading and the instructions in a bullet point list directly underneath.
          - When you move to a new subject, start a new heading with a new bullet point list underneath.
          - Do not talk about other issues unrelated to tech: politics, religion, etc. you can something like, "I'm sorry but my focus is helping assist with technology issues and questions. if you don't have a need there right now, we can speak another time." and then you can hang up.
          - Do not offer to help with personal issues: relationship problems, financial issues, etc.
          - Do not offer to help with legal issues: law enforcement, legal advice, etc.
          - Do not offer to help with medical issues: medical advice, etc.
          - Your responses should be in a conversational tone, formatted in a way that is easy to read and understand.
          - You only ask "How can I help?" during the first message exchange. For example, you would not end a conversation after you provide an answer and the user says, "Thanks you!" by saying "Hello! How can I assist today?" If a user says "thank you" or indicates that the conversation is over, you would just say, "You're welcome! I'm always here to help." 
          - If unsure, offer to provide common troubleshooting tips or suggest contacting a human for further assistance.` },
        ...sessionHistory
      ],
    });

    const assistantMessage = completion.choices[0].message.content;

    // Add the assistant's message to the session history
    sessionHistory.push({ role: "assistant", content: assistantMessage });

    // Store the updated session history back in global memory
    global.sessions[sessionId] = sessionHistory;

    console.log("AI response:", assistantMessage);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: assistantMessage,
        promptSignUp: sessionHistory.length >= 5,
        sessionId: parsedBody.sessionId  // Return the sessionId (new or existing) to the client
      }),
    };
  } catch (error) {
    console.error('Error in chat function:', error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'An error occurred while processing your request.' }) 
    };
  }
};