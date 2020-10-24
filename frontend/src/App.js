import React, { useState } from 'react'
import './App.css'
import Topnav from './components/topnav/Topnav'
import LoginForm from './components/loginForm/LoginForm'
import RegisterForm from './components/registerForm/RegisterForm'
import Home from './components/home/Home'

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  return (
    <div className="App">
      <Topnav
        showLoginForm={showLoginForm}
        setShowLoginForm={setShowLoginForm}
      />
      {showLoginForm ? (
        <LoginForm
          showLoginForm={showLoginForm}
          setShowLoginForm={setShowLoginForm}
          setShowRegisterForm={setShowRegisterForm}
        />
      ) : showRegisterForm ? (
        <RegisterForm
          showRegisterForm={showRegisterForm}
          setShowRegisterForm={setShowRegisterForm}
          setShowLoginForm={setShowLoginForm}
        />
      ) : null}
      <Home />
    </div>
  )
}

export default App
