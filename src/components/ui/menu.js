import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaBook, FaUsers, FaChalkboardTeacher, FaFileAlt, FaCogs, FaHistory, FaLifeRing } from 'react-icons/fa';
import "../../components/ui/menu.css";

function Menu() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu); 
    };

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
					
					<div className="menu-logo">
                        <img src="logochu2.png" alt="Logo" />
                    </div>
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

                    <Link to="/help-support" className="menu-icon">
                        <FaLifeRing /> Aide et support
                    </Link>
                </div>
            </nav>
        </div>
    );
}

export default Menu;
