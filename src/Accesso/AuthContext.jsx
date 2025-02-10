import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import mongoose from 'mongoose';

// Crea il contesto di autenticazione
const AuthContext = createContext();

// Hook per usare il contesto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider che gestisce il contesto
export const AuthProvider = ({ children }) => {
  // Inizializzazione dell'oggetto auth
  const [auth, setAuth] = useState({ specialistaId: null, token: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const getSpecialistaId = async () => {
        try {
          const response = await axios.get('http://localhost:5000/bambini/specialista', {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          if (response && response.data && response.data.specialistaId) {
            const specialistaId = response.data.specialistaId;
  
            // Validazione lato frontend (lunghezza di un ObjectId di MongoDB)
            const isValidId = typeof specialistaId === 'string' && specialistaId.length === 24 && /^[a-fA-F0-9]+$/.test(specialistaId);
  
            if (!isValidId) {
              console.log("Errore: ID dello specialista non valido!");
              setAuth({ token: null, specialistaId: null });
              localStorage.removeItem('token');
              return;
            }
  
            // Se è valido, lo salviamo nello stato
            setAuth({ token, specialistaId });
          } else {
            console.log("Errore: ID dello specialista non trovato!");
            setAuth({ token: null, specialistaId: null });
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.log('Errore durante il recupero dell\'ID dello specialista', error);
          setAuth({ token: null, specialistaId: null });
          localStorage.removeItem('token');
        }
      };
  
      getSpecialistaId();
    } else {
      console.log("Nessun token trovato, non puoi accedere.");
    }
  }, []);

  // Funzione di login
  const login = (token, specialistaId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('specialistaId', specialistaId); // Salva anche l'ID dello specialista
    setAuth({ token, specialistaId });
};


  // Funzione di logout
  const logout = () => {
    setAuth({ token: null, specialistaId: null });
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
