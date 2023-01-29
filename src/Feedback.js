import FeedbackCard from "./FeedbackCard";
import { useState, useEffect } from "react";
import { ref, get, child } from "firebase/database";
import db from "./Db";

function Feedback() {

	const[data, setData] = useState([]);
	
 	useEffect(()=>{
		const dbref = ref(db);
		get(child(dbref, "feedbacks/"))
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
				<h1>Feedback</h1> <br/><br/>
				<div className="container">
					<div className="row">
						{
							data.map((e) => {
								return <div className="col-md-4">
									<FeedbackCard imageUrl={e.urls} />
								</div>	
							})					
						}
					</div>
				</div>
			</center>
		</>
	);
}

export default Feedback;