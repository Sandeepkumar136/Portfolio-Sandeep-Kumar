import React from 'react'
import Navbar from './components/navigation/Navbar';
import './components/styles/Style.css';
import Home from './components/Routes/Home';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
    </div>
  )
}

export default App;
