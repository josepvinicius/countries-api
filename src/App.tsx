import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Detail from './pages/detail'
import Notfaund from './pages/notfound'

import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/detail/:cca3' element={<Detail/>} />
      <Route path='/notfaund' element={<Notfaund/>} />
    </Routes>
  )
}

export default App
