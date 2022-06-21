import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res) =>{
    const {nombre, email, password} = req.body;
    // Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne( {email: email} );
    if(existeUsuario){
        console.log(existeUsuario);
        const error = new Error("Usuario ya registrado");
        return res.status(400).json( {msg: error.message} );
    }
    
    try {
        //Guardar un nuevo veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();
        res.json( veterinarioGuardado );
    } catch (error) {
        console.log(error)
    }
    
}
const perfil = (req, res) =>{
    res.json( {url: "Desde API/VETERINARIOS/perfil"} )
};
export {registrar, perfil};