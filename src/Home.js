import { useState, useEffect } from "react"; 
import BigCard from "./BigCard";
import { ref, get, child } from "firebase/database";
import db from "./Db";

function Home() {

	const[data, setData] = useState([]);

	useEffect(() => {
		const dbref = ref(db);
		get(child(dbref, "homeImages/"))
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
				<h1>Welcome to Kamal Classes</h1><br/>
				<div className="row">
					{  
						data.map((e) => {
							return <BigCard imageUrl={e.urls} />	
						})
					}
				</div>
			</center>
		</>
	);
}
export default Home;