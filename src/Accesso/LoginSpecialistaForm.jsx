import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSpecialistaForm.css';
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";

const LoginSpecialistaForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [messaggio, setMessaggio] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login/specialista', formData);
      localStorage.setItem('token', res.data.token); // Salva il token nel localStorage
      setMessaggio(res.data.message);
      setTimeout(() => navigate('/Home/Specialista'), 2000);
    } catch (error) {
      setMessaggio(error.response?.data?.error || "Errore durante il login");
    }
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

          <form onSubmit={handleSubmit}>
            <div className="input-groupLoginSpecialista">
              <label htmlFor="email" className="input-labelLoginSpecialista">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="input-fieldLoginSpecialista" 
                aria-label="Email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="input-groupLoginSpecialista">
              <label htmlFor="password" className="input-labelLoginSpecialista">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                className="input-fieldLoginSpecialista" 
                aria-label="Password" 
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>

            <button type="submit" className="submit-buttonLoginSpecialista" aria-label="Login">
              ENTRA
            </button>
          </form>

          {messaggio && <p>{messaggio}</p>}

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

          <BackButton onClick={() => navigate(-1)} /> {/* Add the BackButton component */}
        </div>
      </div>
    </>
  );
};

export default LoginSpecialistaForm;
