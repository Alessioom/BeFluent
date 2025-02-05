import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import './Impostazioni.css';
import BackButton from "../Components/UI/BackButton-ui";
import NavButton from "../Components/UI/NavButton";
import LogoProfile from "../Components/UI/LogoProfile";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  // Stato per i dati utente e la modalità di modifica
  const [userData, setUserData] = useState({
    nome: "Vito",
    cognome: "Piccolini",
    email: "vito@example.com",
    telefono: "1234567890",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Gestisce le modifiche agli input
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };


  // Stato per gestire l'attivazione/disattivazione delle notifiche
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  // Funzione per gestire il cambiamento della checkbox
  const handleNotificationChange = (event) => {
    setIsNotificationEnabled(event.target.checked);
  };


  return (
    <div>
      <div className="settings-container-imp">
        <h2>PROFILO</h2>
        <hr className="profile-line" />
        <div className="inputs-container-imp">
          {["nome", "cognome", "email", "telefono"].map((field) => (
            <div key={field}>
              <label className="field-label-imp">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                name={field}
                value={userData[field]}
                onChange={handleChange}
                disabled={!isEditing} // Disabilitato se non in modalità modifica
                className="input-box-imp"
              />
            </div>
          ))}
        </div>

        <div className="bottom-buttons-imp">
          {isEditing ? (
            <button onClick={() => setIsEditing(false)} className="save-button-imp">Salva</button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="edit-button-imp">Modifica</button>
          )}
        </div>
      </div>
      
      {/* Logo posizionato a destra in modo assoluto */}
      <div>
      <LogoProfile 
        logoSrc="/BeFluent_logo_testo.png"
        profileSrc="/iconaDottore.png"
        logoClass="logoTesto-registrazioneSpecialista"
        profileClass="logoDottore-registrazioneSpecialista"
      />
      </div>

      <div className="body-imp">
        <div className="background-box-imp" />
        <div className="content-container">
          <div className="form-container">
            
          </div>
        </div>
           
            {/* Container separato per le preferenze, notifiche, lingua e cancella account */}
            <div className="preferences-container-imp">
            <h3 className="preferences-header">PREFERENZE</h3>
            <hr className="preferences-line" />

            {/* Contenitore flex per i pulsanti "CANCELLA ACCOUNT" e "CAMBIA PASSWORD" */}
            <div className="buttons-container-imp">
            <div className="change-password-container-imp">CAMBIA PASSWORD</div>
            <div className="delete-account-container-imp">CANCELLA ACCOUNT</div>
            </div>

            <div className="notification-label">Notifiche</div>
            <div className="notification-toggle-container">
              <label className="notification-toggle">
                <input
                  type="checkbox"
                  checked={isNotificationEnabled}  // Stato per la spunta (true/false)
                  onChange={handleNotificationChange} // Gestore dell'evento di cambio
                />
                <div className="notification-circle" />
              </label>
            </div>        
            </div>
            <div className="language-label">Lingua</div>
            <div className="language-box-imp">ITALIANO</div>   
          </div>
        <BackButton onClick={handleBack} />
        
        <div className="navigation-buttons">
          <NavButton to="/Home/Specialista" className="home-button" text="HOME" />
          <NavButton to="/Elenco/Bambini" className="bambini-button" text="BAMBINI" />
          <NavButton to="/report" className="report-button" text="REPORT" />
          <NavButton to="/Logout" className="logout-button-elenco" text="LOGOUT" />
          <NavButton to="/Impostazioni" className="settings-button-elenco" text="IMPOSTAZIONI" />
          <NavButton to="/Strumenti" className="strumenti-button" text="STRUMENTI" />
          <div className="footer-bar-imp" />
        </div>
      </div>
  );
};

export default ProfilePage;


