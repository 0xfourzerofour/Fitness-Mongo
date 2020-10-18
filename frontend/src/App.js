import React, { useState } from "react"
import "./App.css"
import Topnav from "./components/topnav/Topnav"
import LoginForm from "./components/loginForm/LoginForm"

function App() {
  const [showLoginForm, setShowLoginForm] = useState(true)
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
        />
      ) : null}
    </div>
  )
}

export default App
