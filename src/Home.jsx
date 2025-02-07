import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <>
      <div>  
        <img src="BeFluent_logo.png" alt="BeFluent Logo" 
        className="logoBeFluentInizio"
        /> 
        <img src="robotPulsante.png" alt="Robot che sorregge pulsante"
        className="robotPulsanteInizio"
        />
      </div>
      
      <div className="titoloBenvenuto">
        Benvenuto!
      </div>
      <Link to="/login">
        <button className="login-button">
          Clicca qui per andare avanti
        </button>
      </Link>

    </>
  );
}

export default Home;