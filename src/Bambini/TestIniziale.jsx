import React from "react";
import "./TestIniziale.css";
import { Link } from "react-router-dom";
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";

const TestIniziale = () => {
    return (
        <>
            <div className="titoloTestIniziale">
                <p className="TestInizialeText">Ciao, piccolo amico! 👋</p>
                <p className="TestInizialeText">Oggi giochiamo con le parole 🕹️🎉</p>
                <p className="TestInizialeText">
                    Vedrai alcune parole scritte bene e altre con piccoli errori 🤪✏️
                </p>
                <p className="TestInizialeText">
                    Dovrai dire se la parola è giusta o se ha bisogno di una sistematina
                </p>
                <p className="TestInizialeText">
                    Prenditi tutto il tempo che vuoi e divertiti!
                </p>
            </div>


            <Link to="/Test/Iniziale/1">
            <button className="buttonIniziaTest">Inizia</button>
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

export default TestIniziale;