import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginBambino.css';
import BackButton from '../Components/UI/BackButton-ui';

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
      setMessaggio(response.data.message);

      // Simuliamo il reindirizzamento alla home o dashboard del bambino
      setTimeout(() => {
        navigate('/dashboard-bambino'); // Modifica con la tua pagina di destinazione
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
  {messaggio && (
            <div>
              <p className="successoLoginBambino">{messaggio}</p>
              <Link to="/homebambino">
                <button className="entraHomeBambino">Vai alla Home</button>
              </Link>
            </div>
          )}

          {messaggio && <p className="successoLoginBambino">{messaggio}</p>}
          {errore && <p className="erroreLoginBambino">{errore}</p>}
        </form>
      </div>
    </>
  );
}

export default LoginBambino;
