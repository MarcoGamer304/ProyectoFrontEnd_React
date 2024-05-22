import Login from "./pages/Login"
import Register from "./pages/Register"
import MainPage from "./pages/MainPage"
import ForgotPassword from "./pages/ForgotPassword"
import { Route, Routes } from "react-router-dom"
import './sources/Redirecciones.css'

function App() {
  return (
    <>
    <div className="containerElements">    
        <Routes>          
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/forgottenPasword" element={<ForgotPassword />} />
        </Routes>  
        </div>  
    </>
  )
}

export default App
