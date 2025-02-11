import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeSpecialista.css'; 
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BackButton from "../Components/UI/BackButton-ui";
import NavButton from "../Components/UI/NavButton";
import LogoProfile from "../Components/UI/LogoProfile";
import { useParams } from 'react-router-dom';
//import Specialista from '../../backend/models/Specialista';
import { useAuth } from '../Accesso/AuthContext';

function HomeSpecialista() {
  const { specialistaId } = useParams(); // Recupera lo specialistaId dai parametri della route
  console.log(specialistaId);
  const [nomeSpecialista, setNomeSpecialista] = useState(""); 
  const [sessoSpecialista, setSessoSpecialista] = useState(""); // Stato per memorizzare il sesso dello specialista
  const navigate = useNavigate();
  const [bambini, setBambini] = useState([]); // Stato per memorizzare i bambini
  const { auth } = useAuth(); // Usa useAuth per accedere al contesto
  const [loading, setLoading] = useState(true); // Stato di caricamento
  const token = auth?.token;

  const handleBack = () => {
    navigate(-1); // Navigate back one step in history
  };

  useEffect(() => {
    if (!specialistaId) {
      console.error('ID dello specialista non valido');
      setLoading(false);
      return;
    }
 
  // Recupera i dati dello specialista e dei bambini con axios
  axios.get(`http://localhost:5000/specialista/${specialistaId}`, {
    headers: {
      'Authorization': `Bearer ${token}`, // Aggiungi il token nell'header della richiesta
    }
  })
    .then((response) => {
      setNomeSpecialista(response.data.nome); // Imposta il nome dello specialista
      setSessoSpecialista(response.data.sesso); // Imposta il sesso dello specialista
      return axios.get(`http://localhost:5000/bambini/${specialistaId}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Aggiungi il token anche per questa richiesta
        }
      });
    })
    .then((response) => {
      setBambini(response.data); // Imposta i dati dei bambini
      setLoading(false); // Dati caricati, quindi aggiorniamo lo stato di caricamento
    })
    .catch((err) => {
      console.error("Si è verificato un errore:", err);
      setLoading(false); // Termina il caricamento in caso di errore
    });
}, [specialistaId, token]);

if (loading) {
  return <div>Caricamento in corso...</div>; // Visualizza un messaggio di caricamento mentre i dati vengono recuperati
}

// Logica per il saluto personalizzato
const saluto = sessoSpecialista === 'maschio' 
? `Benvenuto dott. ${nomeSpecialista}` 
: `Benvenuta dott.ssa ${nomeSpecialista}`;

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
          {saluto} {/* Visualizza il saluto personalizzato */}
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