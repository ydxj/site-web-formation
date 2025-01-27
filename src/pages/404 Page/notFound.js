import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="error-code">404</h1>
      <p className="error-message">Oups ! Page introuvable</p>
      <p className="error-description">
        La page que vous recherchez a peut-être été supprimée, renommée ou est temporairement indisponible.      </p>
      <a href="/" className="back-button">Aller à la page d'accueil</a>
    </div>
  );
};

export default NotFound;
