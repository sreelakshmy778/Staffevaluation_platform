import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { Dropdown } from 'bootstrap'
import { DropdownItemText } from 'react-bootstrap'
import './Hrleave.css'
const Hrleave = () => {

const [data,setData]=useState([])    
const token=localStorage.getItem('access_token')
useEffect (()=>{
axios.get(`http://127.0.0.1:8000/api/leaveapi/`,{
    headers:{
        Authorization: `Bearer ${token}`
    }
})
.then((response)=>{
  const sortedData = [...response.data].sort((a, b) =>
        new Date(b.from_date) - new Date(a.from_date)
      );
      setData(sortedData);
    // setData(response.data)
    // alert("data got")
})
.catch((err)=>{
    console.log("error",err?.response.data)
    alert("error in data get")
})
},[])


const handleStatus=(id, newStatus)=>{

  axios.patch(`http://127.0.0.1:8000/api/leaveapi/${id}/`,{
    status:newStatus
  },{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  .then((response)=>{
    
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    alert("status added")
  })

  .catch((err)=>{
    alert("error in status")
    console.log("error",err?.response.data)
  })
}


  return (
    <div>
        <h1>Approve Leave Request</h1>
      <table className='table_leave_view'>
       <tr>
        <th>Applicant</th>
        <th>Reason</th>
        <th>From_date</th>
        <th>Due_date</th>
        <th>Status</th>
       </tr>
       {data.map((d)=>(
        <tr key={d.id}>
            <td>{d.username}</td>
            <td>{d.reason}</td>
            <td>{new Date(d.from_date).toLocaleDateString('en-GB')}</td>
            <td>{new Date(d.due_date).toLocaleDateString('en-GB')}</td>
            <td>
  <select
    value={d.status || ""}
    onChange={(e) => handleStatus(d.id, e.target.value)} className='select_leave'
  >
    <option value="" disabled>--</option>
    <option value="Approved">Approved</option>
    <option value="Pending">Pending</option>
    <option value="Rejected">Rejected</option>
  </select>
</td>
        </tr>
       ))}
      </table>
    
    
    </div>
  )
}

export default Hrleave