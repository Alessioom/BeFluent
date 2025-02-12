import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import jwtDecode from 'jwt-decode';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        // Usa direttamente decoded.id (assicurati che il tuo backend includa l'ID nel payload del JWT)
        return { token: storedToken, specialistaId: decoded.id };
      } catch (error) {
        console.error("Errore nella decodifica del token:", error);
        localStorage.removeItem('token'); // Rimuovi il token non valido
        return { token: null, specialistaId: null }; //Imposta a null in caso di errore
      }
    }
    return { token: null, specialistaId: null };
  });


    const login = (newToken) => {
    localStorage.setItem('token', newToken);
        try{
            const decoded = jwtDecode(newToken);
            setAuth({ token: newToken, specialistaId: decoded.id }); // Aggiorna lo stato
        }
        catch(error){
            console.error("Errore: ", error);
            localStorage.removeItem('token');
            setAuth({token: null, specialistaId: null});
             navigate('/login'); //Reindirizza al login in caso di errore
        }
    };

  const logout = () => {
    localStorage.removeItem('token'); // Rimuovi da localStorage
    setAuth({ token: null, specialistaId: null });  // Resetta lo stato
    navigate('/login'); // Reindirizza al login
  };

  // useEffect per gestire il cambio di token (ad esempio, dopo il cambio password)
    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        // Se c'è un token in localStorage e non è uguale a quello nello stato, oppure non c'è uno specialistaId nello stato
        if ((storedToken && storedToken !== auth.token) || !auth.specialistaId ) {
            if(storedToken){
                 try {
                    const decoded = jwtDecode(storedToken);
                    setAuth({ token: storedToken, specialistaId: decoded.id });
                } catch (error) {
                    console.error("Errore nella decodifica del token:", error);
                    localStorage.removeItem('token');
                    setAuth({ token: null, specialistaId: null });
                    navigate('/login'); //Reindirizza al login.
                }
            }
            else{
                setAuth({ token: null, specialistaId: null }); //se non c'è un token nello storage, setta lo stato a null
            }
        }
    }, [auth.token, navigate, auth.specialistaId]); // Aggiungi navigate alle dipendenze



  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};