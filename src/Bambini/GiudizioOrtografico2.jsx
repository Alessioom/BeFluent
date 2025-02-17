import React from "react";
import "./GiudizioOrtografico2.css";
import { Link } from "react-router-dom";
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";

const GiudizioOrtografico2 = () => {
    return (
        <>
            <div className="titoloGiudizioOrtografico2">Questo gioco è ancora in fase di creazione, torna più tardi!👋</div>




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

export default GiudizioOrtografico2;
