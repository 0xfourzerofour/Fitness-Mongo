import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const Topnav = ({ user, setUser, showLoginForm, setShowLoginForm }) => {
  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedFitUser')
    window.localStorage.removeItem('auth-token')
  }
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>
        <Link to="/">Fit</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="mr-3" to="/dashboard">
            Dashboard
          </Link>
          <Link to="/about">About</Link>
        </Nav>
        {user ? (
          <>
            <Navbar.Text className="mr-4">
              Signed in as: {user.username}
            </Navbar.Text>
            <Button onClick={logout}>Logout</Button>
          </>
        ) : (
          <Button onClick={() => setShowLoginForm(!showLoginForm)}>
            Login
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Topnav
