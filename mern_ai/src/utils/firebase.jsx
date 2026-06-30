
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcQTlTn3LPU3MWw6kb0wHyzSpJSrnHfDM",
  authDomain: "ai-resume-sakshi.firebaseapp.com",
  projectId: "ai-resume-sakshi",
  storageBucket: "ai-resume-sakshi.firebasestorage.app",
  messagingSenderId: "377262091145",
  appId: "1:377262091145:web:2104a7313a315f90bdcf58",
  measurementId: "G-WWHVWXWXEE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };