import React, { useState, useEffect } from 'react';
import './HomeSpecialista.css'; 
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BackButton from "../Components/UI/BackButton-ui";
import NavButton from "../Components/UI/NavButton";
import LogoProfile from "../Components/UI/LogoProfile";

function HomeSpecialista() {
  const nomeSpecialista = 'Mario Rossi'; // Sostituisci con il nome dello specialista
  const navigate = useNavigate(); // Initialize useNavigate


  const handleBack = () => {
    navigate(-1); // Navigate back one step in history
  };



  return (
    <div>
      {/* Logo posizionato a destra in modo assoluto */}
    <LogoProfile 
      logoSrc="/BeFluent_logo_testo.png"
      profileSrc="/iconaDottore.png"
      logoClass="logoTesto-registrazioneSpecialista"
      profileClass="logoDottore-registrazioneSpecialista"
    />

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
      <NavButton to="/Home/Specialista" className="home-button" text="HOME" />
      <NavButton to="/Elenco/Bambini" className="bambini-button" text="BAMBINI" /> 
      <NavButton to="/report" className="report-button" text="REPORT" />
      <NavButton to="/Impostazioni" className="settings-button-elenco" text="IMPOSTAZIONI" />
      <NavButton to="/Strumenti" className="strumenti-button" text="STRUMENTI" />
      <NavButton to="/Logout" className="logout-button-elenco" text="LOGOUT" />
      <BackButton onClick={handleBack} /> {/* Add the BackButton component */}


      {/* testo befluent */}
      <img src="/BeFluent_logo_testo.png" alt="Logo" className="logoTesto-homeS" />
       
    </div>
  </div>
</div>
  );
}
export default HomeSpecialista;