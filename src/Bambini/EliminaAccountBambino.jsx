import React, { useState, useEffect } from 'react'; 
import './EliminaAccountBambino.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";

const EliminaAccountBambino = () => {
    const [bambino, setBambino] = useState(null); // Stato per memorizzare i dati del bambino
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBambino = async () => { // Funzione per recuperare i dati del bambino
            const bambinoId = sessionStorage.getItem("bambinoId"); // Recupera l'ID del bambino dalla sessione
            console.log("Bambino ID recuperato:", bambinoId);

            if (!bambinoId) {
                navigate("/login/bambino"); // Se l'ID del bambino non è presente, reindirizza alla pagina di login
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/bambino/${bambinoId}`); // Richiedi i dati del bambino
                console.log("Dati ricevuti:", response.data);
                setBambino(response.data); // Imposta i dati del bambino
                setFormData(response.data); // Inizializza i campi del form
            } catch (error) {
                console.error("Errore nel recupero dei dati del bambino", error);
            }
        };
        fetchBambino();
    }, [navigate]);

    const handleDelete = async (id) => {
        //  Finestra di conferma *PRIMA* della chiamata API
        if (window.confirm(`Sei sicuro di voler eliminare ${bambino.nome} ${bambino.cognome}?`)) { 
            try {
                // Chiamata API per eliminare il bambino
                await axios.delete(`http://localhost:5000/bambino/${id}`, {
                    headers: { 
                        'Authorization': `Bearer ${localStorage.getItem('token')}` //solo un utente autenticato può eliminare il proprio account
                    }
                });
                console.log("Bambino eliminato");
                navigate("/login/bambino");
            } catch (error) {
                console.error("Errore nell'eliminazione del bambino:", error);
                setError("Errore durante l'eliminazione del bambino. Riprova."); // Per mostrare l'errore
            }
        }
    };
    return (
        <div>

            <div className="titoloEliminaBambino"> ATTENZIONE! </div>

            <div className="testoEliminaBambino"> Sei sicuro di voler eliminare il tuo account? </div>




            <img src="/robotEliminaBambino.png" alt="robotEliminaBambino" className="robotEliminaBambino" />
            
            <button className="bottoneEliminaSoftBambino" onClick={() => handleDelete(bambino._id)}>Elimina</button> {/* Chiamata alla funzione handleDelete*/}

            <LogoProfile 
                logoSrc="/BeFluent_logo_testo.png"
                profileSrc="/iconaBambino.png"
                logoClass="logoTesto-registrazioneSpecialista"
                profileClass="logoDottore-registrazioneSpecialista"
            />

            <BackButton />
        </div>
    );
};

export default EliminaAccountBambino;
