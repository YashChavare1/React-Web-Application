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
					<table border="2" style={{ widht: '50%' }}>
						<tr>
							<th>Name</th>
							<th>Company</th>
							<th>Package</th>
							<th>College</th>
						</tr>
						{
							data.map((e) => (
								<tr>
									<td>{ e.name }</td>
									<td>{ e.company }</td>
									<td>{ e.pkg }</td>
									<td>{ e.college }</td>
								</tr>
							))
						}
					</table>			
			</center>
		</>
	);
}
export default Placed;