import mongoose from 'mongoose';
import validator from "validator";

const SpecialistaSchema = new mongoose.Schema({
    specialistaId: { type: mongoose.Schema.Types.ObjectId, unique: true, default: () => new mongoose.Types.ObjectId() },
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    email: { type: String, 
        required: true, 
        unique: true,  
        validate: 
        {
            validator: function(v) {
                return validator.isEmail(v);  // Verifica se l'email è valida
            }
        },
        message: props => `${props.value} non è una email valida!` },
        
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //specialistaId: { type: String, required: false, unique: true }
});

const Specialista = mongoose.model("Specialista", SpecialistaSchema);

export default Specialista;