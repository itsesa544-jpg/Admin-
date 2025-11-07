// This file is for your Firebase configuration.
// You can get these details from your Firebase project console.
// Go to Project settings > General tab, and scroll down to "Your apps".
// Click on the "</>" icon to find your web app's config.

// It's a good practice to use environment variables to store sensitive keys,
// but for this setup, you can paste your configuration directly here.

const firebaseConfig = {
  apiKey: "AIzaSyBq5fahLFliBzBJERLXVxmStwe1YUmE3d8",
  authDomain: "shohidfozllulbari.firebaseapp.com",
  databaseURL: "https://shohidfozllulbari-default-rtdb.firebaseio.com",
  projectId: "shohidfozllulbari",
  storageBucket: "shohidfozllulbari.firebasestorage.app",
  messagingSenderId: "484574726071",
  appId: "1:484574726071:web:3b2bc160e95527dadb0a32"
};

export default firebaseConfig;

// Example of how to initialize Firebase in your App.tsx or another central file:
/*
import { initializeApp } from "firebase/app";
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// You can then export the app instance or specific services like getAuth, getFirestore, etc.
// export { app };
*/
