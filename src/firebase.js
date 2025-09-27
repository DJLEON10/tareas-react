import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_o19RFUTArdsm0jsY47b_Q9cKVH8LRng",
  authDomain: "primer-proyecto-b9242.firebaseapp.com",
  projectId: "primer-proyecto-b9242",
  storageBucket: "primer-proyecto-b9242.appspot.com", // corregí el dominio
  messagingSenderId: "577680407601",
  appId: "1:577680407601:web:b24ae61e1b8cc65a056910",
  measurementId: "G-WCG09YP4T3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Firestore
const db = getFirestore(app);

export { auth, googleProvider, db, signOut };
