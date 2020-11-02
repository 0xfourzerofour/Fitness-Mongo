import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Axios from 'axios';

import {
  Calendar as Cal,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from 'grommet'


export default class SessionAppend extends Component {

  constructor(props){
    super(props);

    this.state = {
      
        exercise: "",
        sets: "",
        reps: "",
        weight: ""
      
    }

    this.handleAddWorkout = this.handleAddWorkout.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }



  handleAddWorkout = () => {
    Axios.put('http://localhost:5000/session/append', {
      date: this.props.date,
      workout: {
        exercise: this.state.exercise,
        sets: this.state.sets,
        reps: this.state.reps,
        weight: this.state.weight
      }}, {
        headers: {
          'auth-token': localStorage.getItem('auth-token')
        }
      }
    ).then(res => {
      this.setState({
        exercise: "",
        sets: "",
        reps: "",
        weight: ""
      })
    }).catch(err => {
      console.log(err)
    })



  }

  handleChange(event) {
    const name = event.target.name
    this.setState({[name]: event.target.value});
  
  }


  render() {
    return (
      <div>
            <Table>

<TableBody>
 <TableRow>
     <TableCell scope="row">
       <InputGroup size="sm">
         <FormControl
           aria-label="Small"
           aria-describedby="inputGroup-sizing-sm"
           value={this.state.exercise}
        onChange={this.handleChange}
        name="exercise"
        
         />
       </InputGroup>
     </TableCell>
     <TableCell>
       <InputGroup size="sm">
         <FormControl
           aria-label="Small"
           aria-describedby="inputGroup-sizing-sm"
        value={this.state.sets}
        onChange={this.handleChange}
        name="sets"
         />
       </InputGroup>
     </TableCell>
     <TableCell>
       <InputGroup size="sm">
         <FormControl
           aria-label="Small"
           aria-describedby="inputGroup-sizing-sm"
           value={this.state.reps}
        onChange={this.handleChange}
        name="reps"
         />
       </InputGroup>
     </TableCell>
     <TableCell>
       <InputGroup size="sm">
         <FormControl
           aria-label="Small"
           aria-describedby="inputGroup-sizing-sm"
           value={this.state.weight}
           onChange={this.handleChange}
           name="weight"
         />
       </InputGroup>
     </TableCell>
   </TableRow>
   <TableRow>
     <TableCell scope="row">
       <Button variant="primary" onClick={this.handleAddWorkout}>
         Add to workout
       </Button>
     </TableCell>
   </TableRow>
   </TableBody>
   </Table>

        
      </div>
    )
  }
}
