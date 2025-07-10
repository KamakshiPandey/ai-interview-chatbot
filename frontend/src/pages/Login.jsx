import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { useNavigate } from 'react-router-dom'; // ✅ For redirect

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBTkwcfkXg9FnzaJGKS5iuHiNvkHKLHywA",
  authDomain: "chatbot-authentication-ef411.firebaseapp.com",
  projectId: "chatbot-authentication-ef411",
  storageBucket: "chatbot-authentication-ef411.appspot.com",
  messagingSenderId: "964739824417",
  appId: "1:964739824417:web:45519389e74972b9a1dc60",
  measurementId: "G-VWF0XY3JCR"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const Login = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  const speakWelcomeMessage = () => {
    const msg = new SpeechSynthesisUtterance("Hi, what do you want to prepare for?");
    msg.lang = "en-US";
    window.speechSynthesis.speak(msg);
  };

  const handleGoogleLogin = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);

    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('✅ Logged in as:', user.displayName);
      alert(`Welcome, ${user.displayName}!`);

      speakWelcomeMessage(); // ✅ Speak the welcome message
      setTimeout(() => navigate('/interview'), 1500); // ✅ Redirect after 1.5s
    } catch (error) {
      console.error('❌ Google sign-in failed:', error.message);
      alert('Login failed: ' + error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={handleGoogleLogin}
        disabled={isSigningIn}
        className={`px-6 py-3 rounded text-white ${
          isSigningIn ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isSigningIn ? '🔄 Signing in...' : '🔐 Sign in with Google'}
      </button>
    </div>
  );
};

export default Login;
