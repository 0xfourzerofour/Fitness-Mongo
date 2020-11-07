import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import {
  Calendar as Cal,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from 'grommet'

import SessionForm from '../SessionForm/SessionForm'
import SessionAppend from '../SessionAppend.js/SessionAppend'
import ChartView from '../chartView/ChartView'

// test

class Calender extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showChartView: false,
      chartExerciseData: { dates: [], weight: [] },
      date: new Date().toISOString(),
      dateChanged: '',
      session: [],
      allDates: [],
    }

    this.getNewSession = this.getNewSession.bind(this)

    this.dataChange = this.dataChange.bind(this)
    this.updateSessions = this.updateSessions

    this.toggleChartView = this.toggleChartView.bind(this)
    this.handleExerciseClick = this.handleExerciseClick.bind(this)
  }

  getNewSession = (date) => {
    Axios.get('http://localhost:5000/session/sessionbydate', {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
        sessionDate: date,
      },
    }).then((res) => {
      this.setState({ session: res.data })
    })
  }

  updateSessions = () => {
    Axios.get('http://localhost:5000/session/sessionbydate', {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
        sessionDate: this.state.dateChanged,
      },
    }).then((res) => {
      this.setState({ session: res.data })
    })
  }

  toggleChartView() {
    this.setState({
      showChartView: !this.state.showChartView,
    })
  }

  handleExerciseClick(exercise) {
    Axios.get('http://localhost:5000/session/allexercises', {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
        exercise: exercise,
      },
    }).then((res) => {
      let responseData = res.data.map((item) => {
        var options = {
          month: 'numeric',
          day: 'numeric',
        }
        var val = new Date(item.date)
        return {
          date: val.toLocaleDateString('en-AU', options),
          weight: item.workout.filter((exer) => exer.exercise === exercise)[0]
            .weight,
        }
      })
      responseData.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.date) - new Date(b.date)
      })
      let responseDates = responseData.map((item) => item.date)
      let responseWeight = responseData.map((item) => item.weight)
      this.setState({
        chartExerciseData: {
          name: exercise,
          dates: responseDates,
          weight: responseWeight,
        },
        showChartView: !this.state.showChartView,
      })
    })
  }

  dataChange = (e) => {
    let x = e.split('T')[0]

    const y = x + 'T00:00:00.000+00:00'

    this.setState({
      date: e,
      dateChanged: y,
    })

    this.getNewSession(y)
  }

  componentDidMount() {
    Axios.get('http://localhost:5000/session/alldates', {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
      },
    }).then((res) => {
      //all dates with sessions added to them
      //current issue with Grommet dates implementation,
      //I have lodged a github issue
      var newDates = []
      res.data.forEach((item) => {
        if (item.date != null) {
          var x = item.date.split('T')
          newDates.push(x[0])
        }
        this.setState({ allDates: newDates })
      })
    })

    let x = new Date().toISOString()
    let y = x.split('T')[0]
    const w = y + 'T00:00:00.000+00:00'
    this.setState({ dateChanged: w })

    this.getNewSession(w)
  }

  render() {
    return (
      <>
        <ChartView
          toggleChartView={this.toggleChartView}
          showChartView={this.state.showChartView}
          chartExerciseData={this.state.chartExerciseData}
        />
        <div>
          <p>Select Date</p>
          <Cal
            date={this.state.date}
            onSelect={this.dataChange}
            style={{ margin: '0 auto' }}
          />
          <Table>
            {this.state.session.length >= 1 ? (
              <TableHeader>
                <TableRow>
                  <TableCell scope="col" border="bottom">
                    Exercise
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    Sets
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    Reps
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    Weight
                  </TableCell>
                </TableRow>
              </TableHeader>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell>
                    <p>No exercises on this day!</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
            {this.state.session.length >= 1 ? (
              <TableBody>
                {this.state.session.map((sesh) => {
                  return sesh.workout.map((s) => {
                    return (
                      <TableRow key={s.exercise}>
                        <TableCell
                          scope="row"
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.handleExerciseClick(s.exercise)}
                        >
                          <strong>{s.exercise}</strong>
                        </TableCell>
                        <TableCell>{s.sets}</TableCell>
                        <TableCell>{s.reps}</TableCell>
                        <TableCell>{s.weight}</TableCell>
                      </TableRow>
                    )
                  })
                })}
              </TableBody>
            ) : null}
          </Table>
          {this.state.session.length >= 1 ? (
            <SessionAppend
              updateSessions={this.updateSessions}
              date={this.state.dateChanged}
            />
          ) : (
            <SessionForm
              updateSessions={this.updateSessions}
              date={this.state.dateChanged}
            />
          )}
        </div>
      </>
    )
  }
}

export default Calender
