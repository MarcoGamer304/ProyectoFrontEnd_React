import React, { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import '../sources/Register.css';
import { useNavigate } from 'react-router-dom';

export default function RegistrarUsuario() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const addUser = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login/allUsers');
      const data = await response.json();

      const userFind = data.find(findUser => findUser.user === user);
      if (userFind) {
        console.log('Usuario ya existente:', userFind);
      } else {
        const postResponse = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user, password })
        });

        if (postResponse.ok) {
          const postData = await postResponse.json();
          console.log('Datos enviados satisfactoriamente', postData);    
          navigate('/');  
        } else {
          const postData = await postResponse.json();
          console.log('Failed: ', postData);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  const redireccionarLogin = (event) => {
    navigate('/');
  }

  const redireccionarRestorePassword = (event) => {
    navigate('/forgottenPasword');
  }


  return (
    <div className='contenedor-padre'>
      <div className='contenedor'>
        <div className='form-box-login'>
          <form onSubmit={addUser}>
            <h1>Register</h1>
            <div className='input-box'>
              <input className='text-field' type="text" name='username' placeholder='Username' maxLength="26" value={user} onChange={(e) => setUser(e.target.value)} required />
              <FaRegUserCircle className='icon' />
            </div>
            <div className='input-box'>
              <input className='text-field' type="password" name='password' placeholder='Password' maxLength="26" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <RiLockPasswordLine className='icon' />
            </div>
            <div className="remember">
              <label>
                <input type="checkbox" required/> Accept Terms & Conditions
              </label>
            </div>
            <button className='button-fix' type='Submit'>Register</button>
            <div className='link'>
              <a href="/forgottenPasword" onClick={redireccionarRestorePassword}>Forgot password?</a>
            </div>
            <div className="registerLink">
              <a href="/" onClick={redireccionarLogin}>Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
