import React, { useEffect, useState } from "react";
import './HomeBambini.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";

const HomeBambini = () => {
    const [bambino, setBambino] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchBambino = async () => {
        const bambinoId = sessionStorage.getItem("bambinoId"); 
        console.log("Bambino ID recuperato:", bambinoId); // 🔍 Debug
    
        if (!bambinoId) {
            navigate("/login/bambino"); 
            return;
        }
    
        try {
            const response = await axios.get(`http://localhost:5000/bambino/${bambinoId}`);
            console.log("Dati ricevuti:", response.data); // 🔍 Debug
            setBambino(response.data);
        } catch (error) {
            console.error("Errore nel recupero dei dati del bambino", error);
        }
    };
        fetchBambino();
    }, [navigate]);

    return (
        <div>
            <img src="/robottiniHomeBambini.png" alt="robottiniHomeBambini" className="robottiniHomeBambini" />
            
            {/* ✅ Mostra il nome se presente */}
            <div className="title">Ciao {bambino && bambino.nome ? bambino.nome : "Caricamento..."} 👋</div>


            <div className="cardTestIniziale">
                <div className="card-title">TEST INIZIALE</div>
            </div>

            <div className="cardEserciziGiornalieri">
                <div className="card-title">ESERCIZI GIORNALIERI</div>
            </div>

            <div className="cardDialogoEsperto">
                <div className="card-title">PARLA CON IL TUO ESPERTO</div>
            </div>

            <div className="cardLogoutBambino">
                <div className="logout-title">LOGOUT</div>
            </div>

            <LogoProfile 
                logoSrc="/BeFluent_logo_testo.png"
                profileSrc="/iconaBambino.png"
                logoClass="logoTesto-registrazioneSpecialista"
                profileClass="logoDottore-registrazioneSpecialista"
            />
            
            <BackButton />

            <div className="fun-text">Scegli e divertiti! Qui ogni strada è speciale, proprio come te! 💛✨</div>
        </div>
    );
};

export default HomeBambini;
