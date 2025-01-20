import './formationPassées.css'; // Assure-toi que le chemin vers le fichier CSS est correct

function FormationPassées() {
  return (
    <div className="formation-container">
      <div className="header">
        <h1>Historique des Formation</h1>
      </div>
      <div className="table-container">
        <table className="formation-table">
          <div className="table-header">
            <h3>Formation Passées</h3>
          </div>
          <tr className="table-row">
            <th className="table-header-cell">Nom</th>
            <th className="table-header-cell">Formation</th>
            <th className="table-header-cell">Date de Formation</th>
            <th className="table-header-cell">Status</th>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Emily Brown</td>
            <td className="table-cell">Soins d'Urgence</td>
            <td className="table-cell">28-12 Février 2025</td>
            <td className="table-cell"><button className="status-button1">Refusé</button></td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Mark Johnson</td>
            <td className="table-cell">Hygiéne et Prévention</td>
            <td className="table-cell">20-22 Février 2025</td>
            <td className="table-cell"><button className="status-button">Valider</button></td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">David White</td>
            <td className="table-cell">Prise en Charge de la Douleur</td>
            <td className="table-cell">29 Février 2025</td>
            <td className="table-cell"><button className="status-button">Valider</button></td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default FormationPassées;
