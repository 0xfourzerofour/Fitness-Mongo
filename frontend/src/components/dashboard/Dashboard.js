import Axios from 'axios'
import React from 'react'
import './Dashboard.css'
import Calender from '../Calender/Calender'
import {Table, TableCell, TableRow, TableHeader, TableBody} from 'grommet';
import {Jumbotron, Container, Row, Col, ListGroup} from 'react-bootstrap';
import InfoCard from '../InfoCard/InfoCard';
import Context from '../../Context/User';

class Dashboard extends React.Component {

  static contextType = Context; 
  constructor(props) {
    super(props)
    this.state = {
      userSessions: [],
    }

    this.reload = this.reload
  }

  componentDidMount() {
    Axios.get('http://localhost:5000/session/usersessions', {
      headers: {
        'auth-token': this.context.userData.token,
      },
    }).then((res) => {
      this.setState({
        userSessions: res.data,
      })
    })
  }

  reload = () => {
    Axios.get('http://localhost:5000/session/usersessions', {
      headers: {
        'auth-token': this.context.userData.token,
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
  <Row>
    <Col sm={4}>
    <InfoCard/>
    </Col>
<Col sm={8}>
<Calender reload={this.reload} />
</Col>


  </Row>

</Container>
<Container>
<Table className="dash-table" style={{marginTop: 20, marginBottom: 20, color: "white", padding: 20,  background: '#343a40'}} >
  <TableHeader>
    <TableRow>
      <TableCell><b>Date</b></TableCell>
      <TableCell><b>Exercise</b></TableCell>
      <TableCell><b>Reps</b></TableCell>
      <TableCell><b>Sets</b></TableCell>
      <TableCell><b>Weight</b></TableCell>

    </TableRow>
  </TableHeader>
  <TableBody>

    {this.state.userSessions.map(session => {
    return <TableRow>
    <TableCell>{session.date.split("T")[0]}</TableCell>
    {
      session.workout.map(w => {
        return <TableRow><TableCell>{w.exercise}</TableCell></TableRow>
      })
    }
    <TableCell>
    {
      session.workout.map(w => {
        return <TableRow><TableCell>{w.reps}</TableCell></TableRow>
      })
    }
    </TableCell>
    <TableCell>
    {
      session.workout.map(w => {
        return <TableRow><TableCell>{w.sets}</TableCell></TableRow>
      })
    }
    </TableCell>
    <TableCell>
    {
      session.workout.map(w => {
        return <TableRow><TableCell>{w.weight}</TableCell></TableRow>
      })
    }
    </TableCell>



  </TableRow>


    })}

  </TableBody>
</Table>

</Container>
      </div>
    )
  }
}

export default Dashboard
