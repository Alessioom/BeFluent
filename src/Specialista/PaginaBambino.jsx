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
        // Funzione per gestire la modifica del bambino
        console.log("Modifica bambino con ID:", id);
        // Naviga alla pagina di modifica del bambino
        navigate(`/modificaBambino/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/bambino/${id}`);
            console.log("Bambino eliminato");
            // Reindirizza alla pagina elenco bambini dopo l'eliminazione
            navigate("/Elenco/Bambini");
        } catch (error) {
            console.error("Errore nell'eliminazione del bambino:", error);
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
                                <button onClick={() => handleEdit(bambino._id)}>Modifica</button>
                                <button onClick={() => handleDelete(bambino._id)}>Elimina</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaginaBambino;