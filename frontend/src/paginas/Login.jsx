import React from 'react';
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>Inicia Sesión y Administra tus {""}<span className='text-black'>Pacientes</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg py-10 px-5 rounded-xl bg-white'>
        <form >
          <div className="my-5">
            <label className='uppercase text-gray-600 block text-lg font-bold' htmlFor="">Email</label>
            <input type="email" placeholder='Email de Registro' className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' />
          </div>
          <div className="my-5">
            <label className='uppercase text-gray-600 block text-lg font-bold' htmlFor="">Password</label>
            <input type="password" placeholder='Tu Password' className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' />
          </div>
          <input type="submit" value="Iniciar Sesión" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'/>
        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link to="/registrar" className='block text-center my-5 text-gray-500'>¿No tienes una cuenta? Registrate</Link>
          <Link to="/olvide-password" className='block text-center my-5 text-gray-500'>Olvidaste tu password</Link>
        </nav>
      </div>
    </>
  )
}

export default Login