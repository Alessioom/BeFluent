import React from 'react';
import './Logout.css';
import { useNavigate } from 'react-router-dom';
import LogoProfile from "../Components/UI/LogoProfile";
import { useAuth } from '../Accesso/AuthContext'; // Importa il contesto di autenticazione

const Logout = () => {

  const { logout } = useAuth(); // 👈 Funzione di logout dal contesto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Chiamata funzione di logout per rimuovere il token
    navigate('/');
  };


  return (
    <div>
      <LogoProfile 
        logoSrc="/BeFluent_logo_testo.png"
        profileSrc="/iconaDottore.png"
        logoClass="logoTesto-registrazioneSpecialista"
        profileClass="logoDottore-registrazioneSpecialista"
      />
     

      <div className="logout-container">
        <div className="background" />
        <div className="logout-message">SEI SICURO DI VOLER USCIRE?</div>
        <div className="logout-button"  onClick={handleLogout}>
          <div className="button-border" />
          <div className="button-text-logout">LOGOUT</div>
        </div>


        <div className="back-button-logout" onClick={() => window.history.back()}>
          TORNA INDIETRO
        </div>
      </div>
    </div>
  );
};

export default Logout;