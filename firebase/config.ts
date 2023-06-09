import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbVZUiidYrUX9AMWmRJGF-k9jDQj_iMOw",
  authDomain: "project-engage-a8cfb.firebaseapp.com",
  projectId: "project-engage-a8cfb",
  storageBucket: "project-engage-a8cfb.appspot.com",
  messagingSenderId: "370818168202",
  appId: "1:370818168202:web:5b73115fda9d3f73420473"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);