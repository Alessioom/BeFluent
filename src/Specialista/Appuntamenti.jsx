import React, { useState } from 'react';
import './Appuntamenti.css';
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";
import NavButton from "../Components/UI/NavButton";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importa i CSS del datepicker
import { registerLocale } from  "react-datepicker"; //import per la lingua
import it from 'date-fns/locale/it';

registerLocale('it', it); // Registra la locale PRIMA di usare il componente

const Appuntamenti = ({ bambinoId, onAppuntamentoConfermato, onCancel }) => {
    const [nome, setNome] = useState('');
    const [data, setData] = useState(null); // Usa null come valore iniziale
    const [ora, setOra] = useState(20); // Inizializza con un'ora di default
    const [minuti, setMinuti] = useState(0); // Inizializza con i minuti di default
    const { id } = useParams(); // Prendi l'ID dalla URL  
    const [searchParams] = useSearchParams(); // Usa useSearchParams per i query parameters
    const nomeBambino = searchParams.get('nome') || ''; // Ottieni il nome
    const cognomeBambino = searchParams.get('cognome') || ''; // Ottieni il cognome
    const navigate = useNavigate();

    const handleDataChange = (newData) => {
        setData(newData);
      };
    
      const handleOraChange = (e) => {
        const newOra = parseInt(e.target.value, 10);
        if (!isNaN(newOra) && newOra >= 0 && newOra <= 23) {
          setOra(newOra);
        }
      };
    
      const handleMinutiChange = (e) => {
        const newMinuti = parseInt(e.target.value, 10);
        if (!isNaN(newMinuti) && newMinuti >= 0 && newMinuti <= 59) {
          setMinuti(newMinuti);
        }
      };

      const handleConferma = () => {
        // Validazione
        if (!nome || !data) {
          alert('Inserisci nome e data.'); // Sostituisci con una notifica migliore (toast, modal, ecc.)
          return;
        }
        const dataAppuntamento = new Date(data); //Crea una copia per non modificare direttamente lo stato
        dataAppuntamento.setHours(ora, minuti, 0, 0); // Imposta ora e minuti

        console.log('Dati appuntamento:', { bambinoId: id, nome, data: dataAppuntamento.toISOString() }); // Usa l'ID dalla URL

    // Sostituisci con la chiamata API!
        // axios.post('/api/appuntamenti', { bambinoId: id, nome, data: dataAppuntamento.toISOString() })
        //     .then(response => {
        //         // Gestisci il successo (es. reindirizza)
        navigate(`/bambino/${id}`); // Esempio di reindirizzamento
        //     })
        //     .catch(error => {
        //         // Gestisci l'errore
        //     });
        navigate(`/Home/Specialista`); //reindirizzo in ogni caso
    };


    const handleCancella = () => {
        setNome('');
        setData(null);  // Resetta la data
        setOra(20);    // Imposta l'ora di default
        setMinuti(0);   // Imposta i minuti di default
    };

    const handleAnnulla = () => {
        navigate(`/Pagina/Bambino/${id}`);
     };


    return (
        <div>
        <div className="appuntamenti-container">


       <h2 className="appuntamenti-titolo">Pianifica Appuntamento per {nomeBambino} {cognomeBambino}</h2>
       <div className="input-group">
           <label htmlFor="nome">Nome Bambino:</label>
           <input
               type="text"
               id="nome"
               value={nome}
               onChange={(e) => setNome(e.target.value)}
               placeholder="Inserisci il nome del bambino"
           />
       </div>

       <div className="input-group">
           <label htmlFor="data">Data:</label>
           <DatePicker
               selected={data}
               onChange={handleDataChange}
               dateFormat="dd/MM/yyyy"
               placeholderText="gg/mm/aaaa"
               locale="it"
               className="data-picker"
               id="data"
           />
       </div>

       <div className="input-group">
           <label htmlFor="ora">Ora:</label>
           <div className="time-picker-container">
               <input
                   type="number"
                   id="ora"
                   value={ora}
                   onChange={handleOraChange}
                   min="0"
                   max="23"
                   className="time-picker"
                   placeholder="HH"
               />
               <span>:</span>
               <input
                   type="number"
                   value={minuti}
                   onChange={handleMinutiChange}
                   min="0"
                   max="59"
                   className="time-picker"
                   placeholder="MM"
               />
           </div>
       </div>

       <div className="button-group">
           <button className="btn-cancella" onClick={handleCancella}>Cancella</button>
           <button className="btn-conferma" onClick={handleConferma}>Conferma</button>
           <button className="btn-annulla" onClick={handleAnnulla}>Annulla</button>
       </div>
   </div>

            <div>
                <LogoProfile
                    logoSrc="/BeFluent_logo_testo.png"
                    profileSrc="/iconaDottore.png"
                    logoClass="logoTesto-registrazioneSpecialista"
                    profileClass="logoDottore-registrazioneSpecialista"
                />

                <div className="navigation-buttons">
                    <NavButton to="/Home/Specialista" className="home-button" text="HOME" />
                    <NavButton to="/Elenco/Bambini" className="bambini-button" text="BAMBINI" />
                    <NavButton to="/Impostazioni" className="settings-button-elenco" text="IMPOSTAZIONI" />
                    <NavButton to="#" className="strumenti-button" text="STRUMENTI" onClick={() => alert("Pagina in fase di implementazione!")} />
                    <NavButton to="/Logout" className="logout-button" text="LOGOUT" />
                </div>

                <BackButton onClick={() => navigate("/Pagina/Bambino")} /> 
        </div>
        </div>
    );
};

export default Appuntamenti;
