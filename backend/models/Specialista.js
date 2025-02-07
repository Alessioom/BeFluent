const mongoose = require('mongoose');

const SpecialistaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const emailNormalized = formData.email.toLowerCase();
// Confronta l'email con quella registrata nel database


const Specialista = mongoose.model("Specialista", SpecialistaSchema);
module.exports = Specialista;


