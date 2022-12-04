import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDkAPxq8_F55Bvm7e7oU-vR5u7rszrWcZg",
  authDomain: "kamalclassesproject.firebaseapp.com",
  databaseURL: "https://kamalclassesproject-default-rtdb.firebaseio.com",
  projectId: "kamalclassesproject",
  storageBucket: "kamalclassesproject.appspot.com",
  messagingSenderId: "686470176994",
  appId: "1:686470176994:web:7e8db53c6ccdcd6834bebb"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;