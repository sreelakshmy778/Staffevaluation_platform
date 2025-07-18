import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import './Staffevaluate.css'

const Staffevaluate = () => {

const token=localStorage.getItem('access_token')
const[evaluate,setEvaluate]=useState([])
const [hrEvaluations, setHrEvaluations] = useState([])
const [teamEvaluations, setTeamEvaluations] = useState([])

useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/evaluation/view/`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    .then((response)=>{
        const all = response.data
        const hr = all.filter(e => e.evaluater_role === 'HR')
       
        setHrEvaluations(hr)
        console.log(hr)
       
    })
    .catch((err)=>{
        alert("error in getting data")
        console.log("error",err?.response.data)
    })
},[])

/*team leaddd.....................................................*/


useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/team/evaluate/staff/view`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    .then((response)=>{
        const all = response.data
        
        const team = all.filter(e => e.evaluater_role ==='TeamLeader')
        
        setTeamEvaluations(team)
        console.log("team",team)
        
    })
    .catch((err)=>{
        alert("error in getting data")
        console.log("error",err?.response.data)
    })
},[])




  return (
    <div>
        <h1>Evaluation Status</h1>

        <table className='staffevaluate_table'> 
            <tr>
                <th rowSpan={2}>Date of creation</th>
                <th colSpan={2} style={{textAlign:'center'}}>Score(out of 10)</th>
                <th rowSpan={2}>Comment</th>
                
                <th rowSpan={2}>Evaluater</th>
            </tr>
            <tr>
                {/* <th></th> */}
                <th>Attendace</th>
                <th>Carrer Progress</th>
                {/* <th></th> */}
                {/* <th></th> */}
            </tr>
            {
                hrEvaluations.map((e, idx)=>(
                    <tr>
                        <td>{new Date(e.creation).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                        timeZone: 'Asia/Kolkata'  // force IST
                    })}</td>
                        <td>{e.attendance_score}</td>
                        <td>{e.career_score}</td>
                        <td>{e.comment}</td>
                        
                        <td>{e.evaluater_role}</td>
                    </tr>
                ))
            }
        </table>





 <table className='staffevaluate_table' style={{marginTop:"50px"}}> 
  <tr>
    <th rowSpan={2}>Date of creation</th>
    <th colSpan={3} style={{textAlign:'center'}}>Score(out of 10)</th>
    <th rowSpan={2}>Comment</th>
    <th rowSpan={2}>Evaluater</th>
  </tr>
  <tr>
    <th>Communication</th>
    <th>Team Work</th>
    <th>Task Performance</th>
  </tr>
  {
    teamEvaluations.map((e, idx) => (
      <tr key={idx}>
        <td>{new Date(e.creation).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'  // force IST
        })}</td>
        <td>{e.communication_score}</td>
        <td>{e.teamwork_score}</td>
        <td>{e.taskperform_score}</td>
        <td>{e.comment}</td>
        <td>{e.evaluater_role}</td>
      </tr>
    ))
  }
</table>




    </div>
  )
}

export default Staffevaluate