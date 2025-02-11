import React from "react";
import "./GiudizioOrtografico1.css";
import { Link } from "react-router-dom";
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";

const GiudizioOrtografico1 = () => {
    return (
        <>
            <div className="titoloGiudizioOrtografico">Ciao piccolo giudice delle parole! 👋✨</div>

            <img
                src="/robotGiudizioOrtografico1.png"
                alt="robotGiochiBambino"
                className="robotGiudizioOrtografico"
            />

            <div className="testoGiudizioOrtografico">
                <p>
                    Benvenuto! Oggi giocheremo con le parole.  
                    <br /><br />
                    Guarda bene ogni parola e decidi:  
                    <br /><br />
                    ✅ Se è scritta giusta, clicca sul pulsante verde.  
                    <br /><br />
                    ❌ Se è sbagliata, clicca sul pulsante rosso.  
                    <br /><br />
                    Sei pronto? Tocca il pulsante qui sotto per iniziare!
                </p>
            </div>

            
            <Link to="/giudizioOrtografico2">
                <button className="bottoneIniziaGioco">Inizia il gioco</button>
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
