import Menu from "../../components/ui/menu";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FormationDemande() {
    const [formations, setFormations] = useState([]);
    const [formationsR, setFormationsR] = useState([]);
    const [error, setError] = useState('');
    const [ID, setID] = useState('');

    useEffect(() => {
        fetchFormations();
        fetchID();
    }, []);

    useEffect(() => {
        if (ID) {
            fetchFormationsR();
        }
    }, [ID]);

    const fetchID = async () => {
        try {
            const response = await axios.get("http://localhost:8081/menu", {
                withCredentials: true,
            });
            if (response.data.valid) {
                // console.log(response.data);
                setID(response.data.id);
            }
        } catch (error) {
            console.error("Error fetching user role:", error);
        }
    };

    const fetchFormations = async () => {
        try {
            const response = await axios.get('http://localhost:8081/formations');
            setFormations(response.data);
        } catch (err) {
            console.error('Error fetching formations:', err);
            setError('Unable to fetch formations.');
        }
    };

    const fetchFormationsR = async () => {
        if (!ID) {
            console.error("ID de l'employé manquant.");
            setError("L'ID de l'employé est requis.");
            return;
        }
        try {
            const response = await axios.get('http://localhost:8081/formationR', {
                params: { userId: ID }
            });
            // console.log("Réponse reçue :", response.data);
            setFormationsR(response.data);
        } catch (err) {
            console.error('Erreur lors de la récupération des formations:', err);
            setError('Impossible de récupérer les formations.');
        }
    };

    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString('fr-FR', options);
    };

    return (
        <div>
            <Menu />

            <div className="formation-container">
                <div className="header">
                    <h1>Formation Demande</h1>
                </div>

                {error && <p className="error-message">{error}</p>}

                <div className="table-container">
                    <table className="formation-table">
                        <thead>
                            <tr className="table-row">
                                <th className="table-header-cell">Titre</th>
                                <th className="table-header-cell">Date Début</th>
                                <th className="table-header-cell">Date Fin</th>
                                <th className="table-header-cell">Description</th>
                                <th className="table-header-cell">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formationsR.map((formation) => (
                                <tr className="table-row" key={formation.id}>
                                    <td className="table-cell">{formation.formation_title}</td>
                                    <td className="table-cell">{formatDate(formation.date_debut)}</td>
                                    <td className="table-cell">{formatDate(formation.date_fin)}</td>
                                    <td className="table-cell">{formation.description}</td>
                                    <td className="table-cell">
                                        {formation.status === "validated" && (
                                            <button className="card-button" style={{ backgroundColor: 'rgb(36, 150, 50)', width: "100%" }}>
                                                Accepter
                                            </button>
                                        )}
                                        {formation.status === "rejected" && (
                                            <button className="card-button" style={{ backgroundColor: 'rgb(215, 9, 9)', width: "100%" }}>
                                                Refuser
                                            </button>
                                        )}
                                        {formation.status === "pending" && (
                                            <button className="card-button" style={{ backgroundColor: 'rgb(35, 49, 156)', width: "100%" }}>
                                                En Cours
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default FormationDemande;
