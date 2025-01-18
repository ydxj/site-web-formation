// import Card from "../../components/ui/Card"
import Menu from "../../components/ui/menu"
import EmployeeManagement from "../Admin/Employee/EmployeeManagement"
import Formations from "../Admin/Formation/formation"

function Courses(){
return(
	<div style={{display:'flex'}}>
		<div>
			<Menu/>
		</div>
		<div style={{width:"100%"}}>

			<EmployeeManagement />
			
		</div>

	</div>
)
}
export default Courses