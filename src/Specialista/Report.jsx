import React, { useState, useEffect } from 'react';
import './Report.css';
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";
import NavButton from "../Components/UI/NavButton";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Report = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [reportText, setReportText] = useState("");
    const [initialChildInfo, setInitialChildInfo] = useState(null); // Inizializza a null
    const [objectValue, setObjectValue] = useState(""); // Manteniamo, ma con una modifica
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleReportChange = (event) => {
        setReportText(event.target.value);
    }

    const handleSendReport = () => {
        alert("Funzionalità di invio in fase di implementazione!\nReport: " + reportText);
    }

    const handleObjectChange = (event) => {
        setObjectValue(event.target.value); // Serve ancora se vuoi permettere modifiche *locali*
    };

    useEffect(() => {
        const fetchChildInfo = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:5000/bambino/${id}`); // Usa axios, URL relativo va bene
                console.log("Dati ricevuti dall'API:", response.data);
                const data = response.data;
                setInitialChildInfo(data);  // Imposta *TUTTI* i dati del bambino
                setObjectValue(`${data.nome || ''} ${data.cognome || ''}`);


            } catch (error) {
                setError(error.message);
                console.error("Errore nel recupero:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchChildInfo();
    }, [id]);



     // Usa una variabile (o costante) per il titolo, invece di una funzione
     let titleContent;

     if (loading) {
         titleContent = "Caricamento...";
     } else if (error) {
         titleContent = "Errore nel caricamento dei dati.";
     } else if (!initialChildInfo) {
         titleContent = "Pagina di..."; // Fallback
     } else {
         let titolo = " ";
         if (initialChildInfo.sesso === 'Maschio') {
             titolo += "Bambino: ";
         } else if (initialChildInfo.sesso === 'Femmina') {
             titolo += "Bambina: ";
         } else {
             titolo += "di ";
         }
         titolo += `${initialChildInfo.nome || ''} ${initialChildInfo.cognome || ''}`;
         titleContent = titolo;
     }
    


    if (loading) {
        return <div>Caricamento...</div>; // Gestione del caricamento
    }

    if (error) {
        return <div>Errore: {error}</div>; // Gestione degli errori
    }
      if (!initialChildInfo) {
        return <div>Dati non disponibili</div>; //  ulteriore controllo, si attiva se c'è un errore nella chiamata API
    }

    console.log("Valore dell'oggetto prima del rendering:", objectValue); // Debug

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
                <NavButton to="/Logout" className="logout-button" text="LOGOUT" />
            </div>

            <BackButton onClick={() => navigate("/Pagina/Bambino")} /> 

            <div className="report-container">
                {/* Usa la variabile titleContent */}
                <h1 className="report-title">{titleContent}</h1>

                <div className="child-info">
                <span className="label">OGGETTO</span>
                <input
                    type="text"
                    className="child-name-input"
                    value={objectValue}
                    onChange={(e) => setObjectValue(e.target.value)} 
                />
            </div>
                <div className="report-section">
                    <span className="label">REPORT</span>
                    <textarea
                        className="report-textarea"
                        placeholder="Scrivi qui il tuo report..."
                        value={reportText}
                        onChange={handleReportChange}
                    />
                </div>

                <button className="send-report-button" onClick={handleSendReport}>INVIA REPORT</button>
            </div>
        </div>
    );
};

export default Report;