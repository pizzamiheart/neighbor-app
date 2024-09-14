import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA_GeLmMtYjgnr9O4sD0YrRts35jezYDXg",
    authDomain: "neighbor-app-final.firebaseapp.com",
    projectId: "neighbor-app-final",
    storageBucket: "neighbor-app-final.appspot.com",
    messagingSenderId: "69981529478",
    appId: "1:69981529478:web:29ece0a850f454e9137807",
    measurementId: "G-EEV1921WWG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);