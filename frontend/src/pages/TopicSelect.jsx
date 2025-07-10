// src/pages/TopicSelect.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopicSelect = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');

  const handleStart = () => {
    if (!topic.trim()) return alert('Please enter a topic');
    localStorage.setItem('selectedTopic', topic.trim());
    navigate('/interview');
  };
  const handleSubmit = () => {
  if (!topicInput.trim()) return;
  localStorage.setItem('selectedTopic', topicInput); // ✅ Save topic
  navigate('/interview');
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-2xl font-bold mb-6">🎯 Select or Enter a Topic</h1>
      <input
        type="text"
        placeholder="e.g. React, OS, or your own topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border p-2 rounded w-64 mb-4"
      />
      <button
        onClick={handleStart}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Start Interview
      </button>
    </div>
  );
};

export default TopicSelect;
