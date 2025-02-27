import React, { useState, useEffect } from 'react';
import './HomeBambini.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";

const HomeBambini = () => {
    const [bambino, setBambino] = useState(null); // Stato per memorizzare i dati del bambino
    const navigate = useNavigate(); // Hook per la navigazione
 
    useEffect(() => { // Effettua il fetch dei dati del bambino (fetch = recupero dati)
      const fetchBambino = async () => { 
        const bambinoId = sessionStorage.getItem("bambinoId"); // Recupera l'ID del bambino dalla sessione
        console.log("Bambino ID recuperato:", bambinoId); // 🔍 Debug
    
        if (!bambinoId) {
            navigate("/login/bambino");  // Se non c'è un ID del bambino, reindirizza al login
            return;
        }
    
        try {
            const response = await axios.get(`http://localhost:5000/bambino/${bambinoId}`); // Richiesta GET al server per i dati del bambino
            console.log("Dati ricevuti:", response.data); // 🔍 Debug
            setBambino(response.data); // Imposta i dati del bambino nello stato
        } catch (error) {
            console.error("Errore nel recupero dei dati del bambino", error);
        }
    };
        fetchBambino(); // Chiama la funzione di fetch dei dati del bambino
    }, [navigate]);

    return (
        <div>
            <img src="/robotHomeBambino.png" alt="robotHomeBambino" className="robotHomeBambino" />
            <img src="/robottino1HomeBambini.png" alt="robottino1HomeBambini" className="robottino1HomeBambini" />
            <img src="/robottino2HomeBambini.png" alt="robottino2HomeBambini" className="robottino2HomeBambini" />
            <img src="/robottino3HomeBambini.png" alt="robottino3HomeBambini" className="robottino3HomeBambini" />
            
            {/* ✅ Mostra il nome se presente */}
            <div className="title">Ciao {bambino && bambino.nome ? bambino.nome : "Caricamento..."} 👋</div>

            <Link to="/Test/Iniziale">
                <button className="cardTestIniziale">
                    <div className="card-title">TEST INIZIALE</div>
                </button>
            </Link>

            <Link to="/Esercizi/Giornalieri">
                <button className="cardEserciziGiornalieri">
                    <div className="card-title">ESERCIZI GIORNALIERI</div>
                </button>
            </Link>

            <Link to="/DialogoSpecialista">
                <button className="cardDialogoEsperto">
                    <div className="card-title">PARLA CON IL TUO ESPERTO</div>
                </button>
            </Link>

            <Link to="/login/bambino">
                <button className="cardLogoutBambino">
                    <div className="logout-title">LOGOUT</div>
                </button>
            </Link>


            <Link to="/Profilo/Bambino" >
                <button className="cardProfiloBambino">
                    <div>PROFILO</div>
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
