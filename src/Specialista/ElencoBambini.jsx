import React, { useState, useEffect, useCallback } from 'react';
import './ElencoBambini.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BackButton from "../Components/UI/BackButton-ui";
import NavButton from "../Components/UI/NavButton";
import LogoProfile from "../Components/UI/LogoProfile";

function ElencoBambini() {
  const [bambini, setBambini] = useState([]);
  const [key, setKey] = useState(0); // Aggiungiamo una chiave per forzare il rimontaggio della route

    // Fetch the list of children from your API or data source
    useEffect(() => {
        const fetchBambini = async () => {
          try {
            // Simuliamo i dati se il backend non è pronto
            const data = [
              { id: 1, nome: 'Luca Bianchi', eta: 8 },
              { id: 2, nome: 'Giulia Rossi', eta: 10 }
            ];
            // Quando il backend sarà pronto, usa:
            // const response = await fetch('/api/bambini');
            // const data = await response.json();
            setBambini(data);
          } catch (error) {
            console.error('Errore nel recupero dei bambini:', error);
          }
        };

    fetchBambini();
  }, []);

 
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Rileva la posizione attuale della rotta

  const handleBack = () => {
    navigate(-1); // Navigate back one step in history
  };

  const handleBambiniClick = (e) => {
    e.preventDefault();  // Impediamo la navigazione predefinita
  
    // Controlliamo se siamo già sulla pagina /Elenco/Bambini
    if (location.pathname === '/Elenco/Bambini') {
      // Cambiamo il percorso aggiungendo una "chiave" unica come parametro di query
      navigate('/Elenco/Bambini?refresh=' + new Date().getTime(), { replace: true });
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

      <div className="elenco-bambini">
      <div className="header">
        {/* Your header content here */}
        <div className="title-elenco-bambini">ELENCO BAMBINI</div>
        {/* Other header elements like Home, Report, Logout */}
      </div>

      <div className="main-content">
        <div className="children-list-elenco-bambini">
          <h2>Qui ci sono tutti i bambini seguiti:</h2>
          <ul>
          {bambini.length > 0 ? (
              bambini.map((bambino) => (
                <li key={bambino.id} className="child-item-elenco-bambini">
                  <div className="child-name-elenco-bambini">{bambino.nome}</div>
                </li>
              ))
            ) : (
              <p>Nessun bambino trovato.</p>
            )}
          </ul>
        </div>

        <div className="add-child-button-elenco-bambini">
          <button>AGGIUNGI BAMBINO</button>
        </div>

        <div className="navigation-buttons">
          <NavButton to="/Home/Specialista" className="home-button" text="HOME" />
          <NavButton to="/Elenco/Bambini" className="bambini-button" text="BAMBINI" onClick={handleBambiniClick } /> 
          <NavButton to="/report" className="report-button" text="REPORT" />
          <NavButton to="/Impostazioni" className="settings-button-elenco" text="IMPOSTAZIONI" />
          <NavButton to="/Strumenti" className="home-button" text="STRUMENTI" />
          <NavButton to="/Logout" className="logout-button-elenco" text="LOGOUT" />
        </div>
        <BackButton onClick={handleBack} /> {/* Add the BackButton component */}
        <BackButton onClick={handleBack} /> {/* Add the BackButton component */}
      </div>
    </div>
  </div>
  );
}
export default ElencoBambini;



