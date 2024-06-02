import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './style.css';
import App from './components/App';

// FIREBASE CONFIG
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJiSGOdlsuN3OrBk4YtVH8clo3Vf64d_k",
  authDomain: "uw-marketplace-a10ad.firebaseapp.com",
  projectId: "uw-marketplace-a10ad",
  storageBucket: "uw-marketplace-a10ad.appspot.com",
  messagingSenderId: "635439511539",
  appId: "1:635439511539:web:4bd9fe180f2a8cd82a8486",
  databaseURL: "https://uw-marketplace-a10ad-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database
const db = getDatabase(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

