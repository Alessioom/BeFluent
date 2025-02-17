import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import Specialista from './models/Specialista.js'; 
import { genSalt, hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Bambino from './models/Bambino.js'; 
import mongoose from 'mongoose';
import validator from 'validator';

dotenv.config(); // Carica variabili d'ambiente

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Estrae il token dal campo "Authorization"

    console.log("Token ricevuto:", token);  // Log per verificare il token

    if (!token) {
        return res.status(403).json({ error: "Token mancante!" });  // Se non c'è token, ritorna errore
    }

    try {
        // Decodifica il token JWT usando la chiave segreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Aggiungi i dati decodificati (id, email) all'oggetto req
        console.log("Token decodificato:", decoded);  // Log per vedere i dati decodificati
        next();  // Passa al prossimo middleware o route handler
    } catch (error) {
        console.error("Errore di decodifica del token:", error);
        res.status(401).json({ error: "Token non valido!" });  // Se il token non è valido, ritorna errore
    }
};


const app = express();
app.use(json());
app.use(cors());


// Connessione a MongoDB (NUOVO senza errori)
connect(process.env.MONGO_URI) // Rimuovi le opzioni
  .then(() => console.log("✅ Connesso a MongoDB"))
  .catch(err => console.error(err));

// Connessione a MongoDB
/*connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ Connesso a MongoDB"))
  .catch(err => console.error(err));*/



  app.post('/registrazione/specialista', async (req, res) => {
      try {
          const { nome, cognome, email, username, password, confermaPassword, sesso /*, specialistaId */ } = req.body;
  
        // 1. CONTROLLO PASSWORD UGUALI
        if (password !== confermaPassword) {
            return res.status(400).json({ error: "Le password non coincidono!" });
        }

        // 2. VALIDAZIONE EMAIL
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Email non valida!" });
        }

        // 3. VALIDAZIONE PASSWORD COMPLESSA - *LE STESSE REGOLE DEL FRONTEND*
        if (password.length < 8) {
            return res.status(400).json({ error: "La password deve contenere almeno 8 caratteri." });
        }
        if (!/[a-z]/.test(password)) {
            return res.status(400).json({ error: "La password deve contenere almeno un carattere minuscolo." });
        }
        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({ error: "La password deve contenere almeno un carattere maiuscolo." });
        }
        if (!/[0-9]/.test(password)) {
            return res.status(400).json({ error: "La password deve contenere almeno un numero." });
        }
        if (!/[^a-zA-Z0-9]/.test(password)) {
            return res.status(400).json({ error: "La password deve contenere almeno un carattere speciale." });
        }
        // --- FINE VALIDAZIONE PASSWORD ---
  
        // 4. CONTROLLO EMAIL/USERNAME GIA' ESISTENTI
        const emailEsistente = await Specialista.findOne({ email });
        const usernameEsistente = await Specialista.findOne({ username });
        //const specialistaIdEsistente = await Specialista.findOne({ specialistaId });
        if (emailEsistente) return res.status(400).json({ error: "Email già registrata!" });
        if (usernameEsistente) return res.status(400).json({ error: "Username già esistente!" });
        // if (specialistaIdEsistente) return res.status(400).json({ error: "ID già utilizzato!" });
  
          // 5. 🔒 CRITTOGRAFA (HASHING) la password prima di salvarla
          console.log('Dati ricevuti:', req.body);
          const salt = await genSalt(10);
          console.log('Salt generato:', salt);
          const passwordHash = await hash(password, salt);
          console.log('Password hashata:', passwordHash);
  
          // 6. CREAZIONE DEL NUOVO SPECIALISTA
          const nuovoSpecialista = new Specialista({
              nome,
              cognome,
              email: email.toLowerCase(),  // Converte l'email in minuscolo
              username,
              password: passwordHash, // Salva la password crittografata
              sesso,
              //specialistaId, // Salva l'ID fornito dall'utente
          });

          await nuovoSpecialista.save();
          res.status(201).json({ message: "✅ Specialista registrato con successo!" });

      } catch (error) {
        // Gestione degli errori 
          if (error.name === 'ValidationError') {
              // Se c'è un errore di validazione (come email non valida), invia un messaggio specifico
              res.status(400).json({ error: error.message });
          } else {
              res.status(500).json({ error: "Errore durante la registrazione" });
          }
          console.error(error);
      }
  });
  

