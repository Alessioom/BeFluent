import React from 'react';
import { Link } from 'react-router-dom';
import './NavButton.css'; 

const NavButton = ({ to, text, className, onClick }) => {
    const handleClick = (e) => {  // Gestore di eventi interno
        if (onClick) { // Verifica se onClick è stato fornito
          onClick(e); // Esegui la funzione onClick passata come prop
        }
      };

  return (
    <Link to={to} onClick={handleClick}>  {/* Aggiungi onClick qui */}
      <div className={`nav-button-elenco ${className}`}>
        <div className="button-text">{text}</div>
      </div>
    </Link>
  );
};

export default NavButton;