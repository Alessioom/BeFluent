import React, { useState } from "react";
import "./AbbinamentoParoleIntro.css";
import { useNavigate } from "react-router-dom";
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";


const AbbinamentoParoleIntro = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [showNextStep, setShowNextStep] = useState(false);
    const navigate = useNavigate();

    const handleChoice = (choice) => {
        if (choice === "QUE") {
            setFeedback("Bravo! Hai scelto la risposta corretta! ✅");
            setShowNextStep(true);

        } else {
            setFeedback("Ops! Ritenta, sarai più fortunato! ❌");
        }
        setSelectedOption(choice);
    };


    const handleNext = () => {
        navigate("/Abbinamento/Parole/2");
    };

    return (
        <>
            <h1 className="titleAbbinamentoParoleIntro">Benvenuto nel gioco di Abbinamento di Parole Ambigue! 🎮📖</h1>
            <p className="descriptionAbbinamentoParoleIntro">
                Questa è una piccola prova: scegli tra le opzioni quella corretta per completarla!
            </p>

            <img
                src="/RobotAbbinamentoParole.png"
                alt="RobotAbbinamentoParole"
                className="RobotAbbinamentoParole"
            />

<img
                src="/5AbbinamentoParole.png"
                alt="5AbbinamentoParole"
                className="AbbinamentoParole5"
            />
 
            <div className="wordExampleAbbinamentoParoleIntro">C I N _ _ _</div>
            <div className="optionsAbbinamentoParoleIntro">
                <button 
                    className={`optionAbbinamentoParoleIntro ${selectedOption === "QUE" ? "selected" : ""}`} 
                    onClick={() => handleChoice("QUE")}
                >QUE</button>
                <button 
                    className={`optionAbbinamentoParoleIntro ${selectedOption === "CUE" ? "selected" : ""}`} 
                    onClick={() => handleChoice("CUE")}
                >CUE</button>
            </div>
            {feedback && <p className="feedbackAbbinamentoParoleIntro">{feedback}</p>}

            {showNextStep && (
                <div className="nextStepAbbinamentoParoleIntro">
                    <p>Hai capito come funziona! 🎉</p>
                    <p>Ora inizia il vero gioco: non ti verrà detto se hai indovinato o meno, non avere paura! 🚀</p>
                    <button className="nextButtonAbbinamentoParoleIntro" onClick={handleNext}>Inizia il vero gioco</button>
                </div>
            )}


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

export default AbbinamentoParoleIntro;