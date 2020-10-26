import Axios from 'axios';
import React from 'react'
import './Dashboard.css'


class Dashboard extends React.Component {

  constructor(props){
    super(props); 
    this.state = {
      userSessions: []
    }
  }

  componentDidMount(){
    Axios.get('http://localhost:5000/session/usersessions', {
      headers: {
        "auth-token": localStorage.getItem('auth-token')
      }
    }).then(res => {
      this.setState({
        userSessions: res.data
      })
    })
  }

  render(){
    return (
      <div className="dashboard">
        <h2>Sessions</h2>
        {this.state.userSessions.map(session => {
          return session.workout.map(workout => {
            return <div style={{background: '#222222', color: "white"}}>
              <ul>
              <li>Exercise: {workout.exercise}</li>
              <li>Reps: {workout.reps}</li>
              <li>Sets: {workout.sets}</li>
              <li>Weight: {workout.weight}</li>
              
            </ul>
            </div>
          })
        
          
        })}
      </div>
    )


  }
  
}

export default Dashboard
