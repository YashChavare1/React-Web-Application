import "./FeedbackStyle.css";
import { useState, useEffect } from "react";
import { remove, ref } from "firebase/database";
import db from "./Db";


function FeedbackCard(props) {
	
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
				remove(ref(db, dbn + id))
				.then(() => {
					window.location.reload();
					alert("Image Deleted Successfully.");
				}) 
				.catch((err) => console.log(err));
			}
		}
	}	

	return(
		<>
			<center>
				<img src={ url } id="img" onClick={() => {deleteImage(id)}} alt="Image Not Available" /><br/>
			</center>
		</>
	);
}
export default FeedbackCard;