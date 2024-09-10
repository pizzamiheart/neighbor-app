const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const { OPENAI_API_KEY } = require('../config/config');

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });
    res.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error in chat route:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

module.exports = router;
