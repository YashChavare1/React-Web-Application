import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import BigCard from "./BigCard";
import "./Buttons.css";
import db from "./Db";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { set, ref as dbref, child, get } from "firebase/database";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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
 
function AddHome() {

	const nav = useNavigate();
	const[data, setData] = useState([]);
	const[user, setUser] = useState("");
	const[file,setFile] = useState("");
	const[percent, setPercent] = useState("");
	const[urls, setUrls] = useState("");

	const hFile = (event) => { setFile(event.target.files[0]); }
		
	useEffect(() => {
		let u = localStorage.getItem("un");
		if(u == null) nav("/adminlogin");
		else setUser(u);

		const ref = dbref(db);
		get(child(ref, "homeImages/"))
		.then((snapshot) => {
			if(snapshot.exists) {
				setData([]);
				const data = snapshot.val();
				Object.values(data).map((da) => {
					setData((oldArray) => [...oldArray, da])
				})
			}
			else {
				alert("No Data Found");
			}
		})
		.catch(err => console.log(err));
	},[]);

	function handleUpload() {
		let id = uid();
		const uploadTask = uploadBytesResumable(ref(storage, "homeImages/" + id), file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				let percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
				setPercent(percentage); 
			},
			(err) => console.log(err),
			() => {
				getDownloadURL(uploadTask.snapshot.ref)
				.then((url) => {
					setUrls("");
					setUrls(url);
					setImage(id);
				});
			}
		);
	};

	function setImage(id) {
		let data = { id, urls };
		if(urls.trim().length == "") {
			alert("Some Problem Occurs");
			{/* window.location.reload(); */}
			return;
		}
		let r = dbref(db, "homeImages/" + id);
		set(r, data);
		alert("Record Uploaded Successfully");
		reload();
	}

	function reload() {
		window.location.reload();
	}

	return(
		<>
			<center>
				<h1>Add Images to Home</h1><br/><br/>
				<input type="file" accept="image/*" onChange={ hFile } /><br/><br/>
				<button onClick={ handleUpload } id="btn-add">Upload Image</button>	
				<h4>{ percent } % Completed</h4>
			
				<br/><br/><hr/><br/><br/>
				
				<div className="row">
					{  
						data.map((e) => {
							return <BigCard imageUrl={ e.urls } id={ e.id } dbn={ "homeImages/" } />	
						})
					}
				</div>
			</center>
		</>
	);
}
export default AddHome;