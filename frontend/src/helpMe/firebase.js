import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getEvn } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEvn("VITE_FIREBASE_API"),
  authDomain: "blog-ba-af722.firebaseapp.com",
  projectId: "blog-ba-af722",
  storageBucket: "blog-ba-af722.firebasestorage.app",
  messagingSenderId: "854038874520",
  appId: "1:854038874520:web:bc3e0739ce240b057b83ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
