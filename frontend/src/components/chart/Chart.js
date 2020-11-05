import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Bar} from 'react-chartjs-2';

const Chart = () => 
{   
    const [users, setUsers] = useState([])
    useEffect(()=>{
        console.log('worked time 2')
        Axios
            .get('http://localhost:5000/session/usersessions' , {
               headers: {
                   "auth-token": localStorage.getItem('auth-token')
               } 
            })
            .then(res => {
                console.log("response gotten " + res.data)
                setUsers(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const data = {
        labels: 
    }

    return (
        <Bar 
            data ={users.reps}
            options={{
                title:{
                    display:true,
                    text:'Your daily progress',
                    fontSize:20
                },
                legend:{
                    display:true,
                    position:'right'
                }
            }}
        />    
        
    );
}

export default Chart