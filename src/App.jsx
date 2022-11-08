import Login from './pages/Login'
import Home from './pages/Home'
import Paciente from './pages/Paciente'
import Medico from './pages/Medico'
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/home' element={ localStorage.getItem("token") == null? <Navigate replace to='/login'/> : <Home />} />
        <Route path='/paciente' element={ localStorage.getItem("token") == null? <Navigate replace to='/login'/> : <Paciente />} />
        <Route path='/medico' element={ localStorage.getItem("token") == null? <Navigate replace to='/login'/> : <Medico />} />
        <Route path='*' element={<h1>Not found.</h1>} />
      </Routes>
    </div>
  )
}

export default App
