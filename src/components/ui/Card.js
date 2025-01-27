import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure you import Bootstrap
import "../../components/ui/card.css";

function Card(props) {
  const formation = props.items;
  const [message, setMessage] = useState('');
  const [EmpId, setEmpId] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get("http://localhost:8081/menu", {
          withCredentials: true,
        });
        if (response.data.valid) {
          setEmpId(response.data.id);
        } else {
          console.log("Erreur fetching id");
        }
      } catch (error) {
        console.error("Error fetching user id:", error);
      }
    };
    fetchUserRole();
  }, []);

  const handleInscription = async () => {
    try {
      const employee_id = EmpId;
      const response = await axios.post('http://localhost:8081/formation-requests', {
        employee_id: employee_id,
        formation_id: formation.id,
      });
      setMessage('Inscription réussie! Votre demande est en attente de validation.');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
  };

  const handleDownload = () => {
    if (formation.filepath) {
      const fileUrl = `http://localhost:8081/${formation.filepath}`;
      window.open(fileUrl, '_blank');
    } else {
      setMessage('Aucun fichier disponible pour ce formation.');
    }
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="col-md-4 d-flex align-items-strtch mb-4"> {/* Added Bootstrap grid classes */}
      <div className="card shadow-lg p-3">
        <h1 className="card-title text-primary">{formation.titre}</h1>
        <p><strong>Durée :</strong> {formation.duree} jours</p>
        <p><strong>Date :</strong> {formatDate(formation.date_debut)} - {formatDate(formation.date_fin)}</p>
        <p><strong>Description :</strong> {formation.description}</p>
        <button className="btn btn-primary me-3 card-button" onClick={handleInscription}>S'inscrire</button>
        {formation.filepath &&
         <button className="btn btn-success " onClick={handleDownload}>
          <i className='fa fa-download me-2'></i>
          Telecharger</button>}
      {message && <p className="message alert alert-info text-center rounded">{message}</p>}

      </div>
    </div>
  );
}

export default Card;
