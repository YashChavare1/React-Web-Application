import { Link } from "react-router-dom";

function NavBar() {
	return(
		<>
			<center>
				<div className="nav">
					<Link to="/">Home</Link>
					<Link to="/batches">Batches</Link>
					<Link to="/placed">Placed Student</Link>
					<Link to="/feedback">Feedback's</Link>
					<Link to="/enquiry">Enquiry</Link>
				</div>
			</center>
		</>
	);
}
export default NavBar;