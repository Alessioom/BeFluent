import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import Specialista from './models/Specialista.js'; // Assicurati che il tuo schema Specialista sia corretto
import { genSalt, hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config(); // Carica variabili d'ambiente


const app = express();
app.use(json());
app.use(cors());

// Connessione a MongoDB
connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ Connesso a MongoDB"))
  .catch(err => console.error(err));

// 📌 API per registrare uno specialista con password criptata
app.post('/registrazione/specialista', async (req, res) => {
    try {
        const { nome, cognome, email, username, password, confermaPassword } = req.body;
        if (password !== confermaPassword) {
            return res.status(400).json({ error: "Le password non coincidono!" });
        }
        const emailEsistente = await Specialista.findOne({ email });
        const usernameEsistente = await Specialista.findOne({ username });
        if (emailEsistente) return res.status(400).json({ error: "Email già registrata!" });
        if (usernameEsistente) return res.status(400).json({ error: "Username già esistente!" });
        
        // 🔒 CRITTOGRAFA la password prima di salvarla
        const salt = await genSalt(10);
        const passwordHash = await hash(password, salt);
        const nuovoSpecialista = new Specialista({
            nome,
            cognome,
            email: email.toLowerCase(),  // Converte l'email in minuscolo
            username,
            password: passwordHash // Salva la password crittografata
        });
        await nuovoSpecialista.save();
        res.status(201).json({ message: "✅ Specialista registrato con successo!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore durante la registrazione" });
    }
});

// 📌 API per effettuare il login di uno specialista
app.post('/login/specialista', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Trova lo specialista per email
        const specialista = await Specialista.findOne({ email: email.toLowerCase() });
        if (!specialista) {
            return res.status(400).json({ error: "Email non registrata!" });
        }
        // 🔑 Confronta la password inserita con quella salvata nel DB
        const passwordValida = await compare(password, specialista.password);
        if (!passwordValida) {
            return res.status(400).json({ error: "Password errata!" });
        }
        // 🔥 Genera un token JWT
        const token = jwt.sign(
            { id: specialista._id, email: specialista.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({ message: "✅ Login riuscito!", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore durante il login" });
    }
});


// Avviare il server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server avviato su http://localhost:${PORT}`));
