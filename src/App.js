import './App.css';
import NavBar from "./NavBar";
import Home from "./Home";
import Batches from "./Batches";
import Placed from "./Placed";
import Feedback from "./Feedback";
import Enquiry from "./Enquiry";
import PlacedStudent from "./PlacedStudent";
import AddHome from "./AddHome";
import AdminLogin from "./AdminLogin";				
import AddBatches from "./AddBatches";
import AddFeedback from "./AddFeedback";
import StudentEnquery from "./StudentEnquery";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
	<>
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/" element={ <Home /> } />
				<Route path="/batches" element={ <Batches /> } />
				<Route path="/placed" element={ <Placed /> } />
				<Route path="/feedback" element={ <Feedback /> } />
				<Route path="/enquiry" element={ <Enquiry /> } />

				<Route path="/adminlogin" element={ <AdminLogin /> } />	
				<Route path="/admin/addhomeimages" element={ <AddHome /> } />		
				<Route path="/admin/addbatches" element={ <AddBatches /> } />
				<Route path="/admin/addfeedback" element={ <AddFeedback /> } />
				<Route path="/admin/placedstudent" element={ <PlacedStudent /> } />
				<Route path="/admin/studentenquery" element=<StudentEnquery /> />
				<Route path="*" element={ <Navigate to="/" /> } />
			</Routes>
		</BrowserRouter>	
	</>
  );
}

export default App;
