import './App.css';
import NavBar from "./NavBar";
import Home from "./Home";
import Batches from "./Batches";
import Placed from "./Placed";
import Feedback from "./Feedback";
import Enquiry from "./Enquiry";
import PlacedStudent from "./PlacedStudent";
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
				<Route path="/placedstudent" element={ <PlacedStudent /> } />
			</Routes>
		</BrowserRouter>	
	</>
  );
}

export default App;
