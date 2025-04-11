// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA98O2gefuA_MLHBQctxcutEsqfc2L2jXQ",
    authDomain: "jhanvi-a537d.firebaseapp.com",
    projectId: "jhanvi-a537d",
    storageBucket: "jhanvi-a537d.firebasestorage.app",
    messagingSenderId: "1075209423365",
    appId: "1:1075209423365:web:47e077fc0ad443e510ea6c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
        console.warn("Multiple tabs open, persistence can only be enabled in one tab at a a time.");
    } else if (err.code === 'unimplemented') {
        console.warn("The current browser does not support offline persistence");
    }
});

export { db };
