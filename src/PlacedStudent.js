import { useState, useRef } from "react";
import { set, ref } from "firebase/database"
import db from "./Db";

function PlacedStudent() {

	const rName = useRef();

	const[name, setName] = useState("");
	const[company, setCompany] = useState("");
	const[pkg, setPkg] = useState("");
	const[college, setCollege] = useState("");

	const hName = (event) => { setName(event.target.value); }
	const hCompany = (event) => { setCompany(event.target.value); }
	const hPkg = (event) => { setPkg(event.target.value); }
	const hCollege = (event) => { setCollege(event.target.value); }

	const Submit = (event) => {  
		event.preventDefault();
		let d = new Date().toString();
		let n = name + "->" + d;
		let data = { name, company, pkg, college };
		let r = ref(db, "placedStudent/" + n);	
		set(r, data)
		.then(res => {
			alert("Record Uploaded");
			setName("");
			setCollege("");
			setPkg("");
			rName.current.focus();
		})
		.catch(err => console.log(err));
	}

	return(
		<>
			<center>
				<h1>Upload Student Record</h1>
				<form onSubmit={ Submit }>
					<input type="text" placeholder="Enter Name" onChange={ hName } value={ name } ref={ rName } /><br/><br/>
					<input type="text" placeholder="Enter Company" onChange={ hCompany } value={ company } /><br/><br/>
					<input type="number" step="any" placeholder="Enter Package" onChange={ hPkg } value={ pkg } /><br/><br/>
					<input type="text" placeholder="Enter College" onChange={ hCollege } value={ college } /><br/><br/>
					<input type="submit" value="Add Student" />
				</form>
			</center>
		</>
	);
}
export default PlacedStudent;