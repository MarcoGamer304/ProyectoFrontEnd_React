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
    <div>
      <nav>
        <div className="logo">Logo</div>
        <ul className={`nav-links ${isNavActive ? 'nav-links-active' : ''}`}>
          <li><a href="#home"><button className="styled-button"><MdOutlineNotifications/></button></a></li>
          <li><a href="#services"><button className="styled-button"><TiMail /></button></a></li>
          <li><a href="#about"><button className="styled-button"><TiMail /></button></a></li>
        </ul>
        <div className="hiddenMenu" onClick={toggleNav}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
    </div>
  );
}

export default Example;



