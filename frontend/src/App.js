import React, { useState, useEffect } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Context from './Context/User'
import Topnav from './components/topnav/Topnav'
import LoginForm from './components/loginForm/LoginForm'
import RegisterForm from './components/registerForm/RegisterForm'
import Home from './components/home/Home'
import About from './components/about/About'
import Dashboard from './components/dashboard/Dashboard'
import Public from './Public'
import Protected from './Protected'
import Axios from 'axios'

//comment

function App() {
  const [userData, setUser] = useState(null)
  useEffect(() => {
    const checkUser = async () => {
      let token = localStorage.getItem('auth-token')

      if (token == null) {
        localStorage.setItem('auth-token', '')
        token = ''
      }

      const tokenValid = await Axios.post(
        'http://localhost:5000/auth/validatetoken/',
        null,
        {
          headers: {
            'auth-token': token,
          },
        }
      )

      if (tokenValid.data) {
        const user = await Axios.get(
          'http://localhost:5000/users/currentuser/',
          {
            headers: {
              'auth-token': token,
            },
          }
        )

        setUser({
          token,
          user: {
            id: user.data.id,
            username: user.data.username,
          },
        })
      }
    }

    checkUser()
  }, [])
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  return (
    <Context.Provider value={{ userData, setUser }}>
      <Topnav
        user={userData}
        setUser={setUser}
        showLoginForm={showLoginForm}
        setShowLoginForm={setShowLoginForm}
      />
      {showLoginForm ? (
        <LoginForm
          setUser={setUser}
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
        <Public path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Protected path="/dashboard" exact component={Dashboard} />
      </Switch>
    </Context.Provider>
  )
}

export default App
