import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvBoopJzCdywnDdy52Z-iSiCahOShQkAw",
  authDomain: "helpdesk-saas-c3bcf.firebaseapp.com",
  projectId: "helpdesk-saas-c3bcf",
  storageBucket: "helpdesk-saas-c3bcf.firebasestorage.app",
  messagingSenderId: "303000323821",
  appId: "1:303000323821:web:c2aa51c9ba7a0b3372aee4",
  measurementId: "G-6D08YH16EW"
};  

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);