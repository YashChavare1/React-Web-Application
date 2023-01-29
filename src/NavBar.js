import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import { getAuth, signOut } from "firebase/auth";

function NavBar() {

	const nav = useNavigate();
	const un = localStorage.getItem("un");

	const Logout = () => {
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
				<div className="nav">
					{ (un == null) && <Link to="/">Home</Link> }
					{ (un == null) && <Link to="/batches">Batches</Link> }
					{ (un == null) && <Link to="/placed">Placed Student</Link> }
					{ (un == null) && <Link to="/feedback">Feedback</Link> }
					{ (un == null) && <Link to="/enquiry">Enquiry</Link> }

					{ (un != null) && 	<Link to="/admin/addhomeimages">Add Home Images</Link> }
					{ (un != null) && 	<Link to="/admin/addbatches">Add Batches</Link> }
					{ (un != null) && 	<Link to="/admin/addfeedback">Add Student Feedback</Link> }
					{ (un != null) && 	<Link to="/admin/placedstudent">Placed Student</Link> }
					{ (un != null) && 	<Link to="/admin/studentenquery">Student Enquery</Link> }
					{ (un != null) && <Link onClick={() => {Logout()}} id="btn-logout">Logout</Link> }

				</div>
			</center>
		</>
	);
}
export default NavBar;

