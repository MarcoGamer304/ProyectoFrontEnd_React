
import React, { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import '../sources/Login.css';
import { useNavigate } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookFill } from "react-icons/ri";
import { IoLogoGithub } from "react-icons/io";


export default function Login() {

  const [username, setUsername] = useState('');
  const [passwordTxt, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const getSubmit = async (event) => {
    event.preventDefault();

    fetch('http://localhost:8080/login/allUsers')
      .then(response => response.json())
      .then((data) => {

        const userFind = data.find(findUser => findUser.user === username &&
          findUser.password === passwordTxt);
        if (userFind) {
          console.log('Usuario encontrado:', userFind);
          navigate('/MainPage');
        } else {
          console.log('Usuario no encontrado');
          setErrorMsg('Usuario o contraseña incorrecta');
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
        setErrorMsg('Error en la comunicación con el servidor');
      });
  }

  const redireccionarRegister = (event) => {
    navigate('/register');
  }

  const redireccionarRestorePassword = (event) => {
    navigate('/forgottenPasword');
  }

  return (
    <div className='contenedor-padre'>
      <div className='contenedorLog'>
        <div className='container-child'>

          <div className='form-box-login'>
            <form onSubmit={getSubmit}>
              <h1>Sign In</h1>
              <div className='loginSocialMedia'>
                <button className='SignUpMedia'><FcGoogle /></button>
                <button className='SignUpMedia'><RiFacebookFill style={{ color: '#1877F2' }} /></button>
                <button className='SignUpMedia'><FaInstagram style={{ color: '#E4405F' }} /></button>
                <button className='SignUpMedia'><IoLogoGithub /></button>

              </div>
              <p className='paragraftLogin'>Use your user and password</p>
              <div className='input-box'>
                <input className='text-field' type="text" name='username' placeholder='Username' maxLength="26" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <FaRegUserCircle className='icon' />
              </div>
              <div className='input-box'>
                <input className='text-field' type="password" name='password' placeholder='Password' maxLength="26" value={passwordTxt} onChange={(e) => setPassword(e.target.value)} required />
                <RiLockPasswordLine className='icon' />
              </div>
              <div className='link'>
                <a href="/forgottenPasword" onClick={redireccionarRestorePassword}>Forgot your Password?</a>
              </div>
              <button className='button-fix' type='Submit'>Login</button>
            </form>
           <span  className= 'spanMenssage' style={{ color: 'red' }}>{errorMsg}</span>
          </div>
        </div>
        <div className='containerRegisterLogin'>
          <h2 className='etiquetaR'>Welcome, User!</h2>
          <p className='paragraftRL'>Register with your personal information to access all our features </p>
          <div className="registerLink">
            <button className='buttonRegisterLogin' href="/register" onClick={redireccionarRegister}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};


