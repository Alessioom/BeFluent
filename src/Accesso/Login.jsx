import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  return (
    <div className="login-page">
      <img
        src="/BeFluent_logo.png"
        alt="Logo"
        className="logo"
      />
      
      <div className="intro">
        Pronti a scoprire un mondo dove le parole diventano magiche? <br />
        Scegli il tuo percorso e inizia l'avventura! 🌟
      </div>
      
      <div className="button-container">
        <div className="sectionBambino">
          <p>
            Ehi, piccolo eroe delle parole, entra nel tuo mondo magico e gioca imparando!
          </p>
          <Link to="/login/bambino">
            <button className="pulsanteBambino">
              BAMBINO 🧩✨
            </button>
          </Link>
        </div>
        <div className="sectionSpecialista">
          <p>
            Scopri strumenti e risorse per aiutare i tuoi piccoli a crescere fluentemente
          </p>
          <Link to="/Login/Specialista/Form">
            <button className="pulsanteSpecialista">
              SPECIALISTA 🛠️✨
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
