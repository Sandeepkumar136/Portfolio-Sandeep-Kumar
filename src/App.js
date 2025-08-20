import React from 'react'
import Navbar from './components/navigation/Navbar';
import './components/styles/Style.css';
import Home from './components/Routes/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Profile from './components/Routes/Profile';
import Services from './components/Routes/Services';
import Books from './components/Routes/Books';
import Projects from './components/Routes/Projects';
import Achievements from './components/Routes/Achievements';
import Resume from './components/Routes/Resume';
import About from './components/Routes/About';
import { DarkModeProvider } from './components/context/DarkModeContext';
import { LangDialogueboxProvider } from './components/context/LanguageContext';
import { FilterDialogueBoxProvider } from './components/context/FilterContext';

const App = () => {
  return (
    <>
      <Router>
        <DarkModeProvider>
          <LangDialogueboxProvider>
            <FilterDialogueBoxProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/services' element={<Services/>}/>
          <Route path='/books' element={<Books/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/achievements' element={<Achievements/>}/>
          <Route path='/resume' element={<Resume/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
            </FilterDialogueBoxProvider>
          </LangDialogueboxProvider>
        </DarkModeProvider>
      </Router>
    </>
  )
}

export default App;
