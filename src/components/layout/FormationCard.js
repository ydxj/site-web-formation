import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "../ui/Card"
function FormationCard(){

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
      }, [ID]);  // Ce useEffect s'exécute uniquement quand ID change
      const fetchID = async () => {
        try {
          const response = await axios.get("http://localhost:8081/menu", {
            withCredentials: true,
          });
          if (response.data.valid) {
            // console.log(response.data)
            setID(response.data.id);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      };
    const fetchFormations = async () => {
    try {
        const response = await axios.get('http://localhost:8081/formations');
        // console.log(response.data)
        setFormations(response.data);
    } catch (err) {
        console.error('Error fetching formations:', err);
        setError('Unable to fetch formations.');
    }
    };
    const fetchFormationsR = async () => {
        if (!ID) {  // Vérifier que ID est bien défini avant d'envoyer la requête
            console.error("ID de l'employé manquant.");
            setError("L'ID de l'employé est requis.");
            return;
        }
        try {
            const response = await axios.get('http://localhost:8081/formationR', { 
                params: { userId: ID } // Utiliser "userId" au lieu de "id"
            });
            // console.log("Réponse reçue :", response.data);
            setFormationsR(response.data);
        } catch (err) {
            console.error('Erreur lors de la récupération des formations:', err);
            setError('Impossible de récupérer les formations.');
        }
    };


    return(
        <div>
            
            <div>
                <h2 className="card-title"
                style={{
                    color: 'black', 
                    width: '80%', 
                    margin: '20px auto', 
                    padding: '20px', 
                    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif", // Correction de "fontFfamily"
                    textAlign: 'center',
                    fontSize: '32px', 
                    fontWeight: 'bold', 
                    borderRadius: '10px', 
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
                    letterSpacing: '1px', 
                }}>
                Gestion de formations-CHU
                </h2>
                {error && <div className="alert">{error}</div>}
                <div className="container mt-5">
                    <div className="row">
                        {formations
                            .filter(data => !formationsR.some(r => r.id === data.id)) // Exclude duplicates
                            .map((data, index) => (
                                <Card key={index} items={data} />
                            ))
                        }
                    </div>
                </div>

                
			</div>
			
		
        </div>
    )
}
export default FormationCard