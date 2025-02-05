import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegistrazioneSpecialistaForm.css';
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";



const RegistrazioneSpecialistaForm = () => {

  const navigate = useNavigate(); // Initialize useNavigate

  const handleBack = () => {
    navigate(-1); // Navigate back one step in history
  };


  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    username: '',
    password: '',
    confermaPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Inserisci qui la logica per l'invio del form (ad es. chiamata API)
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
      
      {/* Contenitore per il resto degli elementi, spostato verso l'alto */}
      <div className="registrazione-containerSpecialista">
        <h1 className="titleRegistrazioneSpecialista">Registrati come Specialista</h1>

        <form onSubmit={handleSubmit} className="registrazioneSpecialista-form">
          {/* Prima riga: Nome e Cognome */}
          <div className="form-rowRegistrazioneSpecialista">
            <div className="form-groupRegistrazioneSpecialista">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Inserisci il tuo nome"
              />
            </div>

            <div className="form-groupRegistrazioneSpecialista">
              <label htmlFor="cognome">Cognome</label>
              <input
                type="text"
                name="cognome"
                value={formData.cognome}
                onChange={handleChange}
                placeholder="Inserisci il tuo cognome"
              />
            </div>
          </div>

          {/* Seconda riga: Email e Username */}
          <div className="form-groupRegistrazioneSpecialista">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Inserisci la tua email"
            />
          </div>

          <div className="form-groupRegistrazioneSpecialista">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Crea un username"
            />
          </div>

          {/* Terza riga: Password e Conferma Password */}
          <div className="form-rowRegistrazioneSpecialista">
            <div className="form-groupRegistrazioneSpecialista">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Crea una password"
              />
            </div>

            <div className="form-groupRegistrazioneSpecialista">
              <label htmlFor="confermaPassword">Conferma Password</label>
              <input
                type="password"
                name="confermaPassword"
                value={formData.confermaPassword}
                onChange={handleChange}
                placeholder="Conferma la tua password"
              />
            </div>
          </div>

          <button className="pulsanteRegistratiSpecialista" type="submit">
            Registrati
          </button>
        </form>

        {/* Pulsante "Torna Indietro" */}
        <BackButton onClick={handleBack} />
        
      </div>
      </div>
    </>
  );
};

export default RegistrazioneSpecialistaForm;
