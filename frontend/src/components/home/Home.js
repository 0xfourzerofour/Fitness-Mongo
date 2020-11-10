import React from 'react'
import './Home.css'
import Cards from '../Card/Cards'

import { Carousel } from 'react-bootstrap'

const Home = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://localhost:5000/images/fitness2.png"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>See your Progression</h3>
            <p>
              Our intuitive dashboard lets you view your progression visually
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://localhost:5000/images/fitness3.png"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Track your Workouts</h3>
            <p>Log workouts as you go</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Cards />
    </div>
  )
}

export default Home
