import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="error-code">404</h1>
      <p className="error-message">Oops! Page Not Found</p>
      <p className="error-description">
        The page you are looking for might have been removed, renamed, or is temporarily unavailable.
      </p>
      <a href="/" className="back-button">Go to Homepage</a>
    </div>
  );
};

export default NotFound;
