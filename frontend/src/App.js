import React, { useState } from "react"
import "./App.css"
import Topnav from "./components/topnav/Topnav"
import LoginForm from "./components/loginForm/LoginForm"

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false)
  return (
    <div className="App">
      <Topnav />
      {showLoginForm ? <LoginForm /> : null}
    </div>
  )
}

export default App
