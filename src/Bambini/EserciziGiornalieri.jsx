import React from "react";
import "./EserciziGiornalieri.css";
import { Link } from "react-router-dom";
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";


const EserciziGiornalieri = () => {
  return (
    <>
      <div className="titoloGiochiBambini">Scegli a cosa giocare! 😊</div>

      <Link to="/Giudizio/Ortografico/1">  
        <div className="game-option">
            <div className="game-box">
            <span>GIUDIZIO ORTOGRAFICO</span>
            </div>
        </div>
      </Link>

      <Link to="/Abbinamento/Parole/1">
        <div className="game-option right">
          <div className="game-box">
            <span>ABBINAMENTO PAROLE AMBIGUE</span>
          </div>
        </div>
      </Link>

      <img
        src="/robotGiochiBambini.png"
        alt="robotGiochiBambino"
        className="robotGiochiBambino"
      />

      <BackButton />

      <LogoProfile
        logoSrc="/BeFluent_logo_testo.png"
        profileSrc="/iconaBambino.png"
        logoClass="logoTesto-registrazioneSpecialista"
        profileClass="logoDottore-registrazioneSpecialista"
        />
      
    </>
  );
};

export default EserciziGiornalieri;
