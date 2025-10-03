import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import DriverLogin from './pages/DriverLogin'
import DriverRegister from './pages/DriverRegister'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/users/login" element={<UserLogin />} />
        <Route path="/users/register" element={<UserRegister />} />
        <Route path="/drivers/login" element={<DriverLogin />} />
        <Route path="/drivers/register" element={<DriverRegister />} />
      </Routes>
    </Router>
  )
}

export default App
