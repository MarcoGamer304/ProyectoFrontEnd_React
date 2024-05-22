
import React, { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import '../sources/Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const [username, setUsername] = useState('');
  const [passwordTxt, setPassword] = useState('');
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
        }
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
      <div className='contenedor'>
        <div className='form-box-login'>
          <form onSubmit={getSubmit}>
            <h1>Login</h1>
            <div className='input-box'>
              <input className='text-field' type="text" name='username' placeholder='Username' maxLength="26" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <FaRegUserCircle className='icon' />
            </div>
            <div className='input-box'>
              <input className='text-field' type="password" name='password' placeholder='Password' maxLength="26" value={passwordTxt} onChange={(e) => setPassword(e.target.value)} required />
              <RiLockPasswordLine className='icon' />
            </div>
            <div className="remember">
              <label>
                <input type="checkbox" /> Remember me
              </label>
            </div>
            <button className='button-fix' type='Submit'>Login</button>
            <div className='link'>
              <a href="/forgottenPasword" onClick={redireccionarRestorePassword}>Forgot password?</a>
            </div>
            <div className="registerLink">
              <a href="/register" onClick={redireccionarRegister}>Register</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


