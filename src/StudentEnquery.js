import './Table.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ref, get, child, remove } from "firebase/database";
import db from "./Db";

function StudentEnquery() {

	const nav = useNavigate();
	const[data, setData] = useState([]);
	const[user, setUser] = useState("");

	useEffect(() => {
		let u = localStorage.getItem("un");
		if(u == null) nav("/adminlogin");
		else setUser(u);
		

		const dbref = ref(db);
		get(child(dbref, "enquiry/"))
		.then((snapshot) => {
			if(snapshot.exists) {
				setData([]);
				const data = snapshot.val();
				Object.values(data).map((enquiry) => {
					setData((oldArray) => [...oldArray, enquiry])
				})
			}
			else {
				alert("no data found");
			}
		})
		.catch(err => console.log(err));
	},[]);	

	const deleteTask = (id) => {
		remove(ref(db, "enquiry/" + id))
		.then(()=> {
			window.location.reload();
		})
		.catch((err) => console.log(err))
	}

	return(
		<>
			<center>
				<h1>Student Enquiry</h1><br/><br/>
				<table className="details">
					<tr>
						<th>Name</th>
						<th>Phone</th>
						<th>College</th>
						<th>Email</th>
						<th>Query</th>
						<th>Delete</th>
					</tr>
					{
						data.map((e) => (
							<tr>
								<td>{ e.name }</td>
								<td>{ e.phone }</td>
								<td>{ e.college }</td>
								<td>{ e.email }</td>
								<td>{ e.query }</td>
								<td id="btn-del"><button onClick = {() => {deleteTask(e.id)}}>Delete</button></td>
							</tr>
							))
					}
				</table>				
			</center>
		</>
	);
}
export default StudentEnquery;