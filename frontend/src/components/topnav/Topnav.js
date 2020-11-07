import React, {useContext} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Context from '../../Context/User'
import { Link } from 'react-router-dom'

const Topnav = ({  showLoginForm, setShowLoginForm }) => {
  const { userData, setUser } = useContext(Context.Consumer);
  const logout = () => {
    setUser(null)
    localStorage.setItem("auth-token", "");

  }


  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>
        <Link to="/">Fit</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {userData ? <Link className="mr-3" to="/dashboard">
            Dashboard
          </Link> : <div></div>}
          <Link to="/about">About</Link>
        </Nav>
        {userData ? (
          <>
            <Navbar.Text className="mr-4">
              {userData != null ? `Signed in as: ${userData.user.username}` : ""}
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
