import React, { useState, useEffect } from 'react'
import './App.css'
import {Route, Switch } from 'react-router-dom';
import userService from './services/users'
import Topnav from './components/topnav/Topnav'
import LoginForm from './components/loginForm/LoginForm'
import RegisterForm from './components/registerForm/RegisterForm'
import Home from './components/home/Home'
import About from './components/about/About'
import Dashboard from './components/dashboard/Dashboard';

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

      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/about" exact component={About}/>
        <Route path="/dashboard" exact component={Dashboard}/>

      </Switch>
      

    </div>
  )
}

export default App
