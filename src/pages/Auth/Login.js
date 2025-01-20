import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import './Login.css';

function Autentification() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [errorAuthentication, setErrorAuthentication] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev); // Toggle the showPassword state
    const validate = async () => {
        let valid = true;

        if (!email) {
            setErrorAuthentication('Veuillez entrer votre email!');
            valid = false;
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setErrorAuthentication('Veuillez entrer un email valide!');
            valid = false;
        } else {
            setErrorAuthentication('');
        }

        if (!password) {
            setErrorPassword('Veuillez entrer votre mot de passe!');
            valid = false;
        } else {
            setErrorPassword('');
        }

        if (valid) {
            setLoading(true);
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.post('http://localhost:8081/login', {
                    withCredentials : true,
                    email,
                    password,
                });
                console.log('hado mn login'+response);
                if (response.data.Login) {
                    console.log('Authentification réussie!');
                    if(response.data.role === 'admin'){
                        navigate('/Dashboard')
                    }
                    else{
                        navigate('/courses');
                    }
                } else {
                    setErrorAuthentication('Email ou mot de passe incorrect.');
                }
            } catch (error) {
                console.error('Erreur lors de la connexion:', error);
                setErrorAuthentication('Erreur de connexion au serveur.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-logo">
                <Link to="/">
                    <img src="logochu.jpg" alt="Logo CHU" />
                </Link>
            </div>
            <div className="auth-form">
                <h1>Connectez-vous</h1>
                <div className="input-group">
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmail}
                        placeholder="Email"
                        aria-label="Email"
                    />
                </div>
                <p className="error" aria-live="assertive">{errorAuthentication}</p>
                <div className="input-group password-group">
                    <input
                        type={showPassword ? 'text' : 'password'} // Toggle input type
                        value={password}
                        onChange={handlePassword}
                        placeholder="Mot de passe"
                        aria-label="Mot de passe"
                    />
                    <button
                        type="button"
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <p className="error" aria-live="assertive">{errorPassword}</p>
                <hr />
                <div>
                    <button
                        className={`auth-button ${loading ? 'loading' : ''}`}
                        onClick={validate}
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? <div className="spinner"></div> : <FaEnvelope className="icon" />} Continuer
                    </button>
                </div>
                <div className="auth-footer">
                    <span>Vous n'avez pas de compte?</span>
                    <hr />
                    <Link to="/contact-admin">Contacter l'administration pour plus d'informations</Link>
                </div>
            </div>
        </div>
    );
}

export default Autentification;
