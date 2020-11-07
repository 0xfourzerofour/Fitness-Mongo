import React, { useState, useContext } from 'react'
import './LoginForm.css'
import userService from '../../services/login'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Context from '../../Context/User';

const LoginForm = ({
  showLoginForm,
  setShowLoginForm,
  setShowRegisterForm,
}) => {
  const [usernameVal, setUsernameVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const {userData, setUser} = useContext(Context.Consumer)

  const handleClose = () => {
    setShowLoginForm(false)
  }

  const handleRegisterClick = () => {
    setShowLoginForm(false)
    setShowRegisterForm(true)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await userService.login({
      username: usernameVal,
      password: passwordVal,
    })

    console.log(user)
    
    setUser({
      token: user.token,
      user: {
        id: user.id,
        username: user.username,
      },
    })
    
    localStorage.setItem('auth-token', user.token)
    handleClose()
  }

  const handleUsernameChange = (event) => {
    setUsernameVal(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPasswordVal(event.target.value)
  }

  return (
    <Modal show={showLoginForm} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
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
            No account?{' '}
            <span className="register-link" onClick={handleRegisterClick}>
              register
            </span>
          </p>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LoginForm
