import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeSpecialista.css'; 
import { Link, useNavigate } from 'react-router-dom';
import BackButton from "../Components/UI/BackButton-ui";
import NavButton from "../Components/UI/NavButton";
import LogoProfile from "../Components/UI/LogoProfile";
import { useAuth } from '../Accesso/AuthContext';

function HomeSpecialista() {
  const [nomeSpecialista, setNomeSpecialista] = useState(""); 
  const [sessoSpecialista, setSessoSpecialista] = useState(""); // Stato per memorizzare il sesso dello specialista
  const navigate = useNavigate();
  const { auth } = useAuth(); // Usa useAuth per accedere al contesto


  useEffect(() => {
     //Accedi direttamente:
     const specialistaId = auth?.specialistaId;
     const token = auth?.token;

     console.log('ID dello specialista:', specialistaId); // Debug: OK qui
     console.log('Token:', token);                 // Debug: OK qui


    if (!specialistaId || !token) {
      console.error('ID dello specialista o token non validi');
      navigate("/Login/Specialista/Form");
      return;
    }
 
  // Recupera i dati dello specialista con axios
  axios.get(`http://localhost:5000/specialista/${specialistaId}`, {
    headers: {
      'Authorization': `Bearer ${token}`, // Aggiungi il token nell'header della richiesta
    }
    
  })
    .then((response) => {
      setNomeSpecialista(response.data.nome); // Imposta il nome dello specialista
      setSessoSpecialista(response.data.sesso); // Imposta il sesso dello specialista
      
    })
    .catch((err) => {
      console.error("Si è verificato un errore:", err);
      navigate('/Login/Specialista/Form'); //In caso di errore riporta al login
    });
}, [auth, navigate]); // auth, navigate come dipendenza



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
      <NavButton to="/Impostazioni" className="settings-button-elenco" text="IMPOSTAZIONI" />
      <NavButton to="#" className="strumenti-button" text="STRUMENTI" onClick={() => alert("Pagina in fase di implementazione!")} />
      <NavButton to="/Logout" className="logout-button-elenco" text="LOGOUT" />

      <BackButton />


      {/* testo befluent */}
      <img src="/BeFluent_logo_testo.png" alt="Logo" className="logoTesto-homeS" />
       
    </div>
  </div>
</div>
  );
}
export default HomeSpecialista;