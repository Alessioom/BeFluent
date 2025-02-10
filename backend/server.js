import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import Specialista from './models/Specialista.js'; 
import { genSalt, hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Bambino from './models/Bambino.js'; 


dotenv.config(); // Carica variabili d'ambiente

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Estrae il token dal campo "Authorization"

    if (!token) {
        return res.status(403).json({ error: "Token mancante!" });  // Se non c'è token, ritorna errore
    }

    try {
        // Decodifica il token JWT usando la chiave segreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Aggiungi i dati decodificati (id, email) all'oggetto req
        next();  // Passa al prossimo middleware o route handler
    } catch (error) {
        console.error("Errore di decodifica del token:", error);
        res.status(401).json({ error: "Token non valido!" });  // Se il token non è valido, ritorna errore
    }
};

const app = express();
app.use(json());
app.use(cors());

// Connessione a MongoDB
connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ Connesso a MongoDB"))
  .catch(err => console.error(err));

  import validator from 'validator';

  app.post('/registrazione/specialista', async (req, res) => {
      try {
          const { nome, cognome, email, username, password, confermaPassword /*, specialistaId */ } = req.body;
  
          if (password !== confermaPassword) {
              return res.status(400).json({ error: "Le password non coincidono!" });
          }
  
          // Verifica se l'email è valida
          if (!validator.isEmail(email)) {
              return res.status(400).json({ error: "Email non valida!" });
          }
  
          const emailEsistente = await Specialista.findOne({ email });
          const usernameEsistente = await Specialista.findOne({ username });
          //const specialistaIdEsistente = await Specialista.findOne({ specialistaId });
          if (emailEsistente) return res.status(400).json({ error: "Email già registrata!" });
          if (usernameEsistente) return res.status(400).json({ error: "Username già esistente!" });
          // if (specialistaIdEsistente) return res.status(400).json({ error: "ID già utilizzato!" });
  
          // 🔒 CRITTOGRAFA la password prima di salvarla
          console.log('Dati ricevuti:', req.body);
          const salt = await genSalt(10);
          console.log('Salt generato:', salt);
          const passwordHash = await hash(password, salt);
          console.log('Password hashata:', passwordHash);
  
          const nuovoSpecialista = new Specialista({
              nome,
              cognome,
              email: email.toLowerCase(),  // Converte l'email in minuscolo
              username,
              password: passwordHash, // Salva la password crittografata
              //specialistaId, // Salva l'ID fornito dall'utente
          });
          await nuovoSpecialista.save();
          res.status(201).json({ message: "✅ Specialista registrato con successo!" });
      } catch (error) {
          if (error.name === 'ValidationError') {
              // Se c'è un errore di validazione (come email non valida), invia un messaggio specifico
              res.status(400).json({ error: error.message });
          } else {
              res.status(500).json({ error: "Errore durante la registrazione" });
          }
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
            { id: specialista._id, email: specialista.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({ 
            message: "✅ Login riuscito!", 
            token, 
            specialistaId: specialista._id  // Ritorna l'ID dello specialista
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore durante il login" });
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
        const bambino = await Bambino.findOne({ ID });

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

app.get('/bambini', authMiddleware, async (req, res) => {
    try {
        const specialistaId = req.user.id;
        const bambini = await Bambino.find({ specialistaId });
        res.json(bambini);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore nel recupero dei bambini" });
    }
});


// 📌 API per recuperare un bambino per ID
app.get('/bambino/:id', async (req, res) => {
    try {
        const bambino = await Bambino.findById(req.params.id);
        if (!bambino) {
            return res.status(404).json({ error: 'Bambino non trovato' });
        }
        res.json(bambino);
    } catch (error) {
        res.status(500).json({ error: 'Errore nel recupero del bambino' });
    }
});

// Avviare il server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server avviato su http://localhost:${PORT}`));
