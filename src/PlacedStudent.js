import './PlacedStudent.css';
import './Table.css';
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get, set, ref, child, remove } from "firebase/database";
import { uid } from "uid";
import db from "./Db";

function PlacedStudent() {
	const nav = useNavigate();
	const rName = useRef();

	const[data, setData] = useState([]);
	const[user, setUser] = useState("");
	const[name, setName] = useState("");
	const[company, setCompany] = useState("");
	const[pkg, setPkg] = useState("");
	const[college, setCollege] = useState("");

	const hName = (event) => { setName(event.target.value); }
	const hCompany = (event) => { setCompany(event.target.value); }
	const hPkg = (event) => { setPkg(event.target.value); }
	const hCollege = (event) => { setCollege(event.target.value); }

	useEffect(()=> {
		let u = localStorage.getItem("un");
		if(u == null) nav("/adminlogin");
		else setUser(u);

		const dbref = ref(db);
		get(child(dbref, "placedStudent/"))
		.then((snapshot) => {
			if(snapshot.exists) {
				setData([]);
				const data = snapshot.val();
				Object.values(data).map((placedStudent) => {
					setData((oldArray) => [...oldArray, placedStudent])
				})
			}
			else {
				alert("no data found");
			}
		})
		.catch(err => console.log(err));
	},[]);

	const Submit = (event) => {  

		if(name.trim().length == 0) {
			alert("Please Enter Name.");
			return;
		}

		if(company.trim().length == 0) {
			alert("Please Enter Company Name.");
			return;
		}

		if(pkg.trim().length == 0) {
			alert("Please Enter Salary Package.");
			return;
		}

		if(college.trim().length == 0) {
			alert("Please Enter College Name.");
			return;
		}

		event.preventDefault();
		const id = uid();
		let d = new Date().toString();
		let n = name + "->" + d;
		let data = { id, name, company, pkg, college };
		let r = ref(db, "placedStudent/" + id);	
		set(r, data)
		.then(res => {
			alert("Record Uploaded");
			window.location.reload();
			rName.current.focus();
		})
		.catch(err => console.log(err));
	}

	const deleteTask = (id) => {
		remove(ref(db, "placedStudent/" + id))
		.then(() => {
			window.location.reload();
		})
		.catch((err) => console.log(err));
	}

	return(
		<>
			<center>
				<h1>Upload Placed Student Record</h1>
				<form onSubmit={ Submit } className="form">
					<input type="text" id="ipt" placeholder="Enter Name" onChange={ hName } value={ name } ref={ rName } autoComplete="off"/><br/><br/>
					<input type="text" id="ipt" placeholder="Enter Company" onChange={ hCompany } value={ company } autoComplete="off" /><br/><br/>
					<input type="number" id="ipt" step="any" placeholder="Enter Package" onChange={ hPkg } value={ pkg } autoComplete="off" /><br/><br/>
					<input type="text" id="ipt" placeholder="Enter College" onChange={ hCollege } value={ college } autoComplete="off" /><br/><br/>
					<input type="submit" id="btn" value="Add Student" />
				</form>
				<br/><br/><hr/><br/>

				<table className="details">
						<tr>
							<th>Name</th>
							<th>Company</th>
							<th>Package</th>
							<th>College</th>
							<th>Delete</th>
						</tr>
						{
							data.map((e) => (
								<tr>
									<td id="data">{ e.name }</td>
									<td id="data">{ e.company }</td>
									<td id="data-pkg">{ e.pkg } LPA</td>
									<td id="data">{ e.college }</td>
									<td  id="btn-del"><button onClick={()=>{deleteTask(e.id)}}>Delete</button></td>
								</tr>
							))
						}
					</table>
					<br/><br/>
			</center>
		</>
	);
}
export default PlacedStudent;