import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import './Login.css';

function Autentification() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorAuthentication, setErrorAuthentication] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

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
                const response = await axios.post('http://localhost:8081/login', {
                    email,
                    password,
                });
                console.log(response)
                if (response.data.Login) {
                    console.log('Authentification réussie!');
                    navigate('/courses');
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
                        type='email'
                        value={email}
                        onChange={handleEmail}
                        placeholder="Email"
                        aria-label="Email"
                    />
                </div>
                <p className="error" aria-live="assertive">{errorAuthentication}</p>
                <div className="input-group">
                    <input
                        type='password'
                        value={password}
                        onChange={handlePassword}
                        placeholder="Mot de passe"
                        aria-label="Mot de passe"
                    />
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
