import React, { Component } from 'react'

import {Jumbotron, Container, Form, FormGroup, FormControl, InputGroup, Button, ListGroup, Image} from 'react-bootstrap';
import Context from '../../Context/User';

import Axios from 'axios';

export default class Settings extends Component {

  static contextType = Context

  constructor(props){
    super(props); 

    this.state = {
      users: [],
      search: ''
    }

    this.allUsers = this.allUsers.bind(this)
    this.searchUsers = this.searchUsers.bind(this)
  }


  allUsers = () => {
    Axios.get('http://localhost:5000/users/searchall', {
      headers: {
        'auth-token': localStorage.getItem("auth-token")
      }
    }).then(res => {
      this.setState({
        users: res.data
      })

      console.log(res.data)
    })

  }

  searchUsers = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:5000/users/search',{
      searchString: this.state.search
    }, {
      headers: {
        'auth-token': localStorage.getItem("auth-token")
      }
    }).then(res => {
      this.setState({
        users: res.data
      })
    })
  }

  manageChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Jumbotron fluid>
  <Container>
    <h1>Search</h1>

  </Container>
</Jumbotron>
<Container>
<Button style={{marginBottom: 10}} onClick={this.allUsers}>View All Users</Button>
<Form onSubmit={this.searchUsers}>
  <Form.Group >
    <Form.Label>User</Form.Label>
    <Form.Control onChange={this.manageChange}   type="text" placeholder="Username" />
  
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>

  <ListGroup variant="flush">
    {this.state.users.map(user => {
      return <ListGroup.Item><Image style={{width: 50}} roundedCircle src={`http://localhost:5000/${user.imageUrl}`}/> <b>{user.username} </b> - {user.sessions} workouts Logged since {user.createdAt.split("T")[0]}</ListGroup.Item>
    })}
  
</ListGroup>
  
</Container>
      </div>
    )
  }
}
