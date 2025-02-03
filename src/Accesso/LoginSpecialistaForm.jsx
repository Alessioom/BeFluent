import React from 'react';
import { Link } from 'react-router-dom';
import './LoginSpecialistaForm.css';

const LoginSpecialistaForm = () => {
  return (
    <>
      {/* Background */}
      <div className="bg-box" />

      {/* Back Button */}
      <button 
        className="back-button" 
        onClick={() => window.history.back()}
      >
        TORNA INDIETRO
      </button>

      {/* Profile Image (iconaDottore.png) */}
      <img 
        className="profile-image" 
        src="/iconaDottore.png" 
        alt="Dottore" 
      />

      {/* Main Image / Logo */}
      <img 
        src="/BeFluent_logo.png" 
        alt="Logo" 
        className="logoFormSpecialista" 
      />

      {/* Registration Section */}
      <div className="register-container">
        <div>Non hai un account?</div>
        <Link to="/Registrazione/Specialista/Form">
          <button>REGISTRATI</button>
        </Link>
      </div>

      {/* Form Section */}
      <div className="form-container">
        <div className="title">
          Accedi per scoprire strumenti e risorse pensati per aiutarti a sostenere i tuoi piccoli campioni. 🧩📚
        </div>

        <div className="input-group">
          <label htmlFor="email" className="input-label">Email</label>
          <input type="email" id="email" className="input-field" />
        </div>

        <div className="input-group">
          <label htmlFor="password" className="input-label">Password</label>
          <input type="password" id="password" className="input-field" />
        </div>

        <button className="submit-button">
          <span className="submit-text">ENTRA</span>
        </button>

        <Link to="/Psw/Dimenticata">
          <button className="forgot-password">
            <span className="forgot-text">PASSWORD DIMENTICATA</span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default LoginSpecialistaForm;
