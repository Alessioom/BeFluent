import React, { useState } from 'react';
import './RegistrazioneSpecialistaForm.css';

const RegistrazioneSpecialistaForm = () => {
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
      <img src="/BeFluent_logo_omino.png" alt="Logo" className="logo-registrazione" />
      <img src="/BeFluent_logo_testo.png" alt="Logo" className="logoTesto-registrazione" />
      {/* Contenitore per il resto degli elementi, spostato verso l'alto */}
      <div className="registrazione-container">
        <h1>Registrati come Specialista</h1>

        <form onSubmit={handleSubmit} className="registrazione-form">
          {/* Prima riga: Nome e Cognome */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Inserisci il tuo nome"
              />
            </div>

            <div className="form-group">
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

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Inserisci la tua email"
              />
            </div>

            <div className="form-group">
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
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Crea una password"
              />
            </div>

            <div className="form-group">
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

          <button className="pulsanteRegistratiSpecialista" type="submit">Registrati</button>
        </form>

        {/* Pulsante "Torna Indietro" */}
        <div className="back-button" onClick={() => window.history.back()}>
          TORNA INDIETRO
        </div>
      </div>
    </>
  );
};

export default RegistrazioneSpecialistaForm;
