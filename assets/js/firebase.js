// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js";   

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmPmLIPiiaUiYbBKnfNjmuK-IPiZTWrTo",
  authDomain: "guber-web-portfolio.firebaseapp.com",
  projectId: "guber-web-portfolio",
  storageBucket: "guber-web-portfolio.firebasestorage.app",
  messagingSenderId: "1079418541933",
  appId: "1:1079418541933:web:bd8a66909c2a2a7a072c64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);