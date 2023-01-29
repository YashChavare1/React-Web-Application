import BigCard from "./BigCard";
import { useState, useEffect } from "react";
import db from "./Db";
import { get, ref, child} from "firebase/database";

function Batches() {
	
	const[data, setData] = useState([]);

	useEffect(() => {
		const dbref = ref(db);
		get(child(dbref, "batches/"))
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

	return(
		<>
			<center>
				<h1>Batches</h1>
				<div className="row">
					{
						data.map((e) => {
							return <BigCard imageUrl={ e.urls } />
						})
					}					
				</div>
			</center>
		</>
	);
}
export default Batches;