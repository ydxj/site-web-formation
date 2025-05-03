import Menu from "../../components/ui/menu";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Ajouter Bootstrap dynamiquement si pas encore ajouté
const bootstrapLink = document.createElement("link");
bootstrapLink.rel = "stylesheet";
bootstrapLink.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
document.head.appendChild(bootstrapLink);

function FormationDemande() {
    const [formationsR, setFormationsR] = useState([]);
    const [error, setError] = useState('');
    const [ID, setID] = useState('');

    useEffect(() => {
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
                setID(response.data.id);
            }
        } catch (error) {
            console.error("Erreur ID:", error);
        }
    };

    const fetchFormationsR = async () => {
        if (!ID) {
            setError("L'ID de l'employé est requis.");
            return;
        }
        try {
            const response = await axios.get('http://localhost:8081/formationR', {
                params: { userId: ID }
            });
            setFormationsR(response.data);
        } catch (err) {
            console.error('Erreur récupération formations:', err);
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

           
            <style>
                {`
                .table td {
                    vertical-align: middle;
                }
                .btn-status {
                    white-space: nowrap;
                    text-align: center;
                    font-size: 14px;
                    padding: 5px 10px;
                    width: 100%;
                    display: inline-block;
                }
                @media (max-width: 768px) {
                    .table td {
                        font-size: 13px;
                        padding: 0.4rem;
                    }
                    .btn-status {
                        font-size: 12px;
                        padding: 4px 6px;
                    }
                }
                /* Classe pour la description */
                td.description {
                    max-width: 250px;
                    overflow: hidden; /* Empêcher le débordement du texte */
                    text-overflow: ellipsis; /* Ajouter "..." si le texte est trop long */
                    white-space: nowrap; /* Empêcher le retour à la ligne */
                }

                /* Option : Pour autoriser le retour à la ligne de la description */
                td.description.wrap {
                    white-space: normal; /* Permet le retour à la ligne */
                    word-wrap: break-word; /* Coupure des mots longs */
                }
                `}
            </style>

            <div className="container my-4">
                <h1 className="mb-4">Formation Demande</h1>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-primary text-center">
                            <tr>
                                <th>Titre</th>
                                <th>Date Début</th>
                                <th>Date Fin</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formationsR.map((formation) => (
                                <tr key={formation.id}>
                                    <td style={{ whiteSpace: "nowrap" }}>{formation.formation_title}</td>
                                    <td style={{ whiteSpace: "nowrap" }}>{formatDate(formation.date_debut)}</td>
                                    <td style={{ whiteSpace: "nowrap" }}>{formatDate(formation.date_fin)}</td>
                                    {/* Appliquer la classe description */}
                                    <td className="description wrap">
                                        {formation.description}
                                    </td>
                                    <td>
                                        {formation.status === "validated" && (
                                            <button className="btn btn-success btn-status">
                                                Accepter
                                            </button>
                                        )}
                                        {formation.status === "rejected" && (
                                            <button className="btn btn-danger btn-status">
                                                Refuser
                                            </button>
                                        )}
                                        {formation.status === "pending" && (
                                            <button className="btn btn-primary btn-status">
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
