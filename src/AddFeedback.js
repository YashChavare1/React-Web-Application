import { useState, useEffect } from "react";
import FeedbackCard from "./FeedbackCard";
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

function AddFeedback() {

	const nav = useNavigate();
	const[urls, setUrls] = useState("");
	const[data, setData] = useState([]);
	const[user, setUser] = useState("");
	const[file, setFile] = useState("");
	const[percent, setPercent] = useState("");

	const hFile = (event) => { setFile(event.target.files[0]); }
	
	useEffect(()=>{
		let u = localStorage.getItem("un");
		if(u == null) nav("/adminlogin");
		else setUser(u);

		const dref = dbref(db);
		get(child(dref, "feedbacks/"))
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
		
		const uploadTask = uploadBytesResumable(ref(storage, "AddFeedbacks/" + id), file);

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
					{/* console.log("url: " + url); */}
					setUrls("");
					setUrls(url);
					console.log(urls);
					setImage();
				});
			}
		);
	};

	function setImage() {
		let id1 = uid();
		let data = { id1 ,urls };
		if(urls.length == "") {
			alert("Some Problem Occurs");
			return;
		}
		let r = dbref(db, "feedbacks/" + id1);
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
				<h1>Add Feedback</h1><br/><br/>
				<input type="file" accept="image/*" onChange={ hFile } required /><br/><br/>
				<button onClick={ handleUpload } id="btn-add">upload Image</button>
				<h4>{ percent } % Completed</h4>

				<br/><br/><hr/><br/><br/>

				<div className="container">
					<div className="row">
						{
							data.map((e) => {
								return <div className="col-md-4">
									<FeedbackCard imageUrl={e.urls} id={ e.id1 } dbn={ "feedbacks/" } />
								</div>	
							})					
						}
					</div>
				</div>
			</center>
		</>
	);
}
export default AddFeedback;
