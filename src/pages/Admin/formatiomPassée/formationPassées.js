import './formationPassées.css'; // Assure-toi que le chemin vers le fichier CSS est correct
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FormationPassées() {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8081/formation-requestsdone');
      setRequests(response.data);
    } catch (err) {
      console.error('Error fetching requests:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

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
          {requests.map((req)=>
          <tr className="table-row">
            <td className="table-cell">{req.employee_name}</td>
            <td className="table-cell">{req.formation_title}</td>
            <td className="table-cell">{formatDate(req.date_debut)} |-| {formatDate(req.date_fin)}</td>
            <td className="table-cell">{req.status === "validated" ? <button className="status-button">Valider</button> : <button className="status-button1">Refusé</button>}</td>
          </tr>
          )}
        </table>
      </div>
    </div>
  );
}

export default FormationPassées;
