import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import './HrattendanceView.css'

const HrAttendanceView = () => {
const token=localStorage.getItem("access_token")
const [view,setView]=useState([])  

useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/attendance/view`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    .then((response)=>{
      
        const tasks = response.data;

      // ✅ Sort using the correct field
      const sortedTasks = tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
      setView(sortedTasks);
        console.log("📦 Response:", response.data);
        console.log("Username is", response.data.username);
        // alert("attendance got")
    })
    .catch((err)=>{
        alert("error")
        console.log("error",err?.response.data)
    })
},[])
  return (
    <div>

     <h1>Attendance List</h1>
     <table className='table_attendance'>
        <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
        </tr>
        {view.map((v)=>(
            <tr>
            
                <td>{v.user_name}</td>
                <td>{new Date(v.date).toLocaleDateString('en-GB')}</td>
                <td>{v.is_present ? 'Present' : 'Absent'}</td>
            </tr>
        ))}
     </table>


    </div>
  )
}

export default HrAttendanceView