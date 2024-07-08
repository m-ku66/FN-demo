// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const apiKey = process.env.API_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "fir-todo-abf3c.firebaseapp.com",
  projectId: "fir-todo-abf3c",
  storageBucket: "fir-todo-abf3c.appspot.com",
  messagingSenderId: "549960657432",
  appId: "1:549960657432:web:bda75936a4781dbfe1f16d",
  measurementId: "G-X7FDD8KFK9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics =
  app.name && typeof window !== "undefined" ? getAnalytics(app) : null;
const db = getFirestore(app);

export { app, analytics, auth, db };
