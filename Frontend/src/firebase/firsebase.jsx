// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZvCwq-TxVtOPpJ2vC_7yD06EpZ1-2b9g",
    authDomain: "login-signup-2ea6f.firebaseapp.com",
    projectId: "login-signup-2ea6f",
    storageBucket: "login-signup-2ea6f.firebasestorage.app",
    messagingSenderId: "273997884856",
    appId: "1:273997884856:web:405e0f838f6f341418734d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;