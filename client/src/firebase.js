// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "varletint.firebaseapp.com",
  projectId: "varletint",
  storageBucket: "varletint.appspot.com",
  messagingSenderId: "205316607104",
  appId: "1:205316607104:web:870be6b17e26a4fdc66a65",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
