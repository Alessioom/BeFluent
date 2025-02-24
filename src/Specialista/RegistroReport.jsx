import React, { useState } from 'react';
import './RegistroReport.css';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";
import NavButton from "../Components/UI/NavButton";

const RegistroReport = () => {
    const { id } = useParams(); // Ottieni l'ID (puoi usarlo per scopi di visualizzazione)
    const navigate = useNavigate();

    // Stato locale per i dati (simulati) dei report e delle info bambino
    const [reports, setReports] = useState([
        { oggetto: "Valutazione Iniziale", data: "2024-01-15", testo: "Il bambino mostra buone capacità di comprensione ma ha difficoltà nell'espressione verbale." },
        { oggetto: "Seduta di Logopedia", data: "2024-01-22", testo: "Progressi significativi nella pronuncia di parole bisillabiche." },
        { oggetto: "Verifica Intermedia", data: "2024-02-05", testo: "Il bambino riesce a formulare frasi semplici.  Necessario continuare il lavoro sulla strutturazione delle frasi complesse." }
    ]);
    const [childInfo, setChildInfo] = useState({ nome: 'Mario', cognome: 'Rossi', ID: id }); // Usa l'ID


    const handleBack = () => {
        navigate(-1);
    }



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
                <NavButton to="/Logout" className="logout-button" text="LOGOUT" />
            </div>

            <BackButton onClick={handleBack} />

            <div className="registro-report-container">
                <h1>Registro Report di {childInfo.nome} {childInfo.cognome} (ID: {childInfo.ID})</h1>

                <div className="report-list-wrapper">
                    {reports.length === 0 ? (
                        <p>Nessun report presente per questo bambino.</p>
                    ) : (
                        <ul className="report-list">
                            {reports.map((report, index) => (
                                <li key={index} className="report-item">
                                    <p><strong>Oggetto:</strong> {report.oggetto}</p>
                                    <p><strong>Data:</strong> {report.data ? new Date(report.data).toLocaleDateString() : 'Data non disponibile'}</p>
                                    <p><strong>Report:</strong></p>
                                    <div className='report-text-container'><p className='report-text'>{report.testo}</p></div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegistroReport;