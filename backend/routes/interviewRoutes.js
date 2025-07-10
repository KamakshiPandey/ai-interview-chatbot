import express from 'express';
import { askQuestion, evaluateAnswer, giveFeedback } from '../controllers/gptController.js';

const router = express.Router();

router.post('/ask', askQuestion);         // ✅ Dynamic topic support inside askQuestion
router.post('/evaluate', evaluateAnswer);
router.post('/feedback', giveFeedback);

export default router;
