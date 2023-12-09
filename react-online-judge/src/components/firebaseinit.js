import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics"; 
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyCjNSrJ3ZzSUb8PRhNxrxZz2vOTLjJHMZ0",
  authDomain: "react-online-judge.firebaseapp.com",
  projectId: "react-online-judge",
  storageBucket: "react-online-judge.appspot.com",
  messagingSenderId: "1081300710178",
  appId: "1:1081300710178:web:07470f21fd50bc782bab7b",
  measurementId: "G-D9T7941K5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {db}
