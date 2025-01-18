import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBook, FaUsers, FaCogs, FaLifeRing ,FaSignOutAlt} from 'react-icons/fa';
import axios from 'axios';
import "../../components/ui/menu.css";

function Menu() {

    const [showMenu, setShowMenu] = useState(false);
    const [role, setRole] = useState("");
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const toggleMenu = () => setShowMenu((prev) => !prev);
    const handleLogout = async () => {
        try {
          const response = await axios.post('http://localhost:8081/logout', {}, { withCredentials: true });
          if (response.data.success) {
            console.log('Logged out successfully');
            setUsername('');
            setRole('');
            navigate('/login'); // Redirect to login page after logout
          } else {
            console.error('Error logging out:', response.data.message);
          }
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axios.get('http://localhost:8081/menu', {
                    withCredentials: true, 
                });
                console.log(response)
                if (response.data.valid) {
                    setRole(response.data.role); 
                    setUsername(response.data.username); 
                } else {
                    console.log("hahowa erreur")
                    navigate('/login'); 
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
                navigate('/login');
            }
        };

        fetchUserRole();
    }, [navigate]);

    return (
        <div>
            <button className="menu-button" onClick={toggleMenu}>
                ☰
            </button>

           
            <nav className={`menu-container ${showMenu ? 'show' : ''}`}>
                <div className="menu">
                    <button className="close-button" onClick={toggleMenu}>
                        ✖
                    </button>
                    <Link to="/">
                    <div className="menu-logo">
                        <img src="logochu2.png" alt="Logo" />
                    </div>
                    </Link>
                    <h3>Bienvenue, {username}</h3>

                    {/* Common menu items for all roles */}
                    <Link to="/help-support" className="menu-icon">
                        <FaLifeRing />  Aide et support
                    </Link>

                    {/* Admin-specific menu items */}
                    {role === 'admin' && (
                        <>
                            <Link to="/dashboard" className="menu-icon">
                                <FaTachometerAlt /> Tableau de bord
                            </Link>
                            <Link to="/training-management" className="menu-icon">
                                <FaBook /> Gestion des formations
                            </Link>
                            <Link to="/employee-management" className="menu-icon">
                                <FaUsers /> Gestion des employés
                            </Link>
                            <Link to="/settings" className="menu-icon">
                                <FaCogs /> Paramètres
                            </Link>
                        </>
                    )}

                    {/* User-specific menu items */}
                    {role === 'user' && (
                        <>
                            <Link to="/courses" className="menu-icon">
                                <FaBook /> Mes formations
                            </Link>
                            <Link to="/profile" className="menu-icon">
                                <FaCogs /> Mon profil
                            </Link>
                        </>
                    )}
                    <button className="menu-icon logout-button" onClick={handleLogout}>
                        <FaSignOutAlt /> Se déconnecter
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default Menu;
