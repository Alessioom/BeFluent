import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import './Impostazioni.css';
import BackButton from "../Components/UI/BackButton-ui";
import NavButton from "../Components/UI/NavButton";
import LogoProfile from "../Components/UI/LogoProfile";
import jwt_decode from 'jwt-decode';




const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
  });

  const [specialistaId, setSpecialistaId] = useState(null); // Stato per specialistaId

  // Recupera il token e decodifica in un useEffect
  useEffect(() => {
    const token = localStorage.getItem('token');  // Recupera il token dal localStorage
    if (token) {
      const decodedToken = jwt_decode(token);  // Decodifica il token
      console.log(decodedToken);  // Log del contenuto del token per vedere la struttura
      setSpecialistaId(decodedToken.id);  // Imposta specialistaId dallo stato
    }
  }, []);  // Questo useEffect viene eseguito solo una volta all'inizio

  useEffect(() => {
    if (specialistaId) {
      axios
        .get(`http://localhost:5000/specialista/${specialistaId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Passa il token nell'header
          }
        })
        .then((response) => {
          // Assicurati che i dati siano sempre valorizzati, anche se vuoti
          setUserData({
            nome: response.data.nome || "",
            cognome: response.data.cognome || "",
            email: response.data.email || "",
            telefono: response.data.telefono || "",
          });
        })
        .catch((error) => console.error("Errore nel caricamento dei dati:", error));
    }
  }, [specialistaId]);  // Esegui questa richiesta solo se specialistaId è valido

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value || "" });
  };

  const handleSave = () => {
    console.log("Dati inviati per l'aggiornamento:", userData);
    axios
  .put(`http://localhost:5000/specialista/update/${specialistaId}`, userData, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Passa il token nell'header anche per l'update
    }
  })
  .then((response) => {
    console.log('Risposta dell\'aggiornamento:', response.data);
    setUserData(response.data.specialista);  // Risultato del profilo aggiornato
    setIsEditing(false);
    alert("Profilo aggiornato con successo!");
  })
  .catch((error) => console.error("Errore nell'aggiornamento:", error));
  };


  const handleBack = () => {
    navigate(-1);
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
          <button
            onClick={() => setIsEditing(true)}
            className={`edit-button-imp ${!isEditing ? 'active' : ''}`} // Aggiungi la classe 'active' solo quando non è in modalità modifica
          >
            Modifica
          </button>
          <button
            onClick={() => {
              setIsEditing(false); 
              handleSave(); // Aggiungi la logica per salvare i dati quando clicchi su Salva
            }}
            className={`save-button-imp ${isEditing ? 'active' : ''}`} // Aggiungi la classe 'active' solo quando sei in modalità modifica
          >
            Salva
          </button>
        </div>
      </div>
      

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
           
            {/*Container separato per le preferenze, notifiche, lingua e cancella account */} 
            <div className="preferences-container-imp">
            <h3 className="preferences-header">PREFERENZE</h3>
            <hr className="preferences-line" />

            {/* Contenitore flex per i pulsanti "CANCELLA ACCOUNT" e "CAMBIA PASSWORD"  */} 
            <div className="buttons-container-imp">
            <Link to="/Cambio/Psw">
            <div className="button change-password-container-imp">
            <div className="button-text">CAMBIA PASSWORD</div>
            </div>
            </Link>
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
          <NavButton to="/Impostazioni" className="settings-button-elenco" text="IMPOSTAZIONI" />
          <NavButton to="/Strumenti" className="strumenti-button" text="STRUMENTI" />
          <NavButton to="/Logout" className="logout-button-elenco" text="LOGOUT" />
          <div className="footer-bar-imp" />
        </div>
      </div>
  );
};

export default ProfilePage;
