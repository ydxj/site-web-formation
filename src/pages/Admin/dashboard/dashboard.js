import { FaIdCard, FaArrowRight, FaUserCheck, FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Menu from '../../../components/ui/menu';

function Dashboard() {
    return (
		<div>
			<div>
				<Menu/>
			</div>
		
			<div className="dashboard-container">
				<div className="dashboard-header">
					<h1>Dashboard</h1>
					<p>Welcome to Attendance Management System</p>
				</div>
				
				<div className="cards-container">
					<div className="dashboard-card">
						<FaIdCard className="icon" />
						<h2>TOTAL EMPLOYEES</h2>
						<span>5</span>
						<Link to="/Employee">More info <FaArrowRight /></Link>
					</div>

					<div className="dashboard-card">
						<FaUserCheck className="icon" />
						<h2>Total Formation</h2>
						<span>0%</span>
						<Link to="/Gestionformation">More info <FaArrowRight /></Link>
					</div>

					<div className="dashboard-card">
						<FaUserCheck className="icon" />
						<h2>ON TIME TODAY</h2>
						<span>0</span>
						<Link to="/Attendance">More info <FaArrowRight /></Link>
					</div>

					<div className="dashboard-card">
						<FaExclamationTriangle className="icon" />
						<h2>LATE TODAY</h2>
						<span>1</span>
						<Link to="/Late">More info <FaArrowRight /></Link>
					</div>
				</div>
			</div>

		</div>
    );
}

export default Dashboard;
