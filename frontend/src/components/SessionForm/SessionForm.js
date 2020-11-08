import React, { Component, useContext } from 'react'
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

import Context from '../../Context/User';
import Axios from 'axios'

export default class SessionForm extends Component {

  static contextType = Context; 

  constructor(props) {
    super(props)

    this.state = {
      workout: [],
      exercise: '',
      reps: '',
      sets: '',
      weight: '',
    }

    this.handleAddWorkout = this.handleAddWorkout.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.postWorkout = this.postWorkout.bind(this)
  }

  handleAddWorkout = () => {
    this.setState({
      workout: [
        ...this.state.workout,
        {
          exercise: this.state.exercise,
          sets: this.state.sets,
          reps: this.state.reps,
          weight: this.state.weight,
        },
      ],
      exercise: '',
      reps: '',
      sets: '',
      weight: '',
    })
  }

  handleChange(event) {
    const name = event.target.name
    this.setState({ [name]: event.target.value })
  }

  postWorkout() {
    Axios.post(
      'api/session/new',
      {
        workout: this.state.workout,
        date: this.props.date,
      },
      {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      }
    )
      .then((res) => {
        console.log(res)
        this.props.updateSessions()
        this.props.reload();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <Table>
          <TableBody>
            {this.state.workout.length >= 1 ? (
              <>
                {this.state.workout.map((s) => {
                  return (
                    <TableRow key={s.exercise}>
                      <TableCell scope="row">
                        <strong>{s.exercise}</strong>
                      </TableCell>
                      <TableCell>{s.sets}</TableCell>
                      <TableCell>{s.reps}</TableCell>
                      <TableCell>{s.weight}</TableCell>
                    </TableRow>
                  )
                })}
              </>
            ) : null}
            <TableRow>
              <TableCell scope="row">
                <InputGroup size="sm">
                  <FormControl
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={this.state.exercise}
                    onChange={this.handleChange}
                    name="exercise"
                    placeholder="Exercise"
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
                    placeholder="Sets"
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
                    placeholder="Reps"
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
                    placeholder="Weight"
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
            {this.state.workout.length >= 1 ? (
              <TableRow>
                <TableCell scope="row">
                  <Button onClick={this.postWorkout}>Post Workout</Button>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    )
  }
}



