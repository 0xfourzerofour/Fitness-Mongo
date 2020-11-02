import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import {
  Calendar as Cal,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from 'grommet'

import SessionForm from '../SessionForm/SessionForm'
import SessionAppend from '../SessionAppend.js/SessionAppend'

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

    })
  }



  const dataChange = (e) => {
    let x = e.split('T')[0]

    const y = x + 'T00:00:00.000+00:00'

    setDateChanged(y)
    setDate(e)

    getNewSession()
  }

  useEffect(() => {

    let x = new Date().toISOString(); 
    let y = x.split('T')[0]
    const w = y + 'T00:00:00.000+00:00'
    setDateChanged(w)

    // console.log(w)



    

  }, [])

  

  return (
    <div>

      <p>Select Date</p>
      <Cal date={date} onSelect={dataChange} fill={true} />
      <Table>

        {
          session.length >= 1 ? <TableHeader>
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
        </TableHeader> : <div/>
        }
        
        {
        session.length >= 1 ?<TableBody>
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
        
      </TableBody> : <div/>
      }
        
      </Table>
      {
        session.length >= 1 ? <SessionAppend date={dateChanged}/> : <SessionForm  date={dateChanged} />
      }
    </div>
  )
}
