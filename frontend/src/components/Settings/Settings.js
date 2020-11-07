import React, { Component } from 'react'

import {Jumbotron, Container, Form, FormGroup} from 'react-bootstrap';
import Context from '../../Context/User'; 

export default class Settings extends Component {

  static contextType = Context
  render() {
    return (
      <div>
        <Jumbotron fluid>
  <Container>
    <h1>Settings</h1>

  </Container>
</Jumbotron>
<Container>
<Form>
  <Form.Group controlId="formGroupEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control type="email" placeholder={this.context.userData.user.username} />
  </Form.Group>
  <Form.Group controlId="formGroupPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="********" />
  </Form.Group>
  <Form.Group>
    <Form.File id="exampleFormControlFile1" label="Avatar Image" />
  </Form.Group>
</Form>
</Container>
      </div>
    )
  }
}
