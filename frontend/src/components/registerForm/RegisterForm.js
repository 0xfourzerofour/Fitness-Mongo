import React, { useState } from 'react'
import './RegisterForm.css'
import userService from '../../services/users'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

const RegisterForm = ({
  showRegisterForm,
  setShowRegisterForm,
  setShowLoginForm,
}) => {
  const [usernameVal, setUsernameVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const [confirmPasswordVal, setConfirmPasswordVal] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState(null)
  const [messageText, setMessageText] = useState('')
  const [file, setFile] = useState(null)

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      if (passwordVal === confirmPasswordVal) {
        await userService.create({
          username: usernameVal,
          password: passwordVal,
          file: file,
        })
        setRegisterSuccess(true)
        setMessageText('Account created!')
        setTimeout(() => {
          setShowRegisterForm(false)
          setShowLoginForm(true)
        }, 1000)
      } else {
        throw new Error("Passwords don't match!")
      }
    } catch (error) {
      setRegisterSuccess(false)
      if (error.message === "Passwords don't match!") {
        setMessageText(error.message)
      } else if (error.message === 'Bad password!') {
        setMessageText(error.message)
      } else if (
        error.response.data.error.includes('is longer than the maximum')
      ) {
        setMessageText('Username too long!')
      } else if (error.response.data.error.includes('to be unique')) {
        setMessageText('Username taken!')
      }
    }
  }

  const handleClose = () => {
    setShowRegisterForm(false)
  }

  const handleLoginClick = () => {
    setShowRegisterForm(false)
    setShowLoginForm(true)
  }

  const handleUsernameChange = (event) => {
    setUsernameVal(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPasswordVal(event.target.value)
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPasswordVal(event.target.value)
  }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      setFile(URL.createObjectURL(img))
    }
  }

  return (
    <Modal show={showRegisterForm} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {registerSuccess === true ? (
          <Alert variant="success">{messageText}</Alert>
        ) : registerSuccess === false ? (
          <Alert variant="danger">{messageText}</Alert>
        ) : null}
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
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPasswordVal}
              onChange={handleConfirmPasswordChange}
            />
          </Form.Group>
          <Form.Group controlId="formFile">
            <Form.Label>Upload avatar</Form.Label>
            <Form.File
              id="formControlFile"
              onChange={handleImageChange}
              name="image"
            />
          </Form.Group>
          <p>
            Already have an account?{' '}
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
