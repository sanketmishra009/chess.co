import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDAQE7Y6Jw4VXrr_tvhPLO6YLPvo84ZRJQ",

  authDomain: "chess-abf0b.firebaseapp.com",

  projectId: "chess-abf0b",

  storageBucket: "chess-abf0b.firebasestorage.app",

  messagingSenderId: "381595807735",

  appId: "1:381595807735:web:7a9a9a145ba7942045c8f2",

  measurementId: "G-0J07FE4RPH",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = firebase.auth();
export const db = firebase.firestore();
