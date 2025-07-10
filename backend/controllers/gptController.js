import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const headers = {
  'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
  'HTTP-Referer': 'http://localhost:3000/',
  'X-Title': 'AI Interview Chatbot'
};

// 1. Ask a question
export const askQuestion = async (req, res) => {
  const { topic } = req.body;

  const prompt = `Generate a challenging interview question for a candidate applying for a ${topic || 'technical'} role.`;

  const body = {
    model: 'mistralai/mistral-7b-instruct',
    messages: [{ role: 'user', content: prompt }]
  };

  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', body, { headers });
    const questionText = response.data.choices[0].message.content.trim();
    console.log("✅ Question from LLM (Topic: " + topic + "):", questionText);
    res.status(200).json({ question: questionText });
  } catch (error) {
    console.error('❌ Error in askQuestion:', error.message);
    res.status(500).json({ error: 'Failed to get question' });
  }
};


// 2. Evaluate answer (Score + Explanation)
export const evaluateAnswer = async (req, res) => {
  try {
    const { answer } = req.body;
    console.log("🧠 Received answer:", answer);

    const body = {
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        { role: 'system', content: 'Evaluate the user\'s answer to an interview question. Give a score out of 10 and an explanation.' },
        { role: 'user', content: answer }
      ]
    };

    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', body, { headers });
    const content = response.data.choices[0].message.content.trim();

    console.log("✅ Score + Explanation:", content);

    // Parse score from response
    const scoreMatch = content.match(/score[^0-9]{0,10}(\d{1,2})/i);
    const parsedScore = scoreMatch ? parseInt(scoreMatch[1]) : 0;

    res.status(200).json({
      score: parsedScore,
      explanation: content
    });

  } catch (error) {
    console.error("❌ Error in evaluateAnswer:", error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to evaluate answer.' });
  }
};

// 3. Give feedback
export const giveFeedback = async (req, res) => {
  const { allAnswers } = req.body;

  const prompt = `Provide detailed feedback and suggestions for improvement for this interview answer:\n\n${allAnswers}`;

  const body = {
    model: 'mistralai/mistral-7b-instruct',
    messages: [{ role: 'user', content: prompt }]
  };

  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', body, { headers });
    const feedbackText = response.data.choices[0].message.content.trim();
    console.log("📝 Feedback:", feedbackText);
    res.status(200).json({ feedback: feedbackText });
  } catch (error) {
    console.error('❌ Error in giveFeedback:', error.message);
    res.status(500).json({ error: 'Failed to provide feedback' });
  }
};
