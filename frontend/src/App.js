import React, { useState } from "react"
import "./App.css"
import Topnav from "./components/topnav/Topnav"
import LoginForm from "./components/loginForm/LoginForm"
import RegisterForm from "./components/registerForm/RegisterForm"

function App() {
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
