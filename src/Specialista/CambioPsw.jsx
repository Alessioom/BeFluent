import React from 'react';
import './CambioPsw.css';
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";
import NavButton from "../Components/UI/NavButton";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const CambioPsw = () => {
    const handleBack = () => {
        navigate(-1); // Navigate back one step in history
      };
    


  return (
    <div>
      <LogoProfile 
        logoSrc="/BeFluent_logo_testo.png"
        profileSrc="/iconaDottore.png"
        logoClass="logoTesto-registrazioneSpecialista"
        profileClass="logoDottore-registrazioneSpecialista"
      />

    <div className="container-cambio">
      <div className="background-cambio" />
      <div className="title-cambio">CAMBIO PASSWORD</div>

      <div className="label-cambio">vecchia password</div>
      <div className="input-cambio" />

      <div className="label-cambio">nuova password</div>
      <div className="input-cambio" />

      <div className="label-cambio">conferma password</div>
      <div className="input-cambio" />

      <div className="button-container">
        <div className="button-cambio">CONFERMA</div>


        <div className="navigation-buttons">
          <NavButton to="/Home/Specialista" className="home-button" text="HOME" />
          <NavButton to="/Elenco/Bambini" className="bambini-button" text="BAMBINI" /> 
          <NavButton to="/report" className="report-button" text="REPORT" />
          <NavButton to="/Impostazioni" className="settings-button-elenco" text="IMPOSTAZIONI" />
          <NavButton to="/Strumenti" className="strumenti-button" text="STRUMENTI" />
          <NavButton to="/Logout" className="logout-button-elenco" text="LOGOUT" />
        </div>

        <div className="back-button-container">
          <BackButton onClick={handleBack} />  
          </div>
      </div>
    </div>
    </div>
  );
};

export default CambioPsw;
