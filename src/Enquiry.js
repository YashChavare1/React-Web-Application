import './Enquiry.css';
import { useState, useRef } from "react";
import { getDatabase, set, ref } from "firebase/database";
import { initializeApp } from "firebase/app";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import db from "./Db";
import { uid } from "uid";
import emailjs from "@emailjs/browser";

function Enquiry() {

	const rName = useRef();
	const[name, setName] = useState("");
	const[college, setCollege] = useState("");
	const[phone, setPhone] = useState("");
	const[query, setQuery] = useState("");
	const[email, setEmail] = useState("");
	const[final, setFinal] = useState("");
	const[otp, setOtp] = useState("");	
	const[sendOtp2, setSendOtp2] = useState(true);
	const[SubmitOtp2, setSubmitOtp2] = useState(false);

	const hName = (event) => { setName(event.target.value); }
	const hCollege = (event) => { setCollege(event.target.value); }
	const hPhone = (event) => { setPhone(event.target.value); }
	const hQuery = (event) => { setQuery(event.target.value); }
	const hEmail = (event) => { setEmail(event.target.value); }	
	const hOtp = (event) => { setOtp(event.target.value); }

	const configureCaptcha = () => { 
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
			'size':'invisible',
			'callback':(response) => {
				sendOtp();
				console.log("Recaptca Verified");
			},
			defaultCountry: "IN"
		});
	}

	const sendOtp = (event) => {
		event.preventDefault();
		if(name.trim().length == "") {
			alert("Please Enter Name");
			return;
		}
		if(!name.match(/^[a-zA-z ]+$/)) {
			alert("Invalid Name");
			return;
		}
		if(phone.trim().length == "") {
			alert("Please Enter Phone Number");
			return;
		}
		if( (phone.trim().length > 10) || (phone.trim().length < 10) || (!phone.match(/^[0-9 ]+$/)) ) {
			alert("Invalid Phone Number");
			return;
		}
		if(college.trim().length == "") {
			alert("Please Enter College Name");
			return;
		}
		if(!college.match(/^[a-zA-z ]+$/)) {
			alert("Invalid College Name");
			return;
		}
		if( (email.trim().length == "") ) {
			alert("Enter Email");
			return;
		}
		if(query.trim().length == "") {
			alert("Please Enter Your Query");
			return;
		}
		configureCaptcha();
		let pn = "+91" + phone;
		let av = window.recaptchaVerifier;
		firebase.auth().signInWithPhoneNumber(pn,av)
		.then(res => {
			setFinal(res);
			setSendOtp2(false);
			setSubmitOtp2(true);			
			alert("OTP has been send to Mobile No: " + phone);
		})
		.catch(err => {
			console.log(err);
		})
	}

	const submitOtp = (event) => {
		event.preventDefault();

		if(otp.trim().length == "") {
			alert("Please Enter OTP");
			return;
		}

		{/* Send Email */}
		let key = "FlYCAt4jRplkXEcMG";
		let template = "template_10kt8cm";
		let service_id = "service_z55xf1b";
		let email_data = { "name": name, "college": college, "phone": phone, "query": query};
		
		emailjs.send(service_id, template, email_data, key)
		.then(res => console.log(res))
		.catch(err => console.log(err));

		{/* OTP Verification */}
		final.confirm(otp)
		.then(res => {
			const id = uid();
			const d = new Date().toString();
			const n = id;
			const data = { id, name, college, phone, query, email, d };
			set(ref(db, "enquiry/" + n), data)
			.then(res => {
				console.log(res);
				alert("We will get back to you within 2 hrs");
				window.location.reload()
			})
			.catch(err => console.log(err))
		})
		.catch(err => {
			console.log(err);
			alert("invalid OTP");
			window.location.reload()
		})
	}

	return(
		<>
			<center>
				{ sendOtp2 ? <div className="sendOtp">
						{/* send OTP */}
						<form onSubmit={ sendOtp }>
							<h1>Ask Your Query</h1>
							<div id="sign-in-button"></div>
							<input type="text" id="name" placeholder="Enter Name" onChange={ 	hName } value={ name } ref={ rName } />
							<input type="number" id="phone" placeholder="Enter Phone" onChange={ hPhone } value={ phone } /><br/><br />
							<input type="text" id="college" placeholder="Enter College" onChange={ hCollege } value={ college } />
							<input type="email" id="email" placeholder="Enter Email" onChange={ hEmail } value={ email } /><br/><br/>
							<textarea id="ta" placeholder="Enter Your Query" rows={ 4 } cols={ 20 } onChange={ hQuery } value={ query } ></textarea> <br/><br />
							<input type="submit" id="btn" value="SEND OTP" />
						</form>
					</div> : null }
					
					{ SubmitOtp2 ? <div className="submitOtp">
						{/* Submit OTP */}
						<h2>Enter One Time Password</h2>
						<form onSubmit={ submitOtp }>
							<input type="text" id="otp" placeholder="Enter OTP" onChange={ hOtp } value={ otp } /> <br/><br/>
							<input type="submit" id="btn" value="Submit OTP" />		
						</form>
					</div> : null }
			</center>
		</>
	);
}
export default Enquiry;