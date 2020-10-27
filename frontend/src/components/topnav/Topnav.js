import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import {Link} from 'react-router-dom';

const Topnav = ({ showLoginForm, setShowLoginForm }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand><Link to="/">Fit</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link><Link to="/dashboard">Dashboard</Link></Nav.Link>
          <Nav.Link><Link to="/about">About</Link></Nav.Link>
        </Nav>
        <Button onClick={() => setShowLoginForm(!showLoginForm)}>Login</Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Topnav
