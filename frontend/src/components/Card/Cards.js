import React, { Component } from 'react'

import {CardGroup, Card} from 'react-bootstrap'; 


export default class Cards extends Component {
  render() {
    return (
      <CardGroup>
  <Card>
    <Card.Img variant="top" src="http://localhost:5000/images/fit1.png" />
    <Card.Body>
      <Card.Title>"I lost 15kg in 6 months."</Card.Title>
      <Card.Text>
        After using Fit for just 6 months I was so motivated and managed to lose 15kg.
      </Card.Text>
    </Card.Body>

  </Card>
  <Card>
    <Card.Img variant="top" src="http://localhost:5000/images/fit2.png" />
    <Card.Body>
      <Card.Title>"My confidence was increased after using Fit."</Card.Title>
      <Card.Text>
        I used to have a confidence issue when trying to workout. however after usng fit I knew exaclty what
        exercises to do and felt like a pro.
      </Card.Text>
    </Card.Body>

  </Card>
  <Card>
    <Card.Img variant="top" src="http://localhost:5000/images/fit3.png"/>
    <Card.Body>
      <Card.Title>"Now all my friends use it."</Card.Title>
      <Card.Text>
        My friends and I have started having friendly competitions with each other to see who can track the most workouts.
      </Card.Text>
    </Card.Body>
 
  </Card>
</CardGroup>
    )
  }
}
