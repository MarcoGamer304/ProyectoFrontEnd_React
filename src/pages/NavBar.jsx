import React, { useState } from 'react';
import '../sources/NavBar.css';
import { MdOutlineNotifications } from "react-icons/md";
import { TiMail } from "react-icons/ti";

function Example() {
  const [isNavActive, setIsNavActive] = useState(false);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <div className='containerNav'>
      <div className='menuLateral'>
        <nav className='nav1'>
          <div className="div">
            <ul className='ulLateral'>
              <li className='logoL'><p>Menu</p></li>
              <li className='listaLataral'><a className='listaLataral' href="#home"><button className="buttonLataral"><MdOutlineNotifications />Actividades </button></a></li>
              <li className='listaLataral'><a href="/listaLataral"><button className="buttonLataral"><TiMail /> Usuarios</button></a></li>
              <li className='listaLataral'><a href="/listLatral"><button className="buttonLataral"><TiMail /> Estudiantes</button></a></li>
              <li className='listaLataral'><a href="/lisLataral"><button className="buttonLataral"><TiMail /> Docentes</button></a></li>
              <li className='listaLataral'><a href="/lstLataal"><button className="buttonLataral"><TiMail /> Recordatorios</button></a></li>
              <li className='listaLataral'><a href="/listaLaaral"><button className="buttonLataral"><TiMail /> Carreras</button></a></li>
              <li className='listaLataral'><a href="/listaLatral"><button className="buttonLataral"><TiMail /> Reportes</button></a></li>
              <li><p className='paragraftSystem'>SETTINGS</p></li>
              <li className='listaLataral'><a href="/listaLataral"><button className="buttonLataral"><TiMail /> Messages</button></a></li>
              <li className='listaLataral'><a href="/listaLaral"><button className="buttonLataral"><TiMail /> Setings</button></a></li>
              <li className='listaLataral'><a href="/listataral"><button className="buttonLataral"><TiMail /> Asistence</button></a></li>
            </ul>
          </div>
        </nav>
      </div>
      <div className='menuSuperior'>
        <nav className='nav2'>
          <div className="logo">Logo</div>
          <ul className={`nav-links ${isNavActive ? 'nav-links-active' : ''}`}>
            <li className='listaSuperior'><a href="#home"><button className="styled-button"><MdOutlineNotifications /></button></a></li>
            <li className='listaSuperior'><a href="#services"><button className="styled-button"><TiMail /></button></a></li>
            <li className='listaSuperior'><a href="#about"><button className="styled-button"><TiMail /></button></a></li>
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



