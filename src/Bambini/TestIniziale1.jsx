import React from "react";
import "./TestIniziale1.css";
import { Link } from "react-router-dom";
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";

const TestIniziale1 = () => {
    return (
        <>
            <div className="titoloTestIniziale1">Questo gioco è ancora in fase di creazione, torna più tardi!👋</div>




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

export default TestIniziale1;
