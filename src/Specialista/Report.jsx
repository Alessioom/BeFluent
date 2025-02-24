import React, { useState } from 'react';
import './Report.css';
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";
import NavButton from "../Components/UI/NavButton";
import { useNavigate, useParams, Link } from 'react-router-dom';

const Report = () => {
    const navigate = useNavigate();
    const { id } = useParams();  // ID per riferimento, se necessario

    // Stati locali per l'input e i messaggi
    const [reportText, setReportText] = useState("");
    const [objectValue, setObjectValue] = useState("Mario Rossi"); // Valore di default, modificabile
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);


    const handleReportChange = (event) => {
        setReportText(event.target.value);
    }

    const handleObjectChange = (event) => {
        setObjectValue(event.target.value);
    };


    // Simulazione dell'invio del report (senza chiamata API)
    const handleSendReport = () => {
        setSuccessMessage(null); //Azzera messaggi precedenti
        setError(null);

        if (!reportText.trim()) {
            setError("Inserisci del testo nel report.");
            return;
        }

        // Simulazione di un invio andato a buon fine
        setSuccessMessage("Report inviato con successo! (Simulato)");
        setReportText(""); // Svuota l'area di testo
    };


    // Dati statici per il titolo (simulazione)
     const titleContent = "Bambino: Mario Rossi";


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

            <BackButton onClick={() => navigate("/Pagina/Bambino")} />

            <div className="report-container">
                <h1 className="report-title">{titleContent}</h1>

                <div className="child-info">
                <span className="label">OGGETTO</span>
                <input
                    type="text"
                    className="child-name-input"
                    value={objectValue}
                    onChange={handleObjectChange}
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
                {/* Visualizza messaggio di successo/errore */}
                {successMessage && <div className="success-message">{successMessage}</div>}
                {error && <div className="error-message">{error}</div>}
                <button className="send-report-button" onClick={handleSendReport}>INVIA REPORT</button>
                <Link to={`/Registro/Report/${id}`} className="view-reports-button">
                    VISUALIZZA REGISTRO REPORT
                </Link>
            </div>
        </div>
    );
};

export default Report;