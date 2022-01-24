// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvKjAL6pzoh9wAJ0Emn353FDso-AlOp7U",
  authDomain: "nutritionalnavigator.firebaseapp.com",
  projectId: "nutritionalnavigator",
  storageBucket: "nutritionalnavigator.appspot.com",
  messagingSenderId: "34724511013",
  appId: "1:34724511013:web:ce6d6bc5aaa78f0a9c2ecc"
};

// Initialize Firebase
const firebaseProject = initializeApp(firebaseConfig);

export default firebaseProject;