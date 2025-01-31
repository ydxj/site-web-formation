import { useState, useEffect } from 'react';
import { FaIdCard, FaArrowRight, FaUserCheck, FaExclamationTriangle ,FaTimes} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Menu from '../../../components/ui/menu';
import FormationRequest from '../FormationRequest/FormationRequest';
import FormationPassées from '../formatiomPassée/formationPassées';
import axios from 'axios';

function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [greetingMessage, setgreetingMessage] = useState("");
    const [Formations, setFormations] = useState([]);
    const [Request, setRequests] = useState([]);
    const [RequestDone, setRequestDone] = useState([]);
    const [username,setUsername] = useState("")
    const [Erreur, setError] = useState('');
    const [showFormationPassées, setShowFormationPassées] = useState(false);
    const [showRequests, setShowRequests] = useState(false);
    const currentHour = new Date().getHours(); // Get the current hour
    const messagere = ()=>{
        if (currentHour < 12) {
        setgreetingMessage("Bonjour") // Good Morning in French
        } else {
            setgreetingMessage("Bonsoir") // Good Evening in French
        }
    }
    
    useEffect(() => {
        messagere();
        fetchEmployees();
        fetchFormations();
        fetchRequests();
        fetchRequestDone();
        fetchUserRole();
    }, []);
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

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8081/employees');
            setEmployees(response.data);
        } catch (err) {
            console.error('Erreur lors de la récupération des employés:', err);
            setError('Impossible de récupérer les employés.');
        }
    };

    const fetchRequests = async () => {
        try {
            const response = await axios.get('http://localhost:8081/formation-requests');
            setRequests(response.data);
        } catch (err) {
            console.error('Error fetching requests:', err);
        }
    };

    const fetchRequestDone = async () => {
        try {
            const response = await axios.get('http://localhost:8081/formation-requestsdone');
            setRequestDone(response.data);
        } catch (err) {
            console.error('Error fetching requests:', err);
        }
    };

    useEffect(() => {
        if (showRequests) {
            document.getElementById("formation-requests")?.scrollIntoView({ behavior: "smooth" });
        }

        if (showFormationPassées) {
            document.getElementById("formation-passees")?.scrollIntoView({ behavior: "smooth" });
        }
    }, [showRequests,showFormationPassées]);

    return (
        <div className="dashboard-layout">
            <Menu className="sidebar" />

            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>{greetingMessage} {username}</h1>
                    <p>Bienvenue dans le système de gestion des formation</p>
                </div>

                <div className="cards-container">
                    <div className="dashboard-card">
                        <FaIdCard className="icon" />
                        <h2>TOTAL EMPLOYÉS</h2>
                        <span>{employees.length}</span>
                        <Link to="/Employee">Plus d'info <FaArrowRight /></Link>
                    </div>

                    <div className="dashboard-card">
                        <FaUserCheck className="icon" />
                        <h2>Total Formation</h2>
                        <span>{Formations.length}</span>
                        <Link to="/Gestionformation">Plus d'info <FaArrowRight /></Link>
                    </div>

                    <div className="dashboard-card">
                <FaUserCheck className="icon" />
                <h2>Formation en attente</h2>
                <span>{Request.length}</span>
                <a href="#" onClick={() => setShowRequests(!showRequests)}>
                    {showRequests ? "Masquer" : "Plus d'info"} <FaArrowRight />
                </a>
            </div>


            <div className="dashboard-card">
                <FaExclamationTriangle className="icon" />
                <h2>Formation Passées</h2>
                <span>{RequestDone.length}</span>
                <a href="#" onClick={() => setShowFormationPassées(!showFormationPassées)}>
                    {showFormationPassées ? "Masquer" : "Plus d'info"} <FaArrowRight />
                </a>
            </div>
                </div>

                {showRequests && (
                <div className="formation-requests">
                    <FormationRequest />
                </div>
                )}

               

                {showFormationPassées && (
                    <div className="formation-passees">
                        <FormationPassées />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
