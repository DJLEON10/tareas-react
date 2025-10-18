import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut, GoogleAuthProvider, sendPasswordResetEmail  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA_o19RFUTArdsm0jsY47b_Q9cKVH8LRng",
  authDomain: "primer-proyecto-b9242.firebaseapp.com",
  projectId: "primer-proyecto-b9242",
  storageBucket: "primer-proyecto-b9242.appspot.com", 
  messagingSenderId: "577680407601",
  appId: "1:577680407601:web:b24ae61e1b8cc65a056910",
  measurementId: "G-WCG09YP4T3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Firestore
const db = getFirestore(app);

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: "Se ha enviado un enlace de recuperación a tu correo." };
  } catch (error) {
    let errorMessage = "Ocurrió un error. Inténtalo de nuevo.";

    if (error.code === "auth/invalid-email") {
      errorMessage = "El formato del correo no es válido.";
    }
    return { success: false, message: errorMessage };
  }
};

export { auth, googleProvider, db, signOut };
