import React from 'react';
import { Link } from 'react-router-dom';

function RegistrazioneSpecialista() {
  return (
    <>
    {/* Pulsante REGISTRATI */}
      <Link to="/Registrazione/Specialista/Form">
        <button className="register-button">
            REGISTRATI
        </button>
      </Link>

    </>
  );
}

export default RegistrazioneSpecialista;