import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMedicalInformation } from "react-icons/md";

import { FaTachometerAlt, FaBook, FaUsers, FaCogs, FaLifeRing, FaSignOutAlt,FaUserPlus} from "react-icons/fa";
import { HiArchive } from "react-icons/hi";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for menu button
import axios from "axios";
import "../../components/ui/menu.css";

function Menu() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // State for toggle menu
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:8081/logout", {}, { withCredentials: true });
      if (response.data.success) {
        console.log("Logged out successfully");
        setUsername("");
        setRole("");
        navigate("/login");
      } else {
        console.error("Error logging out:", response.data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get("http://localhost:8081/menu", {
          withCredentials: true,
        });
        if (response.data.valid) {
          setRole(response.data.role);
          setUsername(response.data.username);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        navigate("/login");
      }
    };

    fetchUserRole();
  }, [navigate]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="menu-container">
      <Link to='/'>
      <img src="logochu2.png" alt="Logo" className="menu-logo" />
      </Link>
     
      <p className="menu-button" onClick={toggleMenu}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </p>
      <div className={`menu ${menuOpen ? "active" : ""}`}>
        {role === "admin" && (
          <>
            <Link to="/Dashboard">
              <FaTachometerAlt /> Tableau de bord
            </Link>
            <Link to="/Gestionformation">
              <FaBook /> Gestion des formations
            </Link>
            <Link to="/AjouterEvenment">
              <HiArchive /> Événement
            </Link>
            <Link to="/Employee">
              <FaUsers /> Gestion des employés
            </Link>
            <Link to="/profile">
              <FaCogs /> Paramètres
            </Link>
            <Link to="/AjouterActualiter">
              <FaLifeRing /> Ajouter Actualiter
            </Link>
          </>
        )}
        {role === "user" && (
          <>
            <Link to="/courses">
              <FaTachometerAlt /> Dashboard 
            </Link>

            <Link to="/FormationDisponible" className="flex items-center gap-2">
              <MdOutlineMedicalInformation  />
                Formation disponible
            </Link>

            <Link to="/formation-demande">
              <FaBook/> Formation Demande
            </Link>

            <Link to="/profile">
              <FaCogs /> Mon profil
            </Link>
          </>
        )}
        <Link onClick={handleLogout}>
          <FaSignOutAlt /> Se déconnecter
        </Link>
      </div>
    </div>
  );
}

export default Menu;
