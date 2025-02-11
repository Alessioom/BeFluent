import React, { useState } from 'react';
import './CambioPsw.css';
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";
import NavButton from "../Components/UI/NavButton";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const CambioPsw = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleBack = () => {
    navigate(-1); // Navigate back one step in history
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Le password non coincidono!');
      return;
    }

    try {
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
        setError(errorData.error || 'Errore durante il cambio della password');
        return; // Esci dalla funzione se c'è un errore
      }
    
      const data = await response.json();
      console.log('Risposta dal server:', data);
    
     // Se la password è cambiata con successo, naviga alla pagina del profilo
     if (response.status === 200) {
      navigate('/Home/Specialista');
    }
  } catch (error) {
      console.error('Errore di rete o altro:', error);
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
        <NavButton to="/report" className="report-button" text="REPORT" />
        <NavButton to="/Impostazioni" className="settings-button-elenco" text="IMPOSTAZIONI" />
        <NavButton to="/Strumenti" className="strumenti-button" text="STRUMENTI" />
        <NavButton to="/Logout" className="logout-button-elenco" text="LOGOUT" />
      </div>

      <div className="back-button-container">
        <BackButton onClick={handleBack} />
      </div>

      <div className="container-cambio">
        <div className="title-cambio">CAMBIO PASSWORD</div>

        {error && <p className="error">{error}</p>}

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
