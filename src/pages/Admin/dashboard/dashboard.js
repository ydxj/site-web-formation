import { FaIdCard, FaArrowRight, FaUserCheck, FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Menu from '../../../components/ui/menu';
import FormationRequest from '../FormationRequest/FormationRequest';
import FormationPassées from '../formatiomPassée/formationPassées';
import axios from 'axios';
import { useState,useEffect } from 'react';

function Dashboard() {
	const [employees, setEmployees] = useState([]);
	const [Formations, setFormations] = useState([]);
	const [Request, setRequests] = useState([]);
	const [RequestDone, setRequestDone] = useState([]);
	const [Erreur, setError] = useState([]);
	useEffect(() => {
		fetchEmployees();
		fetchFormations();
        fetchRequests();
        fetchRequestDone();
	}, []);
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
		console.log(response.data)

	} catch (err) {
		console.error('Erreur lors de la récupération des employés:', err);
		setError('Impossible de récupérer les employés.');
		console.log(Erreur)
	}
	};
    const fetchRequests = async () => {
        try {
          const response = await axios.get('http://localhost:8081/formation-requests');
          console.log(response.data)
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
    return (
        <div className="dashboard-layout">
            <Menu className="sidebar" />

            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                    <p>Welcome to Attendance Management System</p>
                </div>

                <div className="cards-container">
                    <div className="dashboard-card">
                        <FaIdCard className="icon" />
                        <h2>TOTAL EMPLOYEES</h2>
                        <span>{employees.length}</span>
                        <Link to="/Employee">More info <FaArrowRight /></Link>
                    </div>

                    <div className="dashboard-card">
                        <FaUserCheck className="icon" />
                        <h2>Total Formation</h2>
                        <span>{Formations.length}</span>
                        <Link to="/Gestionformation">More info <FaArrowRight /></Link>
                    </div>

                    <div className="dashboard-card">
                        <FaUserCheck className="icon" />
                        <h2>Formation en attent</h2>
                        <span>{Request.length}</span>
                        <Link to="/Attendance">More info <FaArrowRight /></Link>
                    </div>

                    <div className="dashboard-card">
                        <FaExclamationTriangle className="icon" />
                        <h2>Formation Passées</h2>
                        <span>{RequestDone.length}</span>
                        <Link to="/Late">More info <FaArrowRight /></Link>
                    </div>
                </div>

                <div className="formation-requests">
                    <FormationRequest />
                </div>
				<div>
					<FormationPassées/>
				</div>
            </div>
        </div>
    );
}

export default Dashboard;
