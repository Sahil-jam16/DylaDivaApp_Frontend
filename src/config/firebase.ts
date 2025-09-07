// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDWbcBfxCpkIOpbCx0dNgV2c_UHhPvEvzE",
  authDomain: "dyla-diva-style-quiz-app.firebaseapp.com",
  projectId: "dyla-diva-style-quiz-app",
  storageBucket: "dyla-diva-style-quiz-app.firebasestorage.app",
  messagingSenderId: "1087122157767",
  appId: "1:1087122157767:web:46a21d95fe1504cc48cee2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

