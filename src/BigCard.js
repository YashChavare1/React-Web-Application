import "./BigCardStyle.css";
import { useState, useEffect } from "react"; 
import db from "./Db";
import { initializeApp } from "firebase/app";
import { getStorage, ref as sRef, deleteObject } from "firebase/storage";
import { remove, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD-FDFvVUrhn06FPjDS16ulS9SUTrt0U4I",
  authDomain: "mern-internship-project.firebaseapp.com",
  databaseURL: "https://mern-internship-project-default-rtdb.firebaseio.com",
  projectId: "mern-internship-project",
  storageBucket: "mern-internship-project.appspot.com",
  messagingSenderId: "483089964417",
  appId: "1:483089964417:web:191bcecb849e6ff272dc80"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function BigCard (props) {

	useEffect(() => {
		let u = localStorage.getItem("un");
		if(u != null) 	setUser(true);	
	},[]);
	
	let url = props.imageUrl;
	let id = props.id;
	let dbn = props.dbn;

	const[user, setUser] = useState(false);			

	const deleteImage = (id) => {
		if(user) {
			if(window.confirm("Do You Want to Delete Record?")) {
				{/* Delete Data from Database */}
				remove(ref(db, dbn + id))
				.then(() => {
					window.location.reload();
					alert("Image Deleted Successfully.");
				}) 
				.catch((err) => console.log(err));
			}
		}
	}
{/*
	const deleteFromStorage = (id) => {
		alert("got a call");
		const stRef = ref(storage, 'homeImages/a72f7c4003f');

		deleteObject(stRef).then(() => {
			alert("Success")
		})
		.catch(err => console.log(err));
	}
*/}
	return(
		<>
			<center>
				<img src={ url } id="HomeImg" onClick={() => {deleteImage(id) }} alt="Image Not Available" />
			</center>
		</>
	);
}
export default BigCard;