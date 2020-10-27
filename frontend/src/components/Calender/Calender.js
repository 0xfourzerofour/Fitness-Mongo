import Axios from 'axios';
import React, { Component } from 'react'
import {Calendar as Cal,  Table, TableBody, TableCell, List, TableHeader, TableRow,
  Text,} from 'grommet'; 



export default class Calender extends Component {

  constructor(props){
    super(props)

    this.state = {
      date: new Date().toISOString(),
      dateChanged: '',
     
      session: []
    }

  
  }

  getNewSession(){
    Axios.get('http://localhost:5000/session/sessionbydate', {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
        'sessionDate': this.state.dateChanged
      }
    }).then(res => {
      this.setState({
        session: res.data
      })

      console.log(res)
    })
  }

  dataChange = (e) => {
    let x = e.split('T')[0]; 

    const y = x + 'T00:00:00.000+00:00'

  this.setState({
    dateChanged: y,
    date: e
  })

  this.getNewSession();

  }


  render() {
    return (
      <div>
        <Cal

  date={this.state.date}
  onSelect={this.dataChange}
  fill={true}
/>
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
    {this.state.session.map(sesh => {
      return sesh.workout.map(s => {
        return <TableRow>
        <TableCell scope="row">
          <strong>{s.exercise}</strong>
        </TableCell>
        <TableCell>{s.reps}</TableCell>
        <TableCell>{s.sets}</TableCell>
        <TableCell>{s.weight}</TableCell>
      </TableRow>
      })
    })}
    
  </TableBody>
</Table>

      </div>
    )
  }
}
