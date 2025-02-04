import React from 'react';
import { Link } from 'react-router-dom';
import './PswDimenticata.css';

const PswDimenticata = () => {

    const handleBackClick = () => {
        // Handle back button click (e.g., navigation)
        console.log("Back button clicked");
    };

    const handleSubmit = () => {
        // Handle submit button click (e.g., password reset logic)
        console.log("Submit button clicked");
    };

    return (
        <>
            <img 
                className="profileDottore-imagePSWPswDimenticata" 
                src="/iconaDottore.png" 
                alt="Profile" 
            />

            <img 
                src="/BeFluent_logo_testo.png" 
                alt="Logo" 
                className="logoTesto-PswDimenticata" 
            />

            <div className="introductionPswDimenticata">
               Inserisci la tua email o il tuo username per avviare il recupero della password e tornare subito operativo.
            </div>

            <div className="input-labelPswDimenticata">Email/Username</div>
            <div className="input-fieldPswDimenticata">
                <input type="text" placeholder="inserisci..." /> {/* The actual input field */}
            </div>

            <div className="buttonPswDimenticata" onClick={handleSubmit}>
                <div className="button-textPswDimenticata">INVIA</div>
            </div>

            <div 
                className="back-button-pswPswDimenticata" 
                onClick={() => window.history.back()}
            >
                TORNA INDIETRO
            </div>
        </>
    );
};

export default PswDimenticata;
