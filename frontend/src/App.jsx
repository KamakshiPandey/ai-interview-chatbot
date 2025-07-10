// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import InterviewPage from './pages/InterviewPage';
import Dashboard from './pages/Dashboard';
import TopicSelect from './pages/TopicSelect';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [messages, setMessages] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* ✅ Topic Selection Page */}
          <Route
            path="/topics"
            element={
              <ProtectedRoute>
                <TopicSelect />
              </ProtectedRoute>
            }
          />

          <Route
            path="/interview"
            element={
              <ProtectedRoute>
                <InterviewPage
                  messages={messages}
                  setMessages={setMessages}
                  totalScore={totalScore}
                  setTotalScore={setTotalScore}
                  totalQuestions={totalQuestions}
                  setTotalQuestions={setTotalQuestions}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard
                  messages={messages}
                  totalScore={totalScore}
                  totalQuestions={totalQuestions}
                />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
