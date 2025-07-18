import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import './HrEvaluateTeamView.css'
const HrEvaluateTeamView = () => {
const token=localStorage.getItem("access_token")
const [view,setView]=useState([])

useEffect(()=>{
  axios.get(`http://127.0.0.1:8000/api/hr/team/evaluate/team/`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  .then((response)=>{
    console.log("DATA:", response.data);
    // alert("data get")
    setView(response.data)
  })
  .catch((err)=>{
    alert("error")
    console.log("error",err?.response.data)
  })
},[])
  return (
    <div>
    
    <table className='hr_teamevaluate'>
      <tr>
          <th rowSpan={2}>Created Time</th>
          <th rowSpan={2}>Evaluator</th>
       
          <th  colSpan={3} style={{textAlign:'center'}}>Score(out of 10)</th>
          <th rowSpan={2}>Comment</th>
       
      </tr>
      <tr>
           
            <th style={{textAlign:'center'}}>Leadership</th>
            <th style={{textAlign:'center'}}>Employee Development</th>
            <th style={{textAlign:'center'}}>Communication</th>
            
            
      </tr>
      {view.map((v,index)=>(
        <tr key={index}>
              <td>{new Date(v.creation).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'  // force IST
  })}</td>
              <td>{v.evaluater_name}</td>
              <td style={{textAlign:'center'}}>{v.leadership_score}</td>
              <td style={{textAlign:'center'}}>{v.employeedevlopment_score}</td>
              <td style={{textAlign:'center'}}>{v.communication_score}</td>
              <td>{v.comment}</td>
             
            </tr>
      ))}
    </table>


    </div>
  )
}

export default HrEvaluateTeamView