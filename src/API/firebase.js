import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2pXTf6Eh7IWf0GXaQdEcS4K1bsafgm8I",
  authDomain: "bebliotheque-a53cb.firebaseapp.com",
  projectId: "bebliotheque-a53cb",
  storageBucket: "bebliotheque-a53cb.appspot.com",
  messagingSenderId: "501137858211",
  appId: "1:501137858211:web:d3fefe26b27b9336572916",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
export const database = {
  users: firestore.collection("users"),
  docs: firestore.collection("docs"),
  files: firestore.collection("files"),
  date: firebase.firestore.FieldValue.serverTimestamp(),
};

export const storage = firebase.storage();

export const auth = firebase.auth();
