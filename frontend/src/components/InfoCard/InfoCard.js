import Axios from 'axios';
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import {Card, Nav, Image, Row, Col, Button} from 'react-bootstrap';

import Context from '../../Context/User'; 

export default class InfoCard extends Component {
  static contextType = Context;



  render() {
    return (
      <div>
      <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={`http://localhost:5000/${this.context.userData.user.image}`} />
  <Card.Body>
    <Card.Title>{this.context.userData.user.username}</Card.Title>
    <Card.Text>
      <b>Member Since:</b> {this.context.userData.user.created.split("T")[0]}
    </Card.Text>
    <Card.Text>
      <b>Workouts Logged:</b> {this.context.userData.user.sessions}
    </Card.Text>
    <Link to="/settings"> Settings
  </Link>
  </Card.Body>
</Card>
  </div>
    )
  }
}
