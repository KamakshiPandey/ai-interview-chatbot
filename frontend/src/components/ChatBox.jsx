import React, { useState, useEffect, useRef } from 'react';
import { ask, evaluate, feedback } from '../api/interviewAPI';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [score, setScore] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [listening, setListening] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const topic = localStorage.getItem('selectedTopic');
    if (topic) {
      setSelectedTopic(topic);
      greetWithAudio(topic);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const greetWithAudio = (topic) => {
    const greeting = `Hi! What would you like to prepare for today in ${topic}?`;
    const utterance = new SpeechSynthesisUtterance(greeting);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);

    setMessages([{ from: 'bot', text: greeting }]);
  };
//const topic = localStorage.getItem('selectedTopic');
  const topic = localStorage.getItem('selectedTopic');

const handleNext = async () => {
  try {
    const res = await axios.post('/api/interview/ask', { topic });
    const question = res.data.question;
    setMessages((prev) => [...prev, { from: 'bot', text: question }]);
    setCurrentQuestion(question);
  } catch (err) {
    console.error('❌ Error fetching question:', err);
  }
};


  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { from: 'user', text: userInput }]);

    try {
      setIsBotTyping(true);
      const evalRes = await evaluate(userInput);
      const userScore = evalRes.data.score;
      const explanation = evalRes.data.explanation;

      setScore(userScore);
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: `✅ Score: ${userScore}/10` },
        { from: 'bot', text: explanation }
      ]);

      setTotalQuestions((prev) => prev + 1);
      setTotalScore((prev) => prev + userScore);

      const fbRes = await feedback(userInput);
      const fb = fbRes.data.feedback;
      setFeedbackText(fb);
      setMessages((prev) => [...prev, { from: 'bot', text: `📝 Feedback: ${fb}` }]);
    } catch (err) {
      console.error('Error evaluating answer:', err);
      setMessages((prev) => [...prev, { from: 'bot', text: '❌ Failed to evaluate answer.' }]);
    } finally {
      setUserInput('');
      setIsBotTyping(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('🎤 Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
    };
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };

    recognition.start();
  };

  const addEmoji = (emoji) => {
    setUserInput((prev) => prev + ' ' + emoji);
  };

  const downloadTranscript = (type) => {
    const filename = `interview_transcript.${type}`;
    let content = '';

    if (type === 'json') {
      content = JSON.stringify(messages, null, 2);
    } else {
      content = messages.map(msg => `${msg.from === 'bot' ? 'Bot' : 'You'}: ${msg.text}`).join('\n');
    }

    const blob = new Blob([content], {
      type: type === 'json' ? 'application/json' : 'text/plain',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 max-w-xl mx-auto border rounded-lg shadow-md bg-white">
      <div className="mb-3 text-sm text-gray-700">
        📈 <strong>Stats:</strong> {totalQuestions} answered | 
        Average Score: {totalQuestions > 0 ? (totalScore / totalQuestions).toFixed(1) : 'N/A'}/10
      </div>

      <div className="h-64 overflow-y-auto mb-4 border p-2 rounded bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-2 rounded-lg max-w-[85%] ${
              msg.from === 'bot' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800 self-end'
            }`}
          >
            <strong>{msg.from === 'bot' ? '🤖 Bot:' : '🧑 You:'}</strong> {msg.text}
          </div>
        ))}
        {isBotTyping && <div className="text-blue-500 italic mb-2">🤖 Bot is typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex flex-wrap gap-1 mb-2">
        {['👍', '😊', '😕', '🔥', '🎯'].map((emoji) => (
          <button
            key={emoji}
            onClick={() => addEmoji(emoji)}
            className="text-xl hover:scale-125 transition-transform"
          >
            {emoji}
          </button>
        ))}
      </div>

      <div className="flex gap-2 items-center mb-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Type or speak your answer..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />

        <button
          onClick={startListening}
          title="Click to speak"
          className={`px-3 py-2 rounded-full text-xl ${
            listening
              ? 'bg-red-600 text-white animate-pulse'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          🎤
        </button>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>

        <button
          onClick={handleNext}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Next
        </button>
      </div>

      <div className="flex gap-2 justify-end mt-2">
        <button
          onClick={() => downloadTranscript('txt')}
          className="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700"
        >
          📝 Download TXT
        </button>
        <button
          onClick={() => downloadTranscript('json')}
          className="bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-700"
        >
          📄 Download JSON
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
