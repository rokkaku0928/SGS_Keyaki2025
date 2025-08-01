import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Intro1 from './pages/intro1'
import Intro2 from './pages/intro2'
import Intro3 from './pages/Intro3'
import Intro4 from './pages/Intro4'
import Intro5 from './pages/Intro5'
import Intro6 from './pages/Intro6'
import Intro7 from './pages/Intro7'
import Intro8 from './pages/Intro8'
import Intro9 from './pages/Intro9'
import Playing from './pages/Playing'


function App() {

  return (
    <>
      <h1>Hello World</h1>
      <BrowserRouter>
          <Routes>
            <Route path='/intro-1' element={<Intro1/>} />
            <Route path='/intro-2' element={<Intro2/>} />
            <Route path='/intro-3' element={<Intro3/>} />
            <Route path='/intro-4' element={<Intro4/>} />
            <Route path='/intro-5' element={<Intro5/>} />
            <Route path='/intro-6' element={<Intro6/>} />
            <Route path='/intro-7' element={<Intro7/>} />
            <Route path='/intro-8' element={<Intro8/>} />
            <Route path='/intro-9' element={<Intro9/>} />
            <Route path='/Playing' element={<Playing/>} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
