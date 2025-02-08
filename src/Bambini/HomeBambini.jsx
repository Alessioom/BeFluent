import React from "react";
import './HomeBambini.css';
import ButtonsBambini from "../Components/UI/ButtonBambini";
import BackButton from "../Components/UI/BackButton-ui";

const HomeBambini = () => {
    const handleBack = () => {
        navigate(-1); // Navigate back one step in history
      };

    
  return (
    <div>

      <div className="card">
        <div className="card-title">TEST INIZIALE</div>
      </div>

      <div className="card">
        <div className="card-title">ESERCIZI GIORNALIERI</div>
      </div>

      <div className="card">
        <div className="card-title">PARLA CON IL TUO ESPERTO</div>
      </div>

      <div className="logout">
        <div className="logout-title">LOGOUT</div>
      </div>

      
      {/* Logo posizionato a destra in modo assoluto */}
    <LogoProfile 
      logoSrc="/BeFluent_logo_testo.png"
      profileSrc="/iconaBambino.png"
      logoClass="logoTesto-registrazioneSpecialista"
      profileClass="logoDottore-registrazioneSpecialista"
    />
     <BackButton onClick={handleBack} /> {/* Add the BackButton component */}

      <div className="fun-text">Scegli e divertiti! Qui ogni strada è speciale, proprio come te! 💛✨</div>

     {/* <img className="icon" src="https://via.placeholder.com/124x123" alt="icon" />
      <img className="icon" src="https://via.placeholder.com/126x130" alt="icon" />*/}
    </div>
  );
};

export default HomeBambini;
