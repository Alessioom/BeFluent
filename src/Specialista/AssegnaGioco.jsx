import React, { useState } from 'react';
import './AssegnaGioco.css';
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";
import NavButton from "../Components/UI/NavButton";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';


const AssegnaGioco = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const nomeBambino = searchParams.get('nome') || '';
    const cognomeBambino = searchParams.get('cognome') || '';

    const [tipoGioco, setTipoGioco] = useState('');  // 'completamento', 'associazione', 'domandaRisposta'
    const [difficolta, setDifficolta] = useState(''); // 'facile', 'medio', 'difficile'
    const [titolo, setTitolo] = useState('');
    const [domanda, setDomanda] = useState('');
    const [rispostaVera, setRispostaVera] = useState('');
    const [risposta2, setRisposta2] = useState('');
    const [risposta3, setRisposta3] = useState(''); // Aggiunta risposta 3
    const [risposta4, setRisposta4] = useState(''); // Aggiunta risposta 4
    const navigate = useNavigate();

    const handleTipoGiocoChange = (tipo) => {
        setTipoGioco(tipo);
    };

    const handleDifficoltaChange = (diff) => {
        setDifficolta(diff);
    };

    const handleSalvaGioco = () => {
        // Validazione (assicurati che tutti i campi obbligatori siano compilati)
        if (!tipoGioco || !difficolta || !titolo || !domanda || !rispostaVera) {
            alert('Compila tutti i campi obbligatori.');
            return;
        }

        // Costruisci l'oggetto con i dati del gioco
        const nuovoGioco = {
            bambinoId: id,
            nomeBambino,
            cognomeBambino,
            tipoGioco,
            difficolta,
            titolo,
            domanda,
            rispostaVera,
            risposta2,
            risposta3,  // Includi le nuove risposte
            risposta4,
        };

        console.log('Nuovo gioco:', nuovoGioco);

        // Sostituisci con la TUA chiamata API (axios.post)
        // axios.post('/api/giochi', nuovoGioco)
        //     .then(response => {
        //         console.log('Gioco salvato:', response.data);
        //         alert('Gioco salvato con successo!');
        //         navigate(`/bambino/${id}`); // Torna alla pagina del bambino
        //     })
        //     .catch(error => {
        //         console.error('Errore nel salvataggio del gioco:', error);
        //         alert('Errore nel salvataggio del gioco.');
        //     });
        navigate(`/bambino/${id}`);
    };


    return (
        <>

        <div className="assegna-gioco-container">
            <div className="form-group">
                <label>Tipo di Gioco:</label>
                <div className="button-group">
                    <button
                        className={`tipo-gioco-button ${tipoGioco === 'completamento' ? 'active' : ''}`}
                        onClick={() => handleTipoGiocoChange('completamento')}>
                        Completamento
                    </button>
                    <button
                        className={`tipo-gioco-button ${tipoGioco === 'associazione' ? 'active' : ''}`}
                        onClick={() => handleTipoGiocoChange('associazione')}>
                        Associazione
                    </button>
                    <button
                        className={`tipo-gioco-button ${tipoGioco === 'domandaRisposta' ? 'active' : ''}`}
                        onClick={() => handleTipoGiocoChange('domandaRisposta')}>
                        Domanda/Risposta
                    </button>
                </div>
            </div>

            <div className="form-group">
                <label>Difficoltà:</label>
                <div className="button-group">
                    <button
                        className={`difficolta-button facile ${difficolta === 'facile' ? 'active' : ''}`}
                        onClick={() => handleDifficoltaChange('facile')}>
                        Facile
                    </button>
                    <button
                        className={`difficolta-button medio ${difficolta === 'medio' ? 'active' : ''}`}
                        onClick={() => handleDifficoltaChange('medio')}>
                        Medio
                    </button>
                    <button
                        className={`difficolta-button difficile ${difficolta === 'difficile' ? 'active' : ''}`}
                        onClick={() => handleDifficoltaChange('difficile')}>
                        Difficile
                    </button>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="titolo">Titolo:</label>
                <input
                    type="text"
                    id="titolo"
                    value={titolo}
                    onChange={(e) => setTitolo(e.target.value)}
                    placeholder="Inserisci il titolo del gioco"
                />
            </div>

            <div className="form-group">
                <label htmlFor="domanda">Domanda:</label>
                <input
                    type="text"
                    id="domanda"
                    value={domanda}
                    onChange={(e) => setDomanda(e.target.value)}
                    placeholder="Inserisci la domanda"
                />
            </div>

            <div className="form-group">
                <label htmlFor="rispostaVera">Risposta 1 (Vera):</label>
                <input
                    type="text"
                    id="rispostaVera"
                    value={rispostaVera}
                    onChange={(e) => setRispostaVera(e.target.value)}
                    placeholder="Inserisci la risposta corretta"
                />
            </div>

            <div className="form-group">
                <label htmlFor="risposta2">Risposta 2:</label>
                <input
                    type="text"
                    id="risposta2"
                    value={risposta2}
                    onChange={(e) => setRisposta2(e.target.value)}
                    placeholder="Inserisci una risposta"
                />
            </div>
            <div className="form-group">
                <label htmlFor="risposta3">Risposta 3:</label>
                <input
                    type="text"
                    id="risposta3"
                    value={risposta3}
                    onChange={(e) => setRisposta3(e.target.value)}
                    placeholder="Inserisci una risposta"
                />
            </div>

            <div className="form-group">
                <label htmlFor="risposta4">Risposta 4:</label>
                <input
                    type="text"
                    id="risposta4"
                    value={risposta4}
                    onChange={(e) => setRisposta4(e.target.value)}
                    placeholder="Inserisci una risposta"
                />
            </div>
        
            <button className="salva-gioco-button" onClick={handleSalvaGioco}>Salva Gioco</button>
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
            <NavButton to="/Logout" className="logout-button" text="LOGOUT" />
        </div>


        <BackButton onClick={() => navigate("/Pagina/Bambino")} /> 
        </div>
    </>
    );
};

export default AssegnaGioco;