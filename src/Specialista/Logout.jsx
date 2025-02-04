import React from 'react';
import './Logout.css';

const LogoutModal = () => {
  return (
    <div className="logout-container">
      <div className="background" />
      <div className="logout-message">SEI SICURO DI VOLER USCIRE?</div>
      <div className="logout-button">
        <div className="button-border" />
        <div className="button-text-logout">LOGOUT</div>
      </div>
      {/* Profile Image (iconaDottore.png) */}
      <img className="profileDottore-image-logout" src="/iconaDottore.png" alt="Dottore"  />

      <img src="/BeFluent_logo_testo.png" alt="Logo" className="logoTesto-logout" />

      <div className="back-button-logout" onClick={() => window.history.back()}>
        TORNA INDIETRO
      </div>
    </div>
  );
};

export default LogoutModal;