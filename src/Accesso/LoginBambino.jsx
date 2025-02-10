import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginBambino.css';
import BackButton from '../Components/UI/BackButton-ui';
import { Link } from 'react-router-dom';

function LoginBambino() {
  const [ID, setID] = useState('');
  const [messaggio, setMessaggio] = useState('');
  const [errore, setErrore] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setID(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessaggio('');
    setErrore('');

    try {
        const response = await axios.post('http://localhost:5000/login/bambino', { ID });

        if (response.data.bambinoId) {
            console.log("Bambino ID ricevuto:", response.data.bambinoId); // Debug
            sessionStorage.setItem("bambinoId", response.data.bambinoId); // Salva l'ID
        } else {
            console.error("Errore: Nessun ID bambino ricevuto dal server");
        }

        setMessaggio(response.data.message);

        setTimeout(() => {
            navigate('/PaginaBambini'); // Reindirizza alla home del bambino
        }, 1000);
    } catch (error) {
        setErrore(error.response?.data?.error || 'Errore durante il login');
    }
};


  return (
    <>
      <div className="backgroundLoginBambino" />

      {/* Banner di Benvenuto */}
      <div className="welcomeBannerLoginBambino">
        Bentornato, piccolo esploratore! Oggi imparare sarà ancora più divertente! 🎈
      </div>

      <div>
        <img src="/robotLoginBambino.png" className="robotLoginBambino" alt="Robot" />
      </div>

      {/* Pulsante Torna Indietro */}
      <BackButton />

      {/* Form di Login */}
      <div className="loginContainerLoginBambino">
        <form className="loginBoxLoginBambino" onSubmit={handleSubmit}>
          <div className="inputContainerLoginBambino">
            <label className="labelLoginBambino">Numero speciale</label>
            <input
              type="text"
              className="inputFieldLoginBambino"
              value={ID}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="loginButtonLoginBambino">
            ENTRA
          </button>

  {/* Se il login è successo, si mostra il link per andare alla homebambino */}


          {messaggio && <p className="successoLoginBambino">{messaggio}</p>}
          {errore && <p className="erroreLoginBambino">{errore}</p>}
        </form>
      </div>
    </>
  );
}

export default LoginBambino;
