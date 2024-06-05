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
import Actividad from './pages/ManagerActividades'
import Etiqueta from './pages/ManagerEtiquetas'
import Categoria from './pages/ManagerCategorias'
import Evaluacion from './pages/ManagerEvaluaciones'

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
          <Route path="/actividad" element={<Actividad />} />
          <Route path="/etiqueta" element={<Etiqueta />} />
          <Route path="/categoria" element={<Categoria />} />
          <Route path="/evaluacion" element={<Evaluacion />} />
        </Routes>  
        </div>  
    </>
  )
}

export default App
