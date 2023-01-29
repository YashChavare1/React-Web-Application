import './AdminLogin.css';
import { useState, useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

	const nav = useNavigate();
	const rEmail = useRef();	

	const[email, setEmail] = useState("");
	const[pass, setPass] = useState("");

	const hEmail = (event) => { setEmail(event.target.value); }
	const hPass = (event) => { setPass(event.target.value); }

	const Login = (event) => {
		event.preventDefault();
		
		if(email.trim().length == 0) {
			alert("Enter Email Id.");
			return;
		}
	
		if(pass.trim().length < 6) {
			alert("Password Length Should Atleast be 6.");
			return;
		}
	
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, pass)
		.then(res => {
			localStorage.setItem("un", email);
			nav("/admin/addhomeimages");
			window.location.reload();
		})		
		.catch(err => {
			alert("Invalid Credentials");
			setEmail("");
			setPass("");
		});
	}	

	return(
		<>	<center>
				<form onSubmit={ Login } className="form">
					<h1> Login in to Admin Panel </h1>
					<input type="email" id="ipt" placeholder="Email Id" onChange={ hEmail } value={ email } ref={ rEmail } /><br/><br/>
					<input type="password" id="ipt" placeholder="Enter Password" onChange={ hPass } value={ pass } /><br/><br/>
					<input type="submit" id="btn" value="Login" /><br/><br/>
				</form>
			</center>
		</>
	);
}
export default AdminLogin;