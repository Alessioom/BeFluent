import React from 'react';
import './HomeSpecialista.css'; 
import { Link } from 'react-router-dom';

function HomeSpecialista() {
  const nomeSpecialista = 'Mario Rossi'; // Sostituisci con il nome dello specialista

  //per ricaricare la pagina cliccando il pulsante "Home"
  const handleHomeClick = () => {
    window.location.reload();
  };

  return (
    <div className="home-specialista-container">

      <div className="welcome-text">
        Benvenuto/a dott./ssa {nomeSpecialista}
      </div>

    

      <Link to="/Elenco/Bambini"> 
        <div className="button elenco-completo-button">
          <div className="button-text">ELENCO COMPLETO</div>
        </div>
      </Link>

      <div className="navigation-buttons">
        <Link to="/Home/Specialista" onClick={(e) => { e.preventDefault(); window.location.reload(); }}>
          <div className="nav-button home-button">
            <div className="button-text">HOME</div>
          </div>
        </Link>
        <Link to="/Elenco/Bambini"> 
          <div className="nav-button bambini-button">
            <div className="button-text">BAMBINI</div>
          </div>
        </Link>
        <Link to="/report"> {/* Sostituisci con il percorso corretto */}
          <div className="nav-button report-button">
            <div className="button-text">REPORT</div>
          </div>
        </Link>
        <Link to="/Logout"> 
          <div className="nav-button logout-button-home">
            <div className="button-text">LOGOUT</div>
          </div>
        </Link>
        <Link to="/Impostazioni"> 
          <div className="settings-button">
            <div className="button-text">IMPOSTAZIONI</div>
          </div>
        </Link>
        <Link to="/strumenti"> {/* Sostituisci con il percorso corretto */}
          <div className="strumenti-button">
            <div className="button-text">STRUMENTI</div>
          </div>
        </Link>
      </div>

      {/* Profile Image (iconaDottore.png) */}
      <img src="/iconaDottore.png" alt="Dottore" className="profile-image-homeS" />
      

     

      {/* testo befluent */}
    <img src="/BeFluent_logo_testo.png" alt="Logo" className="logoTesto-homeS" />
       
    </div>
  );
}

export default HomeSpecialista;