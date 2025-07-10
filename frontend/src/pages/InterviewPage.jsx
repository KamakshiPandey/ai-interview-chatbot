import React, { useState } from 'react';
import ChatBox from '../components/ChatBox';
import ScoreBoard from '../components/ScoreBoard';
import Feedback from '../components/Feedback';
import ExportPanel from '../components/ExportPanel';
import Navbar from '../components/Navbar'; // ✅ Navbar imported

const InterviewPage = () => {
  const [sessionData, setSessionData] = useState([]);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState('');

  return (
    <>
      <Navbar /> {/* ✅ Navbar added at the top */}
      <div className="min-h-screen p-4 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4 text-center">Interview in Progress</h2>
        <ChatBox setSessionData={setSessionData} setScore={setScore} setFeedback={setFeedback} />
        {score && <ScoreBoard score={score} />}
        {feedback && <Feedback feedback={feedback} />}
        <ExportPanel data={{ sessionData, score, feedback }} />
      </div>
    </>
  );
};

export default InterviewPage;
