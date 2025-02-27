import React, { useContext, useEffect } from "react";
import { GameTimerContext } from "./GameTimerContext";
import LogoProfile from "../Components/UI/LogoProfile";
import "./AbbinamentoParole5.css";
import { Link } from "react-router-dom";

const AbbinamentoParole5 = () => {
    const { timeElapsed, stopTimer } = useContext(GameTimerContext); // Estraiamo il tempo trascorso e la funzione per fermare il timer

    useEffect(() => {
        stopTimer(); // Ferma il timer quando si carica la pagina finale
    }, []);

    return (
        <>
            <img
                src="/FineAbbinamentoParole.png"
                alt="FineAbbinamentoParole"
                className="FineAbbinamentoParole"
            />
            <div className="titleAbbinamentoParole5">HAI FINITO!🎮📖</div>
            <div className="timerAbbinamentoParoleFine">Hai completato il gioco in: {timeElapsed} secondi!</div>


            <Link to="/Home/Bambini">
                <button className="nextStepAbbinamentoParole5">Torna alla Home</button>
            </Link>
            

            <LogoProfile
                logoSrc="/BeFluent_logo_testo.png"
                profileSrc="/iconaBambino.png"
                logoClass="logoTesto-registrazioneSpecialista"
                profileClass="logoDottore-registrazioneSpecialista"
            />


        </>
    );
};

export default AbbinamentoParole5;
