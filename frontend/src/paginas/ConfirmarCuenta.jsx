import { React, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Alerta from '../componentes/Alerta';

const ConfirmarCuenta = () => {
  const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false);
  const [cargando, setCargando] = useState(true);
  const params = useParams();   //Nos permite leer los params de la url
  const [alerta, setAlerta] = useState( {} )
  const { id } = params;
  useEffect( () => {
    const confirmarCuenta = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/confirmar/${id}`;
        const { data } = await axios(url);
        setCuentaConfirmada(true);
        setAlerta({ msg: data.msg})
      } catch (error) {
        setAlerta( {msg: error.response.data.msg, error: true} );
      }
      setCargando(false)
    }
    confirmarCuenta();
  }, []);

  return (
    <>
        <div>
          <h1 className='text-indigo-600 font-black text-6xl'>Confirma tu cuenta y comienza a Administar{""}<span className='text-black'>tus pacientes</span></h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg py-10 px-5 rounded-xl bg-white'>
           { !cargando && <Alerta alerta={alerta}/>}
           {cuentaConfirmada && 
           <Link to="/" className='block text-center my-5 text-gray-500'>Iniciar Sesión</Link>
            }
        </div>
    </>
  )
}

export default ConfirmarCuenta