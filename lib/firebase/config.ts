import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { Auth, getAuth, initializeAuth } from 'firebase/auth';

// Your Firebase configuration
// Replace with your actual Firebase config

const firebaseConfig = {
    apiKey: "AIzaSyBzU_tM7PSS6weJftYCylnfGKoNkB4lKFM",
    authDomain: "react-linkedin-96d99.firebaseapp.com",
    projectId: "react-linkedin-96d99",
    storageBucket: "react-linkedin-96d99.firebasestorage.app",
    messagingSenderId: "724341964931",
    appId: "1:724341964931:web:08c26992c42d367bba9bb6",
    measurementId: "G-4HCKR24WG6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence for React Native
let auth: Auth;
try {
  // Try to import React Native persistence
  const { getReactNativePersistence } = require('firebase/auth');
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  // Fallback to default auth if React Native persistence is not available
  console.warn('React Native persistence not available, using default auth');
  auth = getAuth(app);
}

export { auth };
export default app; 