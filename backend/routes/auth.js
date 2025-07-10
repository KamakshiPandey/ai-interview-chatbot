// backend/routes/auth.js
import express from 'express';
import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';

const router = express.Router();

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // or from cert
  });
}

// Route to verify Firebase ID token from frontend
router.post('/verify-token', async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    res.status(200).json({ uid: decodedToken.uid, email: decodedToken.email });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

export default router;
