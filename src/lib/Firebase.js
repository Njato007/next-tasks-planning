// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlez4olLZNoifMYl6ErODGilS0qG7451Y",
  authDomain: "tasks-planning.firebaseapp.com",
  projectId: "tasks-planning",
  storageBucket: "tasks-planning.appspot.com",
  messagingSenderId: "85017832600",
  appId: "1:85017832600:web:84a5751f45132292b634ed",
  measurementId: "G-2670T6ZVQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);