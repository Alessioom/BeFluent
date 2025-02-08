import mongoose from 'mongoose';

const SpecialistaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialistaId: { type: mongoose.Schema.Types.ObjectId, ref: "Specialista", unique: true }
});

const Specialista = mongoose.model("Specialista", SpecialistaSchema);

export default Specialista;