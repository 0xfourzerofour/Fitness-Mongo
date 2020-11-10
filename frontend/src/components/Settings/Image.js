import React, { useContext, useState } from 'react'

import {Form, Button, Alert} from 'react-bootstrap'; 

import Context from '../../Context/User'
import Axios from 'axios'; 

export default function Image() {

  const {userData, setUser} = useContext(Context.Consumer); 

  const [file, setFile] = useState(null)

  const[success, setSuccess] =useState(''); 
  const handleChange = (e) => {
    setFile(e.target.files[0])

    // console.log(e.target.files[0])
  }

  const changepassword =  (e) => {
    e.preventDefault(); 

  
    let fd = new FormData()

    fd.append("image", file)

    console.log(fd)

    Axios.patch('http://localhost:5000/users/updateavatar', 
      fd
    , {
      headers: {
        'auth-token': localStorage.getItem('auth-token')
      }
    }).then(res => {
      setUser({      token: userData.user.token,
        user: {
          id: userData.user.id,
          username: userData.user.username,
          created: userData.user.created, 
          image: res.data,
          sessions: userData.user.sessions
        }})
        setSuccess("Image has been changed")

    })
  }


 
    return (<div>
<Form onSubmit={changepassword}>
<Form.Group controlId="formFile">
            <Form.Label>Upload avatar</Form.Label>
            <Form.File
              id="formControlFile"
              onChange={handleChange}
              name="image"
            />
          </Form.Group>
  <Button type="submit">
    Change Image
  </Button>
    

</Form>
 {success != '' ? <Alert style={{marginTop: 10}} variant="success">{success}</Alert> : <div/>}
</div>
    )
  
}
