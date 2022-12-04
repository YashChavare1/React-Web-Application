import main from "./image/Main.PNG";
import ml from "./image/ML.PNG";
import python from "./image/Python.PNG";

function Home() {
	return(
		<>
			<center>
				<h1>Kamal Classes By Kamal Sir</h1>
				<img id="img" src={ main } /><br/>
				<img id="img" src={ ml } /><br/>
				<img id="img" src={ python } /><br/>
			</center>
		</>
	);
}
export default Home;