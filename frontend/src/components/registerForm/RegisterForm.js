import React, { useState } from "react"
import "./RegisterForm.css"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const RegisterForm = ({
  showRegisterForm,
  setShowRegisterForm,
  setShowLoginForm,
}) => {
  const [usernameVal, setUsernameVal] = useState("")
  const [passwordVal, setPasswordVal] = useState("")

  const handleClose = () => {
    setShowRegisterForm(false)
  }

  const handleLoginClick = () => {
    setShowRegisterForm(false)
    setShowLoginForm(true)
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    // register API calls go here
    handleClose()
  }

  const handleUsernameChange = (event) => {
    setUsernameVal(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPasswordVal(event.target.value)
  }

  return (
    <Modal show={showRegisterForm} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              value={usernameVal}
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={passwordVal}
              onChange={handlePasswordChange}
            />
            <Form.Text className="text-muted">
              Password must be x characters long.
            </Form.Text>
          </Form.Group>
          <p>
            Already have an account?{" "}
            <span className="register-link" onClick={handleLoginClick}>
              login
            </span>
          </p>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default RegisterForm
