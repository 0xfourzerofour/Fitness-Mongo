import React, { Component } from 'react'

import {Jumbotron, Container, Form, FormGroup} from 'react-bootstrap';
import Context from '../../Context/User'; 
import Username from './Username';
import Image from './Image';
import Password from './Password'; 

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

  <Username/>
  <Password/>
  <Image/>

</Container>
      </div>
    )
  }
}
