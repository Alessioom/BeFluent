import React, { useState, useEffect } from 'react';
import './PaginaBambino.css';
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";
import NavButton from "../Components/UI/NavButton";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';  

const PaginaBambino = () => {
    const { id } = useParams();  // Ottieni l'ID del bambino dalla rotta
    console.log("ID Bambino:", id); // Verifica che l'ID venga correttamente recuperato
    const [bambino, setBambino] = useState(null);  // Stato per i bambini
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navigate back one step in history
      };

      // Recupera i dettagli del bambino tramite l'ID
      const fetchBambino = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/bambino/${id}`);
            console.log("Risposta API:", response.data);
            setBambino(response.data); // Imposta i dati del bambino nello stato
            setLoading(false);
        } catch (error) {
            console.error("Errore nel recupero dei dati del bambino:", error);
            setError('Impossibile recuperare i dati del bambino');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBambino(); // Chiama la funzione per ottenere i dati quando il componente è montato
    }, [id]); // La dipendenza di "id" assicura che la funzione venga richiamata ogni volta che cambia l'ID
    
      if (loading) return <div>Caricamento...</div>;  // Aggiungi un controllo di caricamento
      if (error) return <div>{error}</div>;  // Gestisci eventuali errori


      const handleEdit = (id) => {
        alert("Funzionalità in fase di implementazione.");
        // Funzione per gestire la modifica del bambino
        console.log("Modifica bambino con ID:", id);
    };

    const handleDelete = async (id) => {
        //  Finestra di conferma *PRIMA* della chiamata API
        if (window.confirm(`Sei sicuro di voler eliminare ${bambino.nome} ${bambino.cognome}?`)) {
            try {
                // Assicurati di includere l'header di autorizzazione anche qui!
                await axios.delete(`http://localhost:5000/bambino/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log("Bambino eliminato");
                navigate("/Elenco/Bambini");
            } catch (error) {
                console.error("Errore nell'eliminazione del bambino:", error);
                // Gestisci l'errore, magari mostrando un messaggio all'utente
                setError("Errore durante l'eliminazione del bambino. Riprova."); // Aggiunto per mostrare l'errore
            }
        }
    };

    // Funzioni per gestire i pulsanti "ASSEGNA GIOCO", "PIANIFICA APPUNTAMENTO", "AGGIUNGI REPORT"
    const handleAssegnaGioco = () => {
        navigate(`/assegna-gioco/${id}`); // Assicurati che la rotta sia corretta
    };

    const handleAggiungiReport = () => {
        navigate(`/Report/${id}`); // Assicurati che la rotta sia corretta
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
        <NavButton to="#" className="strumenti-button" text="STRUMENTI" onClick={() => alert("Pagina in fase di implementazione!")} />
        <NavButton to="/Logout" className="logout-button-elenco" text="LOGOUT" />
      </div>


      <BackButton onClick={() => navigate("/Elenco/Bambini")} /> 
  

        <div className="bambino-container">
      <div className="titolo-bambino"> Benvenuto nella pagina di:</div>
      <div className="informazioni-bambino"> {bambino.nome} {bambino.cognome} </div>
</div>

       {/* Table for displaying bambino data */}
       <div className="bambino-table-container">
                <table className="bambino-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>Data di Nascita</th>
                            <th>Sesso</th>
                            <th>Email Genitore</th>
                            <th>Opzioni</th>
                            {/*<th>Comune di Nascita</th>
                            <th>Comune di Residenza</th>
                            <th>Via di Residenza</th>
                            <th>CAP</th>
                            <th>Numero Cellulare Genitore</th>
                            
                            <th>Azioni</th>*/}
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={bambino._id}>
                            <td>{bambino.nome}</td>
                            <td>{bambino.cognome}</td>
                            <td>{new Date(bambino.dataDiNascita).toLocaleDateString('it-IT')}</td>
                            <td>{bambino.sesso}</td>
                            <td>{bambino.emailGenitore}</td>
                            {/*<td>{bambino.comuneDiNascita}</td>
                            <td>{bambino.comuneDiResidenza}</td>
                            <td>{bambino.viaDiResidenza}</td>
                            <td>{bambino.cap}</td>
                            <td>{bambino.numeroCellulareGenitore}</td>
                            */}
                            <td>
                                {/* Aggiungi pulsanti per modificare e eliminare */}
                                <button className="button-bamb modifica" onClick={() => handleEdit("id_di_esempio")}>Modifica</button>
                                <button className="button-bamb elimina" onClick={() => handleDelete(bambino._id)}>Elimina</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


             {/* Contenitore dei pulsanti modificato */}
             <div className="azioni-bambino-container">
                <div className="pulsanti-raggruppati">
                <Link to={`/Assegna/Gioco/${id}?nome=${bambino.nome}&cognome=${bambino.cognome}`} className="button-bamb assegna-gioco">
                ASSEGNA GIOCO
                </Link>

                <Link to={`/Report/${id}`} className="button-bamb aggiungi-report">
                        REPORT
                    </Link>
                </div>

     <Link to={`/Appuntamenti/${id}?nome=${bambino.nome}&cognome=${bambino.cognome}`} className="button-bamb pianifica-button">
         PIANIFICA APPUNTAMENTO
     </Link>
   </div>
        </div>
    );
};

export default PaginaBambino;