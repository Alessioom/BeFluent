import React from 'react';
import { Link } from 'react-router-dom';
import './LoginBambino.css';

function LoginBambino() {
  return (
    <>
      <div className="backgroundLoginBambino" />

      {/* Banner di Benvenuto */}
      <div className="welcomeBannerLoginBambino">
        Bentornato, piccolo esploratore! Oggi imparare sarà ancora più divertente! 🎈
      </div>

      
      {/* Pulsante Torna Indietro */}
      <div className="backButtonLoginBambino" onClick={() => window.history.back()}>
          TORNA INDIETRO
        </div>
      {/* Form di Login */}
      <div className="loginContainerLoginBambino">
        <div className="loginBoxLoginBambino">
          <div className="inputContainerLoginBambino">
            <label className="labelLoginBambino">Numero speciale</label>
            <input type="text" className="inputFieldLoginBambino" />
          </div>
          <button className="loginButtonLoginBambino">ENTRA</button>
        </div>
      </div>
    </>
  );
}

export default LoginBambino;