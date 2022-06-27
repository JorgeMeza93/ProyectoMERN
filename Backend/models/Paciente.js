import mongoose from "mongoose";

const pacienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    propietario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now()
    },
    sintomas:{
        type: String,
        required: true
    },
    veterinario: {
        type: mongoose.Schema.Types.ObjectId,   // <-- Para relacionar el id del veterinario con su paciente
        ref: "Veterinario"     // <--- Referencia al modelo de veterinario
    },

},
{
    timestamps: true
});

const Paciente = mongoose.model("Paciente", pacienteSchema);
export default Paciente;