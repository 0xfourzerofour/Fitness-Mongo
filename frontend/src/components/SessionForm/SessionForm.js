import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {
  Calendar as Cal,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from 'grommet'
import Axios from 'axios'


export default class SessionForm extends Component {

  constructor(props){
    super(props); 

    this.state ={
      workout: [], 
      exercise: "", 
      reps: "",
      sets: "", 
      weight: ""
    } 

    this.handleAddWorkout = this.handleAddWorkout.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.postWorkout = this.postWorkout.bind(this);
  }

  handleAddWorkout = () => {

    this.setState({
      workout: [...this.state.workout,{
        exercise: this.state.exercise,
        sets: this.state.sets,
        reps: this.state.reps,
        weight: this.state.weight,

      } ],
      exercise: "", 
      reps: "",
      sets: "", 
      weight: ""
    })

   



  }

  handleChange(event) {
    const name = event.target.name
    this.setState({[name]: event.target.value});
  
  }

  postWorkout(){
      Axios.post('http://localhost:5000/session/new', {
      workout: this.state.workout,
      date: this.props.date
    }, {
      headers: {
        'auth-token': localStorage.getItem('auth-token')
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

    
  }

  render() {
    return (
      <div>
      <Table>


<TableBody>
{
          this.state.workout.length >= 1 ? <TableBody>
          {this.state.workout.map((s) => {
           
              return (
                <TableRow>
                  <TableCell scope="row">
                    <strong>{s.exercise}</strong>
                  </TableCell>
                  <TableCell>{s.reps}</TableCell>
                  <TableCell>{s.sets}</TableCell>
                  <TableCell>{s.weight}</TableCell>
                </TableRow>
              )
            
          })}
          
        </TableBody> : <div/>
        }
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
   Add exercise
 </Button>
</TableCell>
</TableRow>
</TableBody>
</Table>

{this.state.workout.length >= 1? <Button onClick={this.postWorkout}>Post Workout</Button>: <div/>}

  
</div>

    )
  }
}
