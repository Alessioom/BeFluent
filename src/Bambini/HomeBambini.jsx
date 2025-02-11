import React, { useEffect, useState } from "react";
import './HomeBambini.css';
import { Link, useNavigate } from 'react-router-dom';
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
            <img src="/robotHomeBambino.png" alt="robotHomeBambino" className="robotHomeBambino" />
            <img src="/robottino1HomeBambini.png" alt="robottino1HomeBambini" className="robottino1HomeBambini" />
            <img src="/robottino2HomeBambini.png" alt="robottino2HomeBambini" className="robottino2HomeBambini" />
            <img src="/robottino3HomeBambini.png" alt="robottino3HomeBambini" className="robottino3HomeBambini" />
            
            {/* ✅ Mostra il nome se presente */}
            <div className="title">Ciao {bambino && bambino.nome ? bambino.nome : "Caricamento..."} 👋</div>


            <button className="cardTestIniziale">
                <div className="card-title">TEST INIZIALE</div>
            </button>
            <Link to="/Esercizi/Giornalieri">
                <button className="cardEserciziGiornalieri">
                    <div className="card-title">ESERCIZI GIORNALIERI</div>
                </button>
            </Link>
            <button className="cardDialogoEsperto">
                <div className="card-title">PARLA CON IL TUO ESPERTO</div>
            </button>

            <Link to="/login/bambino">
            <button className="cardLogoutBambino">
                <div className="logout-title">LOGOUT</div>
            </button>
            </Link>

            <LogoProfile 
                logoSrc="/BeFluent_logo_testo.png"
                profileSrc="/iconaBambino.png"
                logoClass="logoTesto-registrazioneSpecialista"
                profileClass="logoDottore-registrazioneSpecialista"
            />
            
            <BackButton />

            <div className="nuvoletta-dialogo">
                Scegli e divertiti! Qui ogni strada è speciale, proprio come te! 💛✨
            </div>

        </div>
    );
};

export default HomeBambini;
