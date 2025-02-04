import React, { useState, useEffect } from 'react';
import './ElencoBambini.css';
import { Link } from 'react-router-dom';

function ElencoBambini() {
  const [bambini, setBambini] = useState([]);

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

  return (
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
        <Link to="/Home/Specialista"> 
          <div className="nav-button-elenco home-button">
            <div className="button-text">HOME</div>
          </div>
        
        </Link>
        <Link to="/report"> {/* Sostituisci con il percorso corretto */}
          <div className="nav-button-elenco report-button">
            <div className="button-text">REPORT</div>
          </div>
        </Link>
        <Link to="/Logout"> {/* Sostituisci con il percorso corretto */}
          <div className="nav-button-elenco logout-button-elenco">
            <div className="button-text">LOGOUT</div>
          </div>
        </Link>
        <Link to="/Impostazioni"> 
          <div className="settings-button-elenco">
            <div className="button-text">IMPOSTAZIONI</div>
          </div>
        </Link>
        <div className="back-button-elenco" onClick={() => window.history.back()}>
          TORNA INDIETRO
        </div>
      </div>
    </div>
  </div>
  );
}

export default ElencoBambini;



