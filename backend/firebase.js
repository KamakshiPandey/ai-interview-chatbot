// backend/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { config } from 'dotenv';
config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
  // (optional): storageBucket, messagingSenderId, etc.
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
