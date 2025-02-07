import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PswDimenticata.css';
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";

const PswDimenticata = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [messaggio, setMessaggio] = useState('');
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Torna alla pagina precedente
    };

    const handleSubmit = async () => {
        console.log("Invio dati: ", emailOrUsername); // Aggiungi per il debug
        try {
            const res = await axios.post('http://localhost:5000/recupero/password', { email: emailOrUsername });
            setMessaggio(res.data.message);
        } catch (error) {
            // Controlla la risposta dell'errore per avere maggiori dettagli
            const errore = error.response?.data?.error || "Errore durante l'invio";
            setMessaggio(`Errore: ${errore}`);
        }
    };

    return (
        <>
            <div>
                <LogoProfile 
                    logoSrc="/BeFluent_logo_testo.png"
                    profileSrc="/iconaDottore.png"
                    logoClass="logoTesto-registrazioneSpecialista"
                    profileClass="logoDottore-registrazioneSpecialista"
                />
            </div>

            <div className="introductionPswDimenticata">
                Inserisci la tua email o il tuo username per avviare il recupero della password e tornare subito operativo.
            </div>

            <div className="input-labelPswDimenticata">Email/Username</div>
            <div className="input-fieldPswDimenticata">
                <input 
                    type="text" 
                    placeholder="inserisci..." 
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)} 
                />
            </div>

            <div className="buttonPswDimenticata" onClick={handleSubmit}>
                <div className="button-textPswDimenticata">INVIA</div>
            </div>

            {messaggio && <p>{messaggio}</p>}

            {/* Pulsante "Torna Indietro" */}
            <BackButton onClick={handleBack} />
        </>
    );
};

export default PswDimenticata;
