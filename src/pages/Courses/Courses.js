import Card from "../../components/ui/Card"
import Menu from "../../components/ui/menu"

function Courses(){
return(
	<div style={{display:'flex'}}>
		<div style={{display:"block"}}>
			<Menu/>
		</div>
		<div style={{width:"100%",marginRight:"20px",direction:"rtl"}}>
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
		
	</div>
)
}
export default Courses