import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXDzjRfzgs5wHL2X854vJD7BCPeCo5BqE",
  authDomain: "pet-companion-9335f.firebaseapp.com",
  projectId: "pet-companion-9335f",
  storageBucket: "pet-companion-9335f.firebasestorage.app",
  messagingSenderId: "71690345105",
  appId: "1:71690345105:web:5ef3b5207886b7296bfd30",
  measurementId: "G-9PPC1762LE",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
