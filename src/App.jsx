import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Login from './Accesso/Login'
import LoginBambino from './Accesso/LoginBambino'
import LoginSpecialistaForm from './Accesso/LoginSpecialistaForm'
import RegistrazioneSpecialista from './Accesso/RegistrazioneSpecialista'
import RegistrazioneSpecialistaForm from './Accesso/RegistrazioneSpecialistaForm'
import PswDimenticata from './Accesso/PswDimenticata';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/bambino" element={<LoginBambino />} />

      <Route path="/login/specialista/form" element={<LoginSpecialistaForm />} />
      <Route path="/Registrazione/Specialista" element={<RegistrazioneSpecialista />} />
      <Route path="/Registrazione/Specialista/Form" element={<RegistrazioneSpecialistaForm />} />
      <Route path="/Psw/Dimenticata" element={<PswDimenticata />} />
    </Routes>
  )
}

export default App;