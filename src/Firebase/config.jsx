import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBf0Z_4rCN15Q3yi75-N7G6hqbNqE8Stdg",
    authDomain: "gerenciador-financas-3e4a8.firebaseapp.com",
    projectId: "gerenciador-financas-3e4a8",
    storageBucket: "gerenciador-financas-3e4a8.firebasestorage.app",
    messagingSenderId: "294482753657",
    appId: "1:294482753657:web:91103363a63ae12e0a3ca8",
    measurementId: "G-TDT747E3V4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };