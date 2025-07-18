import React from 'react'
import axios from 'axios'

import { useState,useEffect } from 'react'
import './Staffstatus.css'
const Staffstatus = () => {
const token=localStorage.getItem('access_token')
const [leave,setLeave]=useState([])

useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/leave/statusview`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response)=>{
        setLeave(response.data)
        alert("dat get")
    })
    .catch((err)=>{
        console.log("error",err?.response.data)
        alert("error in fetching status")
    })
},[])


  return (
    <div>
        <h1>Staffstatus</h1>

     <table>
       <tr>
        <th>Name</th>
        <th>Reason</th>
        <th>from_date</th>
        <th>due_date</th>
        <th>status</th>
       </tr>
       {leave.map((l)=>(
        <tr key={l.id}>
            <td>{l.username}</td>
            <td>{l.reason}</td>
            <td>{l.from_date}</td>
            <td>{l.due_date}</td>
            <td>{l.status}</td>
        </tr>
       ))}
     </table>


    </div>
  )
}

export default Staffstatus