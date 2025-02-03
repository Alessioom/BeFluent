import React from 'react';
import './PswDimenticata.css';

const PswDimenticata = () => {

    const handleBackClick = () => {
        // Handle back button click (e.g., navigation)
        console.log("Back button clicked");
    };

    const handleSubmit = () => {
        // Handle submit button click (e.g., password reset logic)
        console.log("Submit button clicked");
    }

    return (
        <div className="container">
            <div className="box">
                <img className="profile-image" src="/iconaDottore.png" alt="Profile" />

                <div className="introduction">
                    Inserisci la tua <span className="bold-text">email</span> o il tuo <span className="bold-text">username</span> per avviare il <span className="bold-text">recupero</span> della <span className="bold-text">password</span> e tornare subito operativo.
                </div>

                <div className="input-label">Email/Username</div>
                <div className="input-field">
                    <input type="text" placeholder="inserisci..." /> {/* The actual input field */}
                </div>

                <div className="button" onClick={handleSubmit}>
                    <div className="button-text">INVIA</div>
                </div>

                <div className="back-button" onClick={() => window.history.back()}>
                TORNA INDIETRO
                </div>
            </div>
        </div>
    );
};

export default PswDimenticata;