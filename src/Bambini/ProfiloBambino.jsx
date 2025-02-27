import React, { useState, useEffect } from 'react';
import './ProfiloBambino.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";

const ProfiloBambino = () => {
    const [bambino, setBambino] = useState(null); // Stato per memorizzare i dati del bambino
    const [isEditing, setIsEditing] = useState(false); // Stato per abilitare la modifica dei dati
    const [formData, setFormData] = useState({}); // Stato per memorizzare i dati del form
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchBambino = async () => {  // Funzione per recuperare i dati del bambino
            const bambinoId = sessionStorage.getItem("bambinoId"); // Recupera l'ID del bambino dalla sessione
            console.log("Bambino ID recuperato:", bambinoId);

            if (!bambinoId) {
                navigate("/login/bambino");
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value }); // Aggiorna i dati del form
        // Aggiorna l'oggetto formData usando il nome dell'input come chiave
    };

    const handleSave = async () => {
        try {
            //Quando viene cliccato il tasto salva viene chiamata una funzione put per aggiornare i dati del bambino
            await axios.put(`http://localhost:5000/bambino/${bambino._id}`, formData); 
            setBambino(formData); 
            setIsEditing(false);  // Disabilita la modifica
        } catch (error) {
            console.error("Errore nell'aggiornamento dei dati", error);
        }
    };

    return (
        <div>
            <div className="info-box">
                <div className="info">
                    {isEditing ? (
                        <>
                            <div>
                                <span>NOME:</span> 
                                <input 
                                    type="text" 
                                    name="nome" 
                                    value={formData.nome || ""} 
                                    onChange={handleChange}  // Quando il valore cambia, chiama la funzione handleChange
                                />
                            </div>
                            <div>
                                <span>COGNOME:</span> 
                                <input 
                                    type="text" 
                                    name="cognome" 
                                    value={formData.cognome || ""} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div>
                                <span>SESSO:</span> 
                                <select name="sesso" value={formData.sesso || ""} onChange={handleChange}>
                                    <option value="Maschio">Maschio</option>
                                    <option value="Femmina">Femmina</option>
                                </select>
                            </div>
                            <div>
                                <span>DATA DI NASCITA:</span> 
                                <input 
                                    type="date" 
                                    name="dataDiNascita" 
                                    value={formData.dataDiNascita ? new Date(formData.dataDiNascita).toISOString().split('T')[0] : ""} 
                                    // formatta la data in modo che sia compatibile con l'input di tipo date
                                    onChange={handleChange} 
                                />
                            </div>
                            <div>
                                <span>EMAIL GENITORE:</span> 
                                <input 
                                    type="email" 
                                    name="emailGenitore" 
                                    value={formData.emailGenitore || ""} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div><span>NOME:</span> <span className="value">{bambino?.nome || "Caricamento..."}</span></div>
                            <div><span>COGNOME:</span> <span className="value">{bambino?.cognome || "Caricamento..."}</span></div>
                            <div><span>SESSO:</span> <span className="value">{bambino?.sesso || "Caricamento..."}</span></div>
                            <div><span>DATA DI NASCITA:</span> <span className="value">{bambino?.dataDiNascita ? new Date(bambino.dataDiNascita).toLocaleDateString("it-IT") : "Caricamento..."}</span></div>
                            <div><span>EMAIL GENITORE:</span> <span className="value">{bambino?.emailGenitore || "Caricamento..."}</span></div>
                        </>
                    )}
                    
                    

                </div>

                <div className="buttons">
                    {isEditing ? (
                        <button className="save-btn" onClick={handleSave}>Salva</button> // Quando viene cliccato il tasto salva viene chiamata la funzione handleSave
                    ) : (
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>Modifica</button> // Quando viene cliccato il tasto modifica viene abilitata la modifica
                    )}
                    
                    
                </div>
                
                

            </div>

            <img src="/robotImpostazioniBambino.png" alt="robotImpostazioniBambino" className="robotImpostazioniBambino" />
            
            <div className="bottoneEliminaBambino" onClick={() => navigate("/Elimina/Bambino")}> ELIMINA ACCOUNT </div>
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

export default ProfiloBambino;
