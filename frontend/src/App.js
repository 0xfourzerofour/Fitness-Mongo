import React, { useState, useEffect } from 'react'
import './App.css'
import userService from './services/users'
import Topnav from './components/topnav/Topnav'
import LoginForm from './components/loginForm/LoginForm'
import RegisterForm from './components/registerForm/RegisterForm'
import Home from './components/home/Home'

function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedSpeakUser')
    if (loggedUserJSON) {
      const savedUser = JSON.parse(loggedUserJSON)
      setUser(savedUser)
      userService.setToken(savedUser.token)
    }
  }, [])
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(true)
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
    </div>
  )
}

export default App
