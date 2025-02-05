import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PswDimenticata.css';
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";

const PswDimenticata = () => {

    const navigate = useNavigate(); // Initialize useNavigate

  const handleBack = () => {
    navigate(-1); // Navigate back one step in history
  };

    const handleSubmit = () => {
        // Handle submit button click (e.g., password reset logic)
        console.log("Submit button clicked");
    };

    return (
        <>
      {/* Logo posizionato a destra in modo assoluto */}
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
                <input type="text" placeholder="inserisci..." /> {/* The actual input field */}
            </div>

            <div className="buttonPswDimenticata" onClick={handleSubmit}>
                <div className="button-textPswDimenticata">INVIA</div>
            </div>

             {/* Pulsante "Torna Indietro" */}
        <BackButton onClick={handleBack} />
        </>
    );
};

export default PswDimenticata;
