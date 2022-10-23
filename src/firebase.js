import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClA-shT5HvlfVq9u9kHHs9u3mKtPgYqNg",
  authDomain: "auth-development-b130c.firebaseapp.com",
  projectId: "auth-development-b130c",
  storageBucket: "auth-development-b130c.appspot.com",
  messagingSenderId: "532815279704",
  appId: "1:532815279704:web:91ea8bd450d7bf9521bc2d"
};

// Initialize Firebasenpm install firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;