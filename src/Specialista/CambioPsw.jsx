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
  const [loading, setLoading] = useState(false); // Loader
  const [success, setSuccess] = useState(false); // Modale di successo

  // Funzione di validazione della password (la stessa per la registrazione)
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

    // Validazione della password PRIMA della richiesta
  const validationError = validatePassword(newPassword);
  if (validationError) {
    setPasswordError(validationError);
    return;
  }

  if (newPassword !== confirmPassword) {
    setPasswordError('Le password non coincidono!');
    return;
  }

  setLoading(true); // Mostra il loader

  try {
    const response = await axios.put(
      'http://localhost:5000/specialista/update-password',
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      login(response.data.token, response.data.specialistaId);

      setSuccess(true); // Mostra modale successo
      setTimeout(() => {
        navigate('/Home/Specialista'); // Redirect dopo 3 secondi
      }, 3000);
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        setPasswordError(error.response.data.error || 'Errore nella validazione della password');
      } else {
        setGeneralError(error.response.data.error || 'Errore durante il cambio della password');
      }
    } else {
      setConnectionError('Errore di connessione. Riprova più tardi.');
    }
  } finally {
    setLoading(false); // Nasconde il loader alla fine
  }
};

  return (
    <div>
    {success && (
      <div className="success-modal">
        ✅ Password cambiata con successo!
      </div>
    )}

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

   
        <BackButton />


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

          <button type="submit" className="button-cambio" disabled={loading}>
  {loading ? (
    <>
      Aggiornamento in corso...
      <span className="spinner"></span>
    </>
  ) : 'CONFERMA'}
</button>

        </form>
      </div>
    </div>
  );
};

export default CambioPsw;
