import React from 'react'
import './About.css'

import { Jumbotron, Container, Carousel } from 'react-bootstrap'

const About = () => {
  return (
    <div>
      <Jumbotron fluid className="mb-0">
        <Container>
          <h1>About</h1>
          <p>
            <i>What is Fit used for?</i>
          </p>
          <p>
            The Objective of our applciaiton is to allow users to be able to
            trakc all of their workouts so that they can visualise their
            progression. The visual feedback to the user helps motivate them to
            continue with their fitness goals.
          </p>
        </Container>
      </Jumbotron>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://localhost:5000/images/fit5.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Bring your fitness to next level</h3>
            <p>
              Our intuitive dashboard lets you view your progression visually
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://localhost:5000/images/fit6.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Track your Workouts</h3>
            <p>Log workouts as your go</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default About
