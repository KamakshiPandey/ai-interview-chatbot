// backend/server.js
import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import interviewRoutes from './routes/interviewRoutes.js';
import authRoutes from './routes/auth.js'; // ✅ Auth using Firebase

// Load environment variables
config();

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use('/api/interview', interviewRoutes);
app.use('/api', authRoutes); // 🔐 Firebase Auth route

// Root route
app.get('/', (req, res) => {
  res.send('🎤 AI Interview Chatbot backend (Firebase auth) is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
