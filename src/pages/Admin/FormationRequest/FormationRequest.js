import React from 'react';
import './FormationRequest.css';

function FormationRequest() {
  return (
    <div className="formation-card">
      <h2>Inscription en attente: Prise en charge de la Douleur</h2>
      <h3>Nom:</h3>
      <p>Jane Smith</p>
      <h3>Service:</h3>
      <p>Médecine Interne</p>
      <h3>Formation:</h3>
      <p>Prise en Charge : Prise en Charge de la Douleur</p>
      <h3>Date de formation:</h3>
      <p>15 Février 2025</p>
      <div className="buttons">
        <button className="validate">Valider</button>
        <button className="reject">Refuser</button>
      </div>
    </div>
  );
}

export default FormationRequest;
