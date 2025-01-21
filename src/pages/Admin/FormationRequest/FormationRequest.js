import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FormationRequest.css';

function FormationRequest() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8081/formation-requests');
      console.log(response.data)
      setRequests(response.data);
    } catch (err) {
      console.error('Error fetching requests:', err);
    }
  };

  const handleAction = async (id, status) => {
    try {
      await axios.put(`http://localhost:8081/formation-requests/${id}`, { status });
      fetchRequests(); // Refresh the list
    } catch (err) {
      console.error('Error updating request status:', err);
    }
  };

  return (
    <div>
      {requests.map((req) => (
        <div key={req.id} className="formation-card">
          <h2>Inscription en attente: {req.formation_title}</h2>
          <h3>Nom:</h3>
          <p>{req.employee_name}</p>
          <h3>Service:</h3>
          <p>{req.service}</p>
          <h3>Formation:</h3>
          <p>{req.formation_title}</p>
          <h3>Date de formation:</h3>
          <p>{new Date(req.date_debut).toLocaleDateString()}</p>
          <div className="buttons">
            <button
              className="validate"
              onClick={() => handleAction(req.request_id, 'validated')}
            >
              Valider
            </button>
            <button
              className="reject"
              onClick={() => handleAction(req.request_id, 'rejected')}
            >
              Refuser
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FormationRequest;
