import { useState, useEffect } from 'react';
import { FaIdCard, FaArrowRight, FaUserCheck, FaExclamationTriangle ,FaTimes} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Menu from '../../../components/ui/menu';

import axios from 'axios';

function DashboardU() {
    const [greetingMessage, setgreetingMessage] = useState("");
    const [Formations, setFormations] = useState([]);
    const [username,setUsername] = useState("")
    const [Erreur, setError] = useState('');
    const currentHour = new Date().getHours(); // Get the current hour
    const [formationsR, setFormationsR] = useState([]);
    const [ID, setID] = useState('');
    const messagere = ()=>{
        if (currentHour < 12) {
        setgreetingMessage("Bonjour") // Good Morning in French
        } else {
            setgreetingMessage("Bonsoir") // Good Evening in French
        }
    }
    
    useEffect(() => {
        messagere();
        fetchUserRole();
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
    
    const fetchUserRole = async () => {
        try {
          const response = await axios.get("http://localhost:8081/menu", {
            withCredentials: true,
          });
          if (response.data.valid) {
            setUsername(response.data.username);
          } else {
            console.log("Erreur")
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
    return (
        <div className="dashboard-layout">
            <Menu className="sidebar" />

            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>{greetingMessage} {username}</h1>
                    <p>Bienvenue dans le système de gestion des formation</p>
                </div>

                <div className="cards-container ">
                    <div className="dashboard-card">
                        <FaIdCard className="icon" />
                        <h2>Formation demande</h2>
                        <span>{formationsR.length}</span>
                        <Link to="/formation-demande">Plus d'info <FaArrowRight /></Link>
                    </div>

                    <div className="dashboard-card">
                        <FaUserCheck className="icon" />
                        <h2> Formation disponible</h2>
                        <span>{Formations.length}</span>
                        <Link to="/FormationDisponible">Plus d'info <FaArrowRight /></Link>
                    </div>          
                </div>
            </div>
        </div>
    );
}

export default DashboardU;
