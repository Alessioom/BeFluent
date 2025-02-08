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
//import Home from './Home';  // Componenti per le varie pagine
//import Report from './Report';
//import Logout from './Logout';
import { AuthProvider } from './Accesso/AuthContext';




function App() {
  return (
    <AuthProvider>  {/* Avvolgi tutto l'applicativo con il provider */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/bambino" element={<LoginBambino />} />
      <Route path="/home/specialista/:specialistaId" element={<HomeSpecialista />} />
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
      <Route path="/home/bambini" element={<HomeBambini />} />
    </Routes>
    </AuthProvider>
  )
}

export default App;