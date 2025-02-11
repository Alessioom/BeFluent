import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegistrazioneSpecialistaForm.css';
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";

const RegistrazioneSpecialistaForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    username: '',
    sesso: '',
    password: '',
    confermaPassword: '',
    //ID: ''
  });

  const [messaggio, setMessaggio] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  // Normalizza l'email in minuscolo
  const emailNormalizzata = formData.email.toLowerCase();

  // Crea una nuova copia dei dati del form con l'email normalizzata
  const formDataNormalizzato = { ...formData, email: emailNormalizzata };

  console.log("Dati inviati per la registrazione:", formDataNormalizzato);

    try {
      const res = await axios.post('http://localhost:5000/registrazione/specialista', formDataNormalizzato);
      setMessaggio(res.data.message);
      setTimeout(() => navigate('/login'), 2000); // Reindirizza dopo 2 secondi
    } catch (error) {
      console.error("Errore nella registrazione:", error);
      setMessaggio(error.response?.data?.error || "Errore durante la registrazione");
    }
  };

  return (
    <>
      <div>
        <LogoProfile 
          logoSrc="/BeFluent_logo_testo.png"
          profileSrc="/iconaDottore.png"
          logoClass="logoTesto-registrazioneSpecialista"
          profileClass="logoDottore-registrazioneSpecialista"
        />

        <div className="registrazione-containerSpecialista">
          <h1 className="titleRegistrazioneSpecialista">Registrati come Specialista</h1>

          <form onSubmit={handleSubmit} className="registrazioneSpecialista-form">
            <div className="form-rowRegistrazioneSpecialista">
              <div className="form-groupRegistrazioneSpecialista">
                <label htmlFor="nome">Nome</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
              </div>

              <div className="form-groupRegistrazioneSpecialista">
                <label htmlFor="cognome">Cognome</label>
                <input type="text" name="cognome" value={formData.cognome} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-groupRegistrazioneSpecialista">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-groupRegistrazioneSpecialista">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </div>

            <div className="form-groupRegistrazioneSpecialista">
            <label htmlFor="sesso">Sesso</label>
            <select name="sesso" value={formData.sesso} onChange={handleChange} required>
            <option value="">Seleziona il sesso</option>
            <option value="maschio">maschio</option>
            <option value="femmina">femmina</option>
            </select>
            </div>

            <div className="form-rowRegistrazioneSpecialista">
              <div className="form-groupRegistrazioneSpecialista">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
              </div>

              <div className="form-groupRegistrazioneSpecialista">
                <label htmlFor="confermaPassword">Conferma Password</label>
                <input type="password" name="confermaPassword" value={formData.confermaPassword} onChange={handleChange} required />
              </div>
            </div>



            {/*<div className="form-groupRegistrazioneSpecialista">
              <label htmlFor="ID">ID</label>
              <input type="text" name="ID" value={formData.ID} onChange={handleChange} required />
            </div>
*/}
              <button className="pulsanteRegistratiSpecialista" type="submit">
              Registrati
              </button>

          </form>

          {messaggio && <p>{messaggio}</p>}

          <BackButton onClick={() => navigate(-1)} />
        </div>
      </div>
    </>
  );
};

export default RegistrazioneSpecialistaForm;
