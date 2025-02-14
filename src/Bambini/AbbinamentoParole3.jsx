import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameTimerContext } from "./GameTimerContext";
import LogoProfile from "../Components/UI/LogoProfile";
import "./AbbinamentoParole3.css";

const AbbinamentoParole3 = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [showNextStep, setShowNextStep] = useState(false);
    const { timeElapsed } = useContext(GameTimerContext);
    const navigate = useNavigate();

    const handleChoice = (choice) => {
        if (choice === "CU" || choice === "QU") {
            setFeedback("Se sei sicuro della tua scelta clicca qui sotto");
            setShowNextStep(true);
        }
        setSelectedOption(choice);
    };

    const handleNext = () => {
        navigate("/Abbinamento/Parole/4");
    };

    return (
        <>
            <img
                src="/SquadraAbbinamentoParole.png"
                alt="SquadraAbbinamentoParole"
                className="SquadraAbbinamentoParole"
            />


            <div className="titleAbbinamentoParole3">Scegli tra le opzioni quella corretta per completare la parola!🎮📖</div>
            <div className="timerAbbinamentoParole">Tempo trascorso: {timeElapsed} secondi</div>

            <div className="wordExampleAbbinamentoParole3">S _ _ A D R A  </div>
            <div className="optionsAbbinamentoParole3">
                <button
                    className={`optionAbbinamentoParole3 ${selectedOption === "CU" ? "selected" : ""}`}
                    onClick={() => handleChoice("CU")}
                >CU</button>
                <button
                    className={`optionAbbinamentoParole3 ${selectedOption === "QU" ? "selected" : ""}`}
                    onClick={() => handleChoice("QU")}
                >QU</button>
            </div>
            {feedback && <p className="feedbackAbbinamentoParole3">{feedback}</p>}
            {showNextStep && <button onClick={handleNext} className="nextStepAbbinamentoParole3">Vai al Prossimo Livello</button>}

            <LogoProfile
                logoSrc="/BeFluent_logo_testo.png"
                profileSrc="/iconaBambino.png"
                logoClass="logoTesto-registrazioneSpecialista"
                profileClass="logoDottore-registrazioneSpecialista"
            />
        </>
    );
};

export default AbbinamentoParole3;
