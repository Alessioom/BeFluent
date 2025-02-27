import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameTimerContext } from "./GameTimerContext";
import LogoProfile from "../Components/UI/LogoProfile";
import "./AbbinamentoParole2.css";

const AbbinamentoParole2 = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [showNextStep, setShowNextStep] = useState(false);
    const { timeElapsed, startTimer } = useContext(GameTimerContext);
    //a noi interessa soltanto il tempo trascorso e la funzione per avviare il timer

    const navigate = useNavigate();


    useEffect(() => {
        startTimer(); // Quando la pagina si carica, il timer riparte da zero
    }, []); // Array vuoto [] per farlo partire solo una volta

    const handleChoice = (choice) => {
        if (choice === "GN" || choice === "NI") {
            setFeedback("Se sei sicuro della tua scelta clicca qui sotto");
            setShowNextStep(true);
        }
        setSelectedOption(choice);
    };

    const handleNext = () => {
        navigate("/Abbinamento/Parole/3");
    };

    return (
        <>
            <img
                src="/RobotAbbinamentoParole.png"
                alt="RobotAbbinamentoParole"
                className="RobotAbbinamentoParole"
            />
            <img
                src="/SpugnaAbbinamentoParole.png"
                alt="SpugnaAbbinamentoParole"
                className="SpugnaAbbinamentoParole"
            />

            <div className="titleAbbinamentoParole2">Scegli tra le opzioni quella corretta per completare la parola!🎮📖</div>
            <div className="timerAbbinamentoParole">Tempo trascorso: {timeElapsed} secondi</div> {/*Il valore timeElapsed viene usato per mostrare sullo schermo quanti secondi sono passati*/}

            <div className="wordExampleAbbinamentoParole2">S P U _ _ A </div>
            <div className="optionsAbbinamentoParole2">
                <button
                    className={`optionAbbinamentoParole2 ${selectedOption === "GN" ? "selected" : ""}`}
                    onClick={() => handleChoice("GN")}
                >GN</button>
                <button
                    className={`optionAbbinamentoParole2 ${selectedOption === "NI" ? "selected" : ""}`}
                    onClick={() => handleChoice("NI")}
                >NI</button>
            </div>
            {feedback && <p className="feedbackAbbinamentoParole2">{feedback}</p>}
            {showNextStep && <button onClick={handleNext} className="nextStepAbbinamentoParole2">Vai al Prossimo Livello</button>}

            <LogoProfile
                logoSrc="/BeFluent_logo_testo.png"
                profileSrc="/iconaBambino.png"
                logoClass="logoTesto-registrazioneSpecialista"
                profileClass="logoDottore-registrazioneSpecialista"
            />
        </>
    );
};

export default AbbinamentoParole2;