// 📌 API per effettuare il login di uno specialista
app.post('/login/specialista', async (req, res) => {
    try {
        const { email, password } = req.body;
        const specialista = await Specialista.findOne({ email: email.toLowerCase() });
        if (!specialista) {
            return res.status(400).json({ error: "Email non registrata!" });
        }
        const passwordValida = await compare(password, specialista.password);
        if (!passwordValida) {
            return res.status(400).json({ error: "Password errata!" });
        }
        const token = jwt.sign(
            { id: specialista._id, email: specialista.email, nome: specialista.nome },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({ 
            message: "✅ Login riuscito!", 
            token, 
            specialistaId: specialista._id,  // Ritorna l'ID dello specialista
            nome: specialista.nome  // Ritorna il nome dello specialista

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore durante il login" });
    }
});


app.put('/specialista/update/:id', authMiddleware, async (req, res) => {
    try {
        const specialistaId = req.user.id; // Ottiene l'ID dal token JWT
        const { nome, cognome, email, telefono } = req.body;

        console.log("Dati ricevuti per l'aggiornamento:", { nome, cognome, email, telefono });

        // Verifica se l'email è valida
        if (email && !validator.isEmail(email)) {
            return res.status(400).json({ error: "Email non valida!" });
        }

        // Verifica se l'email o il telefono esistono già (evita duplicati)
        if (email) {
            const emailEsistente = await Specialista.findOne({ email, _id: { $ne: specialistaId } });
            if (emailEsistente) {
                return res.status(400).json({ error: "Email già in uso!" });
            }
        }

        if (telefono) {
            const telefonoEsistente = await Specialista.findOne({ telefono, _id: { $ne: specialistaId } });
            if (telefonoEsistente) {
                return res.status(400).json({ error: "Numero di telefono già in uso!" });
            }
        }

        // Aggiorna solo i campi ricevuti
        const specialistaAggiornato = await Specialista.findByIdAndUpdate(
            specialistaId,
            { $set: { nome, cognome, email, telefono } },
            { new: true } // Restituisce il documento aggiornato
        );
        console.log("Specialista aggiornato nel database:", specialistaAggiornato);

        if (!specialistaAggiornato) {
            return res.status(404).json({ error: "Specialista non trovato!" });
        }

        console.log("Specialista aggiornato:", specialistaAggiornato); // Log per conferma

        res.status(200).json({ message: "✅ Profilo aggiornato con successo!", specialista: specialistaAggiornato });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore durante l'aggiornamento del profilo" });
    }
});



// 📌 API per ottenere i dati dello specialista
app.get('/specialista/:id', authMiddleware, async (req, res) => {
    try {
        const specialistaId = req.params.id; // Ottiene l'ID dallo URL
        const specialista = await Specialista.findById(specialistaId);
        if (!specialista) {
            return res.status(404).json({ error: "Specialista non trovato!" });
        }
        res.status(200).json(specialista); // Risponde con i dati dello specialista
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore nel recupero dei dati dello specialista" });
    }
});

// 📌 API per cambiare la password dello specialista
app.put('/specialista/update-password', authMiddleware, async (req, res) => {
    try {
        const specialistaId = req.user.id; // Ottiene l'ID dal token
        const { oldPassword, newPassword } = req.body;

        console.log('ID dello specialista:', specialistaId);

        const specialista = await Specialista.findById(specialistaId);
        if (!specialista) {
            return res.status(404).json({ error: "Specialista non trovato!" });
        }

        const isMatch = await compare(oldPassword, specialista.password);
        if (!isMatch) {
            return res.status(400).json({ error: "La vecchia password è errata!" });
        }

        //  VALIDAZIONE DELLA NUOVA PASSWORD
        if (newPassword.length < 8) {
            return res.status(400).json({ error: "La nuova password deve contenere almeno 8 caratteri." });
        }
        if (!/[a-z]/.test(newPassword)) {
            return res.status(400).json({ error: "La nuova password deve contenere almeno un carattere minuscolo." });
        }
        if (!/[A-Z]/.test(newPassword)) {
            return res.status(400).json({ error: "La nuova password deve contenere almeno un carattere maiuscolo." });
        }
        if (!/[0-9]/.test(newPassword)) {
            return res.status(400).json({ error: "La nuova password deve contenere almeno un numero." });
        }
        if (!/[^a-zA-Z0-9]/.test(newPassword)) {
            return res.status(400).json({ error: "La nuova password deve contenere almeno un carattere speciale." });
        }
        //  FINE VALIDAZIONE 

        // Log per il debug
        console.log("Cambio password per specialista:", specialistaId);
        console.log("Vecchia password validata con successo.");

        const salt = await genSalt(10);
        const newHashedPassword = await hash(newPassword, salt);

        // Log per tracciare l'aggiornamento
        console.log("Nuova password crittografata.");

        specialista.password = newHashedPassword;

        await specialista.save();

        res.status(200).json({ message: "✅ Password cambiata con successo!" });
        
    } catch (error) {
        console.error("Errore durante il cambio della password:", error);
        res.status(500).json({ error: "Errore durante il cambio della password" });
    }
});



// 📌 API per registrare un bambino
app.post('/registrazione/bambino', authMiddleware, async (req, res) => {
    try {
        console.log(req.body);
        const { nome, cognome, dataDiNascita, sesso, emailGenitore, ID } = req.body;

        // L'ID dello specialista viene preso dal token JWT
        const specialistaId = req.user.id; 

        if (!specialistaId) {
            return res.status(400).json({ error: 'ID dello specialista non trovato!' });
        }

        // Controllo se il bambino esiste già con quell'email
        const bambinoEsistente = await Bambino.findOne({ emailGenitore, specialistaId });
        if (bambinoEsistente) return res.status(400).json({ error: "Bambino già registrato per questo specialista!" });

        const nuovoBambino = new Bambino({
            nome,
            cognome,
            dataDiNascita,
            sesso,
            emailGenitore,
            ID,
            specialistaId // Salva l'ID dello specialista nel database
        });

        await nuovoBambino.save();
        res.status(201).json({ message: "✅ Bambino registrato con successo!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore durante la registrazione" });
    }
});


// 📌 API per effettuare il login di un bambino
app.post('/login/bambino', async (req, res) => {
    const { ID } = req.body;

    try {
        const bambino = await Bambino.findOne({ ID, isDeleted: false });

        if (!bambino) {
            return res.status(400).json({ error: 'ID non trovato' });
        }

        res.json({ 
            message: 'Login riuscito',
            bambinoId: bambino._id  // 🔥 Assicurati che il server restituisca questo campo!
        });

    } catch (error) {
        res.status(500).json({ error: 'Errore del server' });
    }
});

app.get('/bambini/', authMiddleware, async (req, res) => {
    try {
        const specialistaId = req.user.id;
        const bambini = await Bambino.find({ specialistaId, isDeleted: false });
        res.json(bambini);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore nel recupero dei bambini" });
    }
});


// 📌 API per recuperare un bambino per ID
app.get('/bambino/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID bambino non valido' });
        }

        const bambino = await Bambino.findById(id).where('isDeleted').equals(false); // findById, non findBy

        console.log("Bambino trovato (o null):", bambino);

        if (!bambino) {
            return res.status(404).json({ error: 'Bambino non trovato' });
        }
        console.log("Sto per inviare la risposta JSON");
        res.json(bambino);
        console.log("Risposta JSON inviata");
    } catch (error) {
        console.error("Errore nel recupero del bambino:", error);
        res.status(500).json({ error: 'Errore nel recupero del bambino', details: error.message, stack: error.stack });
    }
});

// 📌 API per eliminare il bambino (SOFT DELETE)
app.delete('/bambino/:id', async (req, res) => {
    try {
      const bambinoId = req.params.id;
      
      // Esegui il soft delete (aggiorna il flag isDeleted)
      const bambino = await Bambino.findByIdAndUpdate(
        bambinoId, 
        { isDeleted: true }, 
        { new: true }  // Restituisci il bambino aggiornato
      );
      
      if (!bambino) {
        return res.status(404).json({ message: "Bambino non trovato" });
      }
  
      res.status(200).json({ message: "Bambino eliminato (soft delete)" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Errore nell'eliminazione del bambino" });
    }
  });


 

// Avviare il server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server avviato su http://localhost:${PORT}`));
