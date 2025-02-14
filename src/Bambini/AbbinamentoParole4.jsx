import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameTimerContext } from "./GameTimerContext";
import LogoProfile from "../Components/UI/LogoProfile";
import "./AbbinamentoParole4.css";

const AbbinamentoParole4 = () => {
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
        navigate("/Abbinamento/Parole/5");
    };

    return (
        <>
            <img
                src="/PasquaAbbinamentoParole.png"
                alt="PasquaAbbinamentoParole"
                className="PasquaAbbinamentoParole"
            />


            <div className="titleAbbinamentoParole4">Scegli tra le opzioni quella corretta per completare la parola!🎮📖</div>
            <div className="timerAbbinamentoParole">Tempo trascorso: {timeElapsed} secondi</div>

            <div className="wordExampleAbbinamentoParole4">P A S _ _ A  </div>
            <div className="optionsAbbinamentoParole4">
                <button
                    className={`optionAbbinamentoParole4 ${selectedOption === "QU" ? "selected" : ""}`}
                    onClick={() => handleChoice("QU")}
                >QU</button>
                <button
                    className={`optionAbbinamentoParole4 ${selectedOption === "CU" ? "selected" : ""}`}
                    onClick={() => handleChoice("CU")}
                >CU</button>
            </div>
            {feedback && <p className="feedbackAbbinamentoParole4">{feedback}</p>}
            {showNextStep && <button onClick={handleNext} className="nextStepAbbinamentoParole4">Vai al Prossimo Livello</button>}

            <LogoProfile
                logoSrc="/BeFluent_logo_testo.png"
                profileSrc="/iconaBambino.png"
                logoClass="logoTesto-registrazioneSpecialista"
                profileClass="logoDottore-registrazioneSpecialista"
            />
        </>
    );
};

export default AbbinamentoParole4;
