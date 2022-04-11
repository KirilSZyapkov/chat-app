import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyCG7NKFjJo9_N6wfyr33-0Fm7jo86m6RWk",
    authDomain: "chat-app-8652c.firebaseapp.com",
    projectId: "chat-app-8652c",
    storageBucket: "chat-app-8652c.appspot.com",
    messagingSenderId: "133962547618",
    appId: "1:133962547618:web:3b64e3d12c22de3e80f2fb"
}).auth();