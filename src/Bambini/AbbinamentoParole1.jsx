import React from "react";
import "./AbbinamentoParole1.css";
import { Link } from "react-router-dom";
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";

const GiudizioOrtografico1 = () => {
    return (
        <>
            <div className="titoloAbbinamentoParole">Ciao piccolo giudice delle parole! 👋✨</div>

            <img
                src="/robotGiudizioOrtografico1.png"
                alt="robotGiochiBambino"
                className="robotGiudizioOrtografico"
            />

            <div className="testoAbbinamentoParole">
                <p>
                Oggi giochiamo con le parole misteriose! 🕹️📚  
                    <br /><br />
                    Vedrai una parola incompleta. 
                    <br /><br />
                    Dovrai scegliere tra più opzioni e trovare quella giusta! 🤔✍️  
                    <br /><br />
                    📌 Pensa bene e fai la tua scelta! 
                    <br /><br />
                    📌 Non c’è fretta, prenditi il tempo che vuoi. 
                    <br /><br />
                    📌 Divertiti a scoprire la parola perfetta! 🎉
                    <br /><br />
                    Sei pronto? Tocca il pulsante qui sotto per iniziare!
                </p>
            </div>

            
            <Link to="/Abbinamento/Parole/Intro">
                <button className="bottoneIniziaGiocoAbbinamento">Inizia il gioco</button>
            </Link>


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

export default GiudizioOrtografico1;
