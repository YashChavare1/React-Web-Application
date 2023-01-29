import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Logout() {

	const[user, setUser] = useState();
	const nav = useNavigate();

	useEffect(() => {
		let u = localStorage.getItem("un");
		if(u == null) nav("/adminlogin");
		else setUser(u);
	},[]);

	const Logout = (event) => {
		event.preventDefault();
		const auth = getAuth();
		localStorage.clear();
		signOut(auth)
		.then(res => {
			nav("/adminlogin");
			window.location.reload();
		})
		.catch(err => console.log(err));
	}

	return(
		<>
			<center>
				<h1>Kamal Classes</h1>	
				<form onSubmit={ Logout }>
					<input type="submit" value="Logout" />
				</form>	
			</center>
		</>
	);
}
export default Logout;