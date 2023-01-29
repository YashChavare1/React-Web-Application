import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyD-FDFvVUrhn06FPjDS16ulS9SUTrt0U4I",
  authDomain: "mern-internship-project.firebaseapp.com",
  databaseURL: "https://mern-internship-project-default-rtdb.firebaseio.com",
  projectId: "mern-internship-project",
  storageBucket: "mern-internship-project.appspot.com",
  messagingSenderId: "483089964417",
  appId: "1:483089964417:web:191bcecb849e6ff272dc80"
};

const app = firebase.initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;