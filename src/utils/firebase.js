import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDnoh6kzu36mQxN-MX4ogMlLe2ix_rJjvk",
    authDomain: "pisang-development.firebaseapp.com",
    databaseURL: "https://pisang-development-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pisang-development",
    storageBucket: "pisang-development.appspot.com",
    messagingSenderId: "183824471561",
    appId: "1:183824471561:web:ff37e7592a83881d63cad8",
    measurementId: "G-TJ105CBG8V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app