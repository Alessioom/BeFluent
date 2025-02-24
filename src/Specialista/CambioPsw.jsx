import React, { useState, useEffect } from 'react';
import './CambioPsw.css';
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";
import NavButton from "../Components/UI/NavButton";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Accesso/AuthContext';
import axios from 'axios';

const CambioPsw = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [connectionError, setConnectionError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const { login } = useAuth(); // Ottieni la funzione login
  

  const handleBack = () => {
    navigate(-1); // Navigate back one step in history
  };


  //  Funzione di validazione della password (la stessa per la registrazione)
  const validatePassword = (password) => {
    if (password.length < 8) {
        return "La password deve contenere almeno 8 caratteri.";
    }
    if (!/[a-z]/.test(password)) {
        return "La password deve contenere almeno un carattere minuscolo.";
    }
    if (!/[A-Z]/.test(password)) {
        return "La password deve contenere almeno un carattere maiuscolo.";
    }
    if (!/[0-9]/.test(password)) {
        return "La password deve contenere almeno un numero.";
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
        return "La password deve contenere almeno un carattere speciale.";
    }
    return null; // Nessun errore
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resetting previous errors
    setPasswordError('');
    setConnectionError('');
    setGeneralError('');

    // ✅ Validazione della password PRIMA della richiesta
  const validationError = validatePassword(newPassword);
  if (validationError) {
    setPasswordError(validationError);
    return;
  }

  if (newPassword !== confirmPassword) {
    setPasswordError('Le password non coincidono!');
    return;
  }

    try {
      console.log('Token prima del cambio password:', localStorage.getItem('token'));
      const response = await fetch('http://localhost:5000/specialista/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Aggiungi token JWT
        },
        body: JSON.stringify({         
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Errore durante la richiesta:', errorData);

        // Gestione errori specifici
        if (response.status === 400) {
          setPasswordError(errorData.error || 'Errore nella validazione della password');
        } else {
          setGeneralError(errorData.error || 'Errore durante il cambio della password');
        }
        return; // Esci dalla funzione se c'è un errore
      }
  
      const data = await response.json();
      console.log('Risposta dal server:', data);

      // ✅ Se il server restituisce un nuovo token, aggiorniamolo
    if (data.token) {
      localStorage.setItem('token', data.token);
      login(data.token, data.specialistaId); // Aggiorna il contesto di autenticazione
    }
     
    navigate('/Home/Specialista'); 


  } catch (error) {
    // ... (gestione degli errori di rete)
      console.error('Errore di rete o altro:', error);
      setConnectionError('Errore di connessione. Riprova più tardi.');
  }
};
  return (
    <div>
      <LogoProfile
        logoSrc="/BeFluent_logo_testo.png"
        profileSrc="/iconaDottore.png"
        logoClass="logoTesto-registrazioneSpecialista"
        profileClass="logoDottore-registrazioneSpecialista"
      />

      <div className="navigation-buttons">
        <NavButton to="/Home/Specialista" className="home-button" text="HOME" />
        <NavButton to="/Elenco/Bambini" className="bambini-button" text="BAMBINI" />
        <NavButton to="/Impostazioni" className="settings-button-elenco" text="IMPOSTAZIONI" />
        <NavButton to="#" className="strumenti-button" text="STRUMENTI" onClick={() => alert("Pagina in fase di implementazione!")} />
        <NavButton to="/Logout" className="logout-button-elenco" text="LOGOUT" />
      </div>

      <div className="back-button-container">
        <BackButton onClick={handleBack} />
      </div>

      <div className="container-cambio">
        <div className="title-cambio">CAMBIO PASSWORD</div>

        {/* Visualizzazione degli errori */}
        {passwordError && <p className="error">{passwordError}</p>}
        {connectionError && <p className="error">{connectionError}</p>}
        {generalError && <p className="error">{generalError}</p>}

        <form onSubmit={handleSubmit}>
          <div className="field-cambio">
            <label className="label-cambio">Vecchia password</label>
            <input
              type="password"
              className="input-cambio"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className="field-cambio">
            <label className="label-cambio">Nuova password</label>
            <input
              type="password"
              className="input-cambio"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="field-cambio">
            <label className="label-cambio">Conferma password</label>
            <input
              type="password"
              className="input-cambio"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button-cambio">CONFERMA</button>
        </form>
      </div>
    </div>
  );
};

export default CambioPsw;
