import Axios from 'axios'
import React from 'react'
import './Dashboard.css'
import Calender from '../Calender/Calender'
import {Jumbotron, Container} from 'react-bootstrap';
import InfoCard from '../InfoCard/InfoCard';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userSessions: [],
    }
  }

  componentDidMount() {
    Axios.get('http://localhost:5000/session/usersessions', {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
      },
    }).then((res) => {
      this.setState({
        userSessions: res.data,
      })
    })
  }

  render() {
    return (
      <div >
        <Jumbotron fluid>
  <Container>
    <h1>Dashboard</h1>

  </Container>
</Jumbotron>
<Container>
  <InfoCard/>
<Calender />
</Container>
      </div>
    )
  }
}

export default Dashboard
