import React from 'react';
import './Logout.css';
import LogoProfile from "../Components/UI/LogoProfile";

const LogoutModal = () => {



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
        <div className="logout-button">
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

export default LogoutModal;