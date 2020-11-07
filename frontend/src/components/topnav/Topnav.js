import React, { useContext } from 'react'
import './Topnav.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Context from '../../Context/User'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'

const Topnav = ({ showLoginForm, setShowLoginForm }) => {
  const { userData, setUser } = useContext(Context.Consumer)
  const logout = () => {
    setUser(null)
    localStorage.setItem('auth-token', '')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>
        <Link to="/" className="navlogo">
          Fit
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {userData ? (
            <Nav.Link>
              <Link className="navlink mr-3" to="/dashboard">
                Dashboard
              </Link>
            </Nav.Link>
          ) : null}
          <Nav.Link>
            <Link to="/about" className="navlink">
              About
            </Link>
          </Nav.Link>
        </Nav>
        <Nav>
          {userData ? (
            <>
              <Navbar.Text className="mr-4">
                {userData != null
                  ? `Signed in as: ${userData.user.username}`
                  : ''}
              </Navbar.Text>
              <Form>
                <Button onClick={logout}>Logout</Button>
              </Form>
            </>
          ) : (
            <Form>
              <Button onClick={() => setShowLoginForm(!showLoginForm)}>
                Login
              </Button>
            </Form>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Topnav
