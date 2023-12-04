import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA-xJaOkbwVh-nCuyExMrf4Cw8LnoRoSCM",
    authDomain: "todo-app-c3058.firebaseapp.com",
    projectId: "todo-app-c3058",
    storageBucket: "todo-app-c3058.appspot.com",
    messagingSenderId: "182343060406",
    appId: "1:182343060406:web:11e3973ea125e3d6c10f17"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = getAuth();

export { auth, db };