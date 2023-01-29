import './Table.css';
import { useState, useEffect } from "react";
import { ref, get, child } from "firebase/database";
import db from "./Db";

function Placed() {

	const[data, setData] = useState([]);

	useEffect(()=> {
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

	return(
		<>
			<center>
				<h1>Placed Student</h1>
					<table className="details">
						<tr>
							<th>Name</th>
							<th>Company</th>
							<th>Package</th>
							<th>College</th>
						</tr>
						{
							data.map((e) => (
								<tr>
									<td id="data">{ e.name }</td>
									<td id="data">{ e.company }</td>
									<td id="data-pkg">{ e.pkg } LPA</td>
									<td id="data">{ e.college }</td>
								</tr>
							))
						}
					</table>			
			</center>
		</>
	);
}
export default Placed;