import Login from './pages/Login'
import Home from './pages/Home'
import Paciente from './pages/paciente/Paciente'
import Medico from './pages/medico/Medico'
import Patologo from './pages/patologo/Patologo'
import Recepcionista from './pages/Recepcionista'
import ProcedimientoQuirurgico from './pages/procedimiento/ProcedimientoQuirurgico'
import RegionAnatomica from './pages/region/RegionAnatomica'
import Unidad from './pages/unidad/Unidad'

import { Route, Routes } from 'react-router-dom'
import './App.css'
import PacienteUpdate from './pages/paciente/PacienteUpdate'
import MedicoUpdate from './pages/medico/MedicoUpdate'
import PatologoUpdate from './pages/patologo/PatologoUpdate'
import UnidadUpdate from './pages/unidad/UnidadUpdate'

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/home' element={<Home />} />

        <Route path='/paciente' element={<Paciente />} />
        <Route path='/paciente/:paciente_id' element={<PacienteUpdate />} />

        <Route path='/medico' element={<Medico />} />
        <Route path='/medico/:medico_id' element={<MedicoUpdate />} />

        <Route path='/patologo' element={<Patologo />} />
        <Route path='/patologo/:patologo_id' element={<PatologoUpdate />} />

        <Route path='/recepcionista' element={<Recepcionista />} />
        <Route path='/procedimiento' element={<ProcedimientoQuirurgico />} />
        <Route path='/region' element={<RegionAnatomica />} />

        <Route path='/unidad' element={<Unidad />} />
        <Route path='/unidad/:unidad_id' element={<UnidadUpdate />} />

        <Route path='*' element={<h1>Not found.</h1>} />
      </Routes>
    </div>
  )
}

export default App
