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

class Calender extends React.Component {

  constructor(props){
    super(props); 

    this.state = {
      date: new Date().toISOString(),
      dateChanged: '',
      session : [],
      allDates: [] 
    }

    this.getNewSession = this.getNewSession.bind(this); 

    this.dataChange = this.dataChange.bind(this);
    this.updateSessions = this.updateSessions

  }

  getNewSession = () => {
    Axios.get('http://localhost:5000/session/sessionbydate', {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
        sessionDate: this.state.dateChanged,
      },
    }).then((res) => {
      this.setState({session: res.data})

    })
  }

  updateSessions = () => {
    Axios.get('http://localhost:5000/session/sessionbydate', {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
        sessionDate: this.state.dateChanged,
      },
    }).then((res) => {
      this.setState({session: res.data})

    })

  }


  dataChange = (e) => {
    let x = e.split('T')[0]

    const y = x + 'T00:00:00.000+00:00'

    this.setState({
      date: e, 
      dateChanged: y
    })

    this.getNewSession()
  }

  componentDidMount(){

    Axios.get('http://localhost:5000/session/alldates',{
      headers: {
        'auth-token': localStorage.getItem('auth-token')
      }
    }).then(res => {

      //all dates with sessions added to them
      //current issue with Grommet dates implementation, 
      //I have lodged a github issue 
      
      var newDates = []
      res.data.forEach((item) => {
        if(item.date != null){
          var x = item.date.split("T")
        newDates.push(x[0])
        }
      this.setState({allDates: newDates})


      })

    })

    let x = new Date().toISOString(); 
    let y = x.split('T')[0]
    const w = y + 'T00:00:00.000+00:00'
    this.setState({dateChanged: w})

    this.getNewSession();

  

  }


  render(){
  return (
    <div>

      <p>Select Date</p>
      <Cal dates={this.state.allDates}  onSelect={this.dataChange} fill={true} />
      <Table>

        {
          this.state.session.length >= 1 ? <TableHeader>
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
        </TableHeader> : <p>Sorry no information for selected day.</p>
        }
        
        {
        this.state.session.length >= 1 ?<TableBody>
        {this.state.session.map((sesh) => {
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
        this.state.session.length >= 1 ? <SessionAppend updateSessions={this.updateSessions} date={this.state.dateChanged}/> : <SessionForm updateSessions={this.updateSessions} date={this.state.dateChanged} />
      }
    </div>
  )

  
}
  

  
}

export default Calender; 
