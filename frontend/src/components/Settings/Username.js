import React, { Component, useContext, useState } from 'react'

import {Form, Button, Alert} from 'react-bootstrap'; 

import Context from '../../Context/User'
import Axios from 'axios'; 

export default function Username() {

  const {userData, setUser} = useContext(Context.Consumer); 

  const [username, setUsername] = useState('')

  const[success, setSuccess] =useState(''); 

  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  const changeUsername = (e) => {
    e.preventDefault(); 
    Axios.patch('http://localhost:5000/users/updateusername', {
      username
    }, {
      headers: {
        'auth-token': localStorage.getItem('auth-token')
      }
    }).then(res => {
      console.log(res)
      setUser({      token: userData.user.token,
        user: {
          id: userData.user.token,
          username,
          created: userData.user.created, 
          image: userData.user.image,
          sessions: userData.user.sessions
        }})

        setSuccess("username has been changed")
    })

  }


 
    return (

      <div>

  
<Form onSubmit={changeUsername}>
  <Form.Group controlId="formGroupEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control onChange={handleChange} type="text" placeholder={userData.user.username} />
  </Form.Group>
  <Button type="submit">
    Change Username
  </Button>

</Form>
{success != '' ? <Alert style={{marginTop: 10}} variant="success">{success}</Alert> : <div/>}
</div>
    )
  
}
