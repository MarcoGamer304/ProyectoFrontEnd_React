import Login from "./pages/Login"
import Register from "./pages/Register"
import MainPage from "./pages/MainPage"
import ForgotPassword from "./pages/ForgotPassword"
import { Route, Routes } from "react-router-dom"
import './sources/Redirecciones.css'
import './sources/App.css'
import './sources/Index.css';
import  NavBar  from "./components/NavBar"
import Usuarios from './pages/Usuarios'

function App() {
  return (
    <>
  <NavBar/>
    <div className="containerElements">    
        <Routes>          
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/forgottenPasword" element={<ForgotPassword />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>  
        </div>  
    </>
  )
}

export default App
