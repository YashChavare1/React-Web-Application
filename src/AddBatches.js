import { useState, useEffect } from "react";
import "./BigCardStyle.css";
import BigCard from "./BigCard";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import db from "./Db";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { set, ref as dbref, get, child } from "firebase/database";
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

function AddBatches() {

	const nav = useNavigate();
	const[data, setData] = useState([]);
	const[user, setUser] = useState();
	const[file, setFile] = useState("");
	const[percent, setPercent] = useState("");
	const[urls, setUrls] = useState("");

	const hFile = (event) => { setFile(event.target.files[0]); }

	useEffect(() => {
		let u = localStorage.getItem("un");
		if(u == null) nav("/adminlogin");
		else setUser(u);

		const ref = dbref(db);
		get(child(ref, "batches/"))
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
		
		const uploadTask = uploadBytesResumable(ref(storage, "Batches/" + id), file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
				setPercent(percentage);
			},
			(err) => console.log(err),
			() => {
				getDownloadURL(uploadTask.snapshot.ref)
				.then((url) => {
					setUrls("");
					setUrls(url);
					setImage();
				});
			}
		);
	};

	function setImage() {
		let id1 = uid();
		if(urls.length == "") {
			alert("Some Problem Occurs");
			return;
		}
		let data = { id1, urls };
		let r = dbref(db, "batches/" + id1);
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
				<h1>Add Batches</h1><br/><br/>
				<input type="file" accept="image/*" onChange={ hFile } required /><br/><br/>
				<button onClick={ handleUpload } id="btn-add">Upload Image</button><br/><br/>
				<h4>{ percent } % Completed</h4>

				<br/><br/><hr/><br/><br/>
				
				<div className="row">
					{
						data.map((e) => {
							return <BigCard imageUrl={ e.urls } id={ e.id1 } dbn={ "batches/" } />
						})
					}					
				</div>
			</center>
		</>
	);
}
export default AddBatches;