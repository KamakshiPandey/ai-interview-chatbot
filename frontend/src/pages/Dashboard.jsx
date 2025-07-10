import React from 'react';
import Navbar from '../components/Navbar'; // ✅ Import Navbar

const Dashboard = ({ totalQuestions, totalScore, messages }) => {
  const avgScore = totalQuestions > 0 ? (totalScore / totalQuestions).toFixed(2) : 'N/A';

  const recentAnswers = messages
    .filter((msg) => msg.from === 'user')
    .slice(-5)
    .map((msg, idx) => (
      <li key={idx} className="mb-1">🗣️ {msg.text}</li>
    ));

  return (
    <>
      <Navbar /> {/* ✅ Navbar added at top */}
      <div className="p-6 max-w-2xl mx-auto bg-white border rounded-lg shadow mt-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">📈 Stats Dashboard</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-blue-100 rounded shadow text-center">
            <p className="text-sm text-gray-600">Total Questions Answered</p>
            <p className="text-xl font-semibold">{totalQuestions}</p>
          </div>
          <div className="p-4 bg-green-100 rounded shadow text-center">
            <p className="text-sm text-gray-600">Average Score</p>
            <p className="text-xl font-semibold">{avgScore} / 10</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">📝 Recent Answers</h2>
          <ul className="list-disc pl-5 text-sm text-gray-800">
            {recentAnswers.length > 0 ? recentAnswers : <li>No recent answers yet.</li>}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
