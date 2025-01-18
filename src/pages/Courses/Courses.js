// import Card from "../../components/ui/Card"
import Menu from "../../components/ui/menu"
import Inscription from "../users/Inscription"


function Courses(){
return(
	<div >
		<div >
			<Menu/>
		</div>
		<div>
			<div>
			<h2 className="card-title"
			style={{

				color: 'black', 
				width: '80%', 
				margin: '20px auto', 
				padding: '20px', 
				fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif", // Correction de "fontFfamily"
				textAlign: 'center',
				fontSize: '32px', 
				fontWeight: 'bold', 
				borderRadius: '10px', 
				boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
				letterSpacing: '1px', 
			}}>
			Gestion de formations-CHU
			</h2>
			</div>
			<div>
			<Card/>
			<Card/>
			<Card/>
			<Card/>
			<Card/>
			<Card/>
			<Card/>
			<Card/>
			<Card/>
			<Card/>
			<Card/>
			<Card/>
			</div>
			<div >
				<Inscription/>
			</div>
		</div>
>>>>>>> ec2a31afe1fb0a5fcce1c7a15da4e9d4cf2c8f02
	</div>
)
}
export default Courses