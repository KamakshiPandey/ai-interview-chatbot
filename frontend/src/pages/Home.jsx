import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-10 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">AI Interview Chatbot</h1>
        <p className="mb-6 text-gray-600">Simulate interviews with GPT and receive feedback!</p>
        <button
          onClick={() => navigate('/interview')}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Start Interview
        </button>
      </div>
    </div>
  );
};

export default Home;
