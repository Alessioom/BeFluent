import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginSpecialistaForm.css';
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";

const LoginSpecialistaForm = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/Home/Specialista');
  };

  const handleBack = () => {
    navigate(-1); // Navigate back one step in history
  };

  return (
    <>
      {/* Logo posizionato a destra in modo assoluto */}
      <div>
        <LogoProfile 
          logoSrc="/BeFluent_logo_testo.png"
          profileSrc="/iconaDottore.png"
          logoClass="logoTesto-registrazioneSpecialista"
          profileClass="logoDottore-registrazioneSpecialista"
        />
      </div>

      <div className="loginSpecialista-container">
        {/* Background */}
        <div className="bg-box-LoginSpecialista" />

        {/* Logo e Immagini */}
        <div className="logo-container-LoginSpecialista">
          <img src="/BeFluent_logo_omino.png" alt="Logo" className="logoOminoLoginSpecialista" />
          <img src="/BeFluent_logo_testo.png" alt="Logo" className="logoTestoLoginSpecialista" />
        </div>

        {/* Form di Login */}
        <div className="form-containerLoginSpecialista">
          <h2 className="titlePaginaLoginSpecialista">
            Accedi per scoprire strumenti e risorse pensati per aiutarti a sostenere i tuoi piccoli campioni. 🧩📚
          </h2>

          <div className="input-groupLoginSpecialista">
            <label htmlFor="email" className="input-labelLoginSpecialista">Email</label>
            <input type="email" id="email" className="input-fieldLoginSpecialista" aria-label="Email" />
          </div>

          <div className="input-groupLoginSpecialista">
            <label htmlFor="password" className="input-labelLoginSpecialista">Password</label>
            <input type="password" id="password" className="input-fieldLoginSpecialista" aria-label="Password" />
          </div>

          <button className="submit-buttonLoginSpecialista" onClick={handleLogin} aria-label="Login">
            ENTRA
          </button>

          <Link to="/Psw/Dimenticata">
            <button className="forgot-passwordLoginSpecialista" aria-label="Password dimenticata">
              PASSWORD DIMENTICATA
            </button>
          </Link>

          {/* Sezione Registrazione dentro il form */}
          <div className="register-containerLoginSpecialista">
            <span>Non hai un account?</span>
            <Link to="/Registrazione/Specialista/Form">
              <button className="register-buttonLoginSpecialista">REGISTRATI</button>
            </Link>
          </div>

          <BackButton onClick={handleBack} /> {/* Add the BackButton component */}
        </div>
      </div>
    </>
  );
};

export default LoginSpecialistaForm;
