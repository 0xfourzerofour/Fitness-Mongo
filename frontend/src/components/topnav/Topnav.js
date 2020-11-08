import React, { useContext } from 'react'
import './Topnav.css'
import Navbar from 'react-bootstrap/Navbar'
import NavItem from 'react-bootstrap/NavItem'
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
            <NavItem eventkey={1} href="/dashboard">
              <Nav.Link as={Link} className="navlink" to="/dashboard">
                Dashboard
              </Nav.Link>
            </NavItem>
          ) : (
            <div></div>
          )}
          {userData ? (
            <NavItem eventkey={1} href="/search">
              <Nav.Link as={Link} className="navlink" to="/search">
                Search
              </Nav.Link>
            </NavItem>
          ) : (
            <div></div>
          )}
          <NavItem eventkey={1} href="/about">
            <Nav.Link as={Link} className="navlink" to="/about">
              About
            </Nav.Link>
          </NavItem>
        </Nav>
        {userData ? (
          <Navbar.Text className="mr-4">
            {userData != null ? `Signed in as: ${userData.user.username}` : ''}
          </Navbar.Text>
        ) : null}
        {userData ? (
          <Form>
            <Button onClick={logout}>Logout</Button>
          </Form>
        ) : (
          <Form>
            <Button onClick={() => setShowLoginForm(!showLoginForm)}>
              Login
            </Button>
          </Form>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Topnav
