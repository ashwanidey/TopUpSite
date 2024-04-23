import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router-dom';
import Test from './components/Test/Test';
import NavBar from './pages/navbar/NavBar';

function App() {
  document.documentElement.classList.add("dark")
  
  return (
    <>
    <NavBar/>

    <Routes>
    <Route path = "/test" element = {<><Test/></>}></Route>
    </Routes>
    </>
  )
}

export default App
