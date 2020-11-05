import Axios from 'axios';
import React from 'react'
import './Dashboard.css'
import Calender from '../Calender/Calender'; 
import Chart from '../chart/Chart';


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
      <div className="home">
        <h2>Sessions</h2>

      <Calender/>
      <Chart/>
      </div>
    )


  }
  
}

export default Dashboard
