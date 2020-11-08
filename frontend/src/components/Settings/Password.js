import React, { useContext, useState } from 'react'

import {Form, Button, Alert} from 'react-bootstrap'; 

import Context from '../../Context/User'
import Axios from 'axios'; 

export default function Password() {

  const {userData, setUser} = useContext(Context.Consumer); 

  const [password, setpassword] = useState('')
  const[success, setSuccess] =useState(''); 

  const handleChange = (e) => {
    setpassword(e.target.value)
  }

  const changepassword = (e) => {
    e.preventDefault(); 
    Axios.patch('http://localhost:5000/users/updatepassword', {
      password
    }, {
      headers: {
        'auth-token': localStorage.getItem('auth-token')
      }
    }).then(res => {
      console.log(res)
      setSuccess("Password has been changed")
    })

  }


 
    return (
      <div>
<Form onSubmit={changepassword}>
  <Form.Group controlId="formGroupEmail">
    <Form.Label>password</Form.Label>
    <Form.Control onChange={handleChange} type="password" placeholder={userData.user.password} />
  </Form.Group>
  <Button type="submit">
    Change password
  </Button>

</Form>
{success != '' ? <Alert style={{marginTop: 10}} variant="success">{success}</Alert> : <div/>}
</div>
    )
  
}
