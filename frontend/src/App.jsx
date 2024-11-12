import { useState } from 'react'
import './App.css'
import Signup from './components/Signup'
import Signin from './components/Signin'
import { createBrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import CheckEmail from './components/CheckEmail'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/check-email' element={<CheckEmail />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

export default App
