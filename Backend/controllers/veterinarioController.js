import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarID from "../helpers/generadorID.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

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
        //Enviar el email de configuracion
        emailRegistro( { email, nombre, token: veterinarioGuardado.token } )
        res.json( veterinarioGuardado );
    } catch (error) {
        console.log(error)
    }
}
const perfil = (req, res) => {
    const { veterinario } = req;
    res.json( {veterinario} );
};

const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Veterinario.findOne({token: token});
    if( !usuarioConfirmar ){
        const error = new Error("Token no válido");
        return res.status(404).json({ msg: error.message } );
    }
    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.json( {msg: "Usuario confirmado correctamente"} );
    } catch (error) {
        console.log(error)
    }
}
const autenticar = async (req, res) =>{
    const { email, password } = req.body;
    // Comprobar si el usuario existe
    const usuario = await Veterinario.findOne( {email} );
    if(!usuario){
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message})
    }
    //Comprobar si el usuario está confirmado
    if(!usuario.confirmado){
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json( {msg: error.message} );
    }
    //Revisar el password
    if(await usuario.comprobarPassword(password)){
        res.json({ token: generarJWT(usuario.id)})
    }
    else{
        const error = new Error("El password es incorrecto");
        return res.status(403).json( {msg: error.message} )
    }
}
const olvidePassword = async (req, res) =>{
    const { email } = req.body;
    const existeVeterinario = await Veterinario.findOne( {email} );
    if( !existeVeterinario ){
        const error = new Error("El usuario no existe");
        return res.status(400).json({ msg: error.message });
    }
    try {
        existeVeterinario.token = generarID();
        await existeVeterinario.save();
        emailOlvidePassword( { email, nombre: existeVeterinario.nombre, token: existeVeterinario.token } )

        res.json( {msg: "Hemos enviado un email con las instrucciones"} )
    } catch (error) {
        console.log("Hay error");
        console.log(error);
    }
}
const comprobarToken = async (req, res) =>{
    const { token } = req.params // Usamos params porque estamos leyendo de la URL
    const tokenValido = await Veterinario.findOne({token});   // Verificamos que usuario fue el que solicitó el cambio de password
    if(tokenValido){
        //El token es válido el usuario existe
        res.json( {msg: "Token válido, el usuario existe"} );
    }
    else{
        const error = new Error("Token no válido");
        return res.status(400).json( {msg: error.message} );
    }
}
const nuevoPassword = async (req, res) =>{
    const { token } = req.params;
    const { password } = req.body;
    const veterinario = await Veterinario.findOne({token:token});
    if( !veterinario){
        const error = new Error("Hubo un error");
        return res.status(400).json( {msg: error.message} );
    }
    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({ msg: "Password modificado correctamente"});
        console.log(veterinario);
    } catch (error) {
        console.log(error)
    }
}

export {registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword};