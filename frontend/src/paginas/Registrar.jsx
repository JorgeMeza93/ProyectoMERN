import { React, useState} from 'react';
import { Link } from "react-router-dom";
import Alerta from '../componentes/Alerta';
import axios from "axios";

const Registrar = () => {
  const [ nombre, setNombre ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ repetirPassword, setRepetirPassword] = useState("");
  const [ alerta, setAlerta ] = useState( {} )

  const handleSubmit = async e => {
    e.preventDefault();
    if( [nombre, email, password, repetirPassword].includes("") ){
      setAlerta({ msg: "Hay campos vacíos", error: true });
      return;
    }
    if( password !== repetirPassword ){
      setAlerta({ msg: "Los passwords no son iguales", error: true });
      return;
    }
    if( password.length < 8 ){
      setAlerta({ msg: "El password es muy corto", error: true });
      return;
    }
    setAlerta({});
    //CREAR EL USUARIO EN LA API
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios`;
      await axios.post(url, {nombre, email, password});
      setAlerta( {msg: "Registrado correctamente, verifica tu email", error: false } );
    } catch (error) {
      setAlerta( { msg: error.response.data.msg, error: true} )
    }

  }
  const { msg } = alerta
  return (
    <>
        <div>
            <h1 className='text-indigo-600 font-black text-6xl'>Crea tu Cuenta y Administra {""}<span className='text-black'>tus pacientes</span></h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg py-10 px-5 rounded-xl bg-white'>
            { msg && <Alerta alerta={alerta} /> }
            <form onSubmit={ handleSubmit}>
                <div className="my-5">
                    <label className='uppercase text-gray-600 block text-lg font-bold' htmlFor="">Nombre</label>
                    <input type="text" placeholder='Tu nombre' className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' value={nombre}
                      onChange={ e => setNombre(e.target.value) }
                    />
                </div>
                <div className="my-5">
                    <label className='uppercase text-gray-600 block text-lg font-bold' htmlFor="">Email</label>
                    <input type="email" placeholder='Tu Email' className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' value={email}
                      onChange={ e => setEmail(e.target.value) }
                    />
                </div>
                <div className="my-5">
                    <label className='uppercase text-gray-600 block text-lg font-bold' htmlFor="">Password</label>
                    <input type="password" placeholder='Tu Password' className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' value={password}
                      onChange={ e => setPassword(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label className='uppercase text-gray-600 block text-lg font-bold' htmlFor="">Repetir Password</label>
                    <input type="password" placeholder='Repite Password' className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' value={repetirPassword}
                      onChange={ e => setRepetirPassword(e.target.value)}
                    />
                </div>
                <input type="submit" value="Crear Cuenta" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'/>
            </form>
            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link to="/" className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? Registrate</Link>
                <Link to="/olvide-password" className='block text-center my-5 text-gray-500'>Olvidaste tu password</Link>
            </nav>
        </div>
    </>
  )
}

export default Registrar