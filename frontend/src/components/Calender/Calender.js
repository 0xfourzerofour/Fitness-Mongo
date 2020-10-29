import Axios from 'axios'
import React, { useState } from 'react'
import {
  Calendar as Cal,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from 'grommet'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

export default function Calender() {
  const [date, setDate] = useState(new Date().toISOString())
  const [dateChanged, setDateChanged] = useState('')
  const [session, setSession] = useState([])
  const [exercise, setExercise] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')

  const getNewSession = () => {
    Axios.get('http://localhost:5000/session/sessionbydate', {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
        sessionDate: dateChanged,
      },
    }).then((res) => {
      setSession(res.data)
      console.log(res)
    })
  }

  const dataChange = (e) => {
    let x = e.split('T')[0]

    const y = x + 'T00:00:00.000+00:00'

    setDateChanged(y)
    setDate(e)

    getNewSession()
  }

  const handleAddWorkout = () => {
    console.log('meme')
  }

  const handleExerciseChange = (event) => {
    const input = String(event.target.value)
    console.log(input)

    setExercise(input)
  }

  const handleSetsChange = (event) => {
    const input = String(event.target.value)
    setSets(input)
  }

  const handleRepsChange = (event) => {
    const input = String(event.target.value)
    setReps(input)
  }

  const handleWeightChange = (event) => {
    const input = String(event.target.value)
    setWeight(input)
  }

  return (
    <div>
      <Cal date={date} onSelect={dataChange} fill={true} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              Exercise
            </TableCell>
            <TableCell scope="col" border="bottom">
              Reps
            </TableCell>
            <TableCell scope="col" border="bottom">
              Sets
            </TableCell>
            <TableCell scope="col" border="bottom">
              Weight
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {session.map((sesh) => {
            return sesh.workout.map((s) => {
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
            })
          })}
          <TableRow>
            <TableCell scope="row">
              <InputGroup size="sm">
                <FormControl
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  value={exercise}
                  onChange={handleExerciseChange}
                />
              </InputGroup>
            </TableCell>
            <TableCell>
              <InputGroup size="sm">
                <FormControl
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  value={reps}
                  onChange={handleRepsChange}
                />
              </InputGroup>
            </TableCell>
            <TableCell>
              <InputGroup size="sm">
                <FormControl
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  value={sets}
                  onChange={handleSetsChange}
                />
              </InputGroup>
            </TableCell>
            <TableCell>
              <InputGroup size="sm">
                <FormControl
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  value={weight}
                  onChange={handleWeightChange}
                />
              </InputGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell scope="row">
              <Button variant="primary" onClick={handleAddWorkout}>
                Add workout
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
