import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './Home';
import Login from './Accesso/Login';
import LoginBambino from './Accesso/LoginBambino';
import LoginSpecialistaForm from './Accesso/LoginSpecialistaForm';
import RegistrazioneSpecialista from './Accesso/RegistrazioneSpecialista';
import RegistrazioneSpecialistaForm from './Accesso/RegistrazioneSpecialistaForm';
import PswDimenticata from './Accesso/PswDimenticata';
import HomeSpecialista from './Specialista/HomeSpecialista';
import ElencoBambini from './Specialista/ElencoBambini'; 
import Logout from './Specialista/Logout';
import Impostazioni from './Specialista/Impostazioni';
import NavButton from './Components/UI/NavButton';
import RegistrazioneBambino from './Specialista/RegistrazioneBambino';
import HomeBambini from './Bambini/HomeBambini';
import CambioPsw from './Specialista/CambioPsw';
//import Home from './Home';  // Componenti per le varie pagine
//import Report from './Report';
//import Logout from './Logout';
import { AuthProvider } from './Accesso/AuthContext';
import PaginaBambino from './Specialista/PaginaBambino'
import EserciziGiornalieri from './Bambini/EserciziGiornalieri';
import GiudizioOrtografico1 from './Bambini/GiudizioOrtografico1';
import AbbinamentoParole1 from './Bambini/AbbinamentoParole1';
import AbbinamentoParoleIntro from './Bambini/AbbinamentoParoleIntro';




function App() {
  return (
    <AuthProvider>  {/* Avvolgi tutto l'applicativo con il provider */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/bambino" element={<LoginBambino />} />
      <Route path="/Home/Specialista/:specialistaId" element={<HomeSpecialista />} />
      <Route path="/login/specialista/form" element={<LoginSpecialistaForm />} />
      <Route path="/Registrazione/Specialista" element={<RegistrazioneSpecialista />} />
      <Route path="/Registrazione/Specialista/Form" element={<RegistrazioneSpecialistaForm />} />
      <Route path="/Psw/Dimenticata" element={<PswDimenticata />} />
      <Route path="/Home/Specialista" element={<HomeSpecialista />} />
      <Route path="/Elenco/Bambini" element={<ElencoBambini />} />
      <Route path="/Logout" element={<Logout />} />
      <Route path="/Elenco/Bambini/refresh" element={<></>} /> {/* Questa rotta non mostrerà nulla */}
      <Route path="/Impostazioni" element={<Impostazioni />} />
      <Route path="/Registrazione/Bambino" element={<RegistrazioneBambino />} />
      <Route path="/Home/Bambini" element={<HomeBambini />} />
      <Route path="/Cambio/Psw" element={<CambioPsw />} />
      <Route path="/Pagina/Bambino/:id" element={<PaginaBambino />} />
      <Route path="/Esercizi/Giornalieri" element={<EserciziGiornalieri />} />
      <Route path="/Giudizio/Ortografico/1" element={<GiudizioOrtografico1 />} />
      <Route path="/Abbinamento/Parole/1" element={<AbbinamentoParole1 />} />
      <Route path="/Abbinamento/Parole/Intro" element={<AbbinamentoParoleIntro />} />
    </Routes>
    </AuthProvider>
  )
}

export default App;