import React, { useState } from 'react';
import '../sources/NavBar.css';


function Example() {
  const [isNavActive, setIsNavActive] = useState(false);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <div className='containerNav'>
     
      <div className='menuSuperior'>
        <nav className='nav2'>
          <div className="logo" ><a href="/">Proyect</a></div>
          <ul className={`nav-links ${isNavActive ? 'nav-links-active' : ''}`}>
            <li className='listaSuperior'><a href="#services"><button className="styled-button">Usuarios</button></a></li>
            <li className='listaSuperior'><a href="#docentes"><button className="styled-button">Docentes</button></a></li>
            <li className='listaSuperior'><a href="/actividad"><button className="styled-button">Actividades</button></a></li>
            <li className='listaSuperior'><a href="/etiqueta"><button className="styled-button">Etiqueta</button></a></li>
            <li className='listaSuperior'><a href="/categoria"><button className="styled-button">Categoria</button></a></li>
            <li className='listaSuperior'><a href="/evaluacion"><button className="styled-button">Evaluacion</button></a></li>
            <li className='listaSuperior'><a href="#services"><button className="styled-button">Recordatorios</button></a></li>
            <li className='listaSuperior'><a href="#about"><button className="styled-button">Carreras</button></a></li>
            <li className='listaSuperior'><a href="#services"><button className="styled-button">Reportes</button></a></li>
            </ul>
          <div className="hiddenMenu" onClick={toggleNav}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Example;



