import Menu from "../../components/ui/menu";

function FormationDemande(){
	return(
		<div>
		<div>
			<Menu/>
		</div>
		
		<div className="formation-container">
      <div className="header">
        <h1> Formation Demande</h1>
      </div>
      <div className="table-container">
        <table className="formation-table">
          <tr className="table-row">
            <th className="table-header-cell">Titre</th>
            <th className="table-header-cell">Date Début</th>
            <th className="table-header-cell">Date Fin</th>
			<th className="table-header-cell">Description</th>
            <th className="table-header-cell">Action</th>
          </tr>
          
          <tr className="table-row">
            <td className="table-cell"></td>
            <td className="table-cell"></td>
            <td className="table-cell"></td>
			<td className="table-cell"></td>
            <td className="table-cell"> <button className="status-button">En Cours</button></td>	
          </tr>
        
        </table>
      </div>
    </div>
	</div>
  );
	
}
export default FormationDemande