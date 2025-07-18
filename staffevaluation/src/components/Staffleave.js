import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import './Staffleave.css'
const Staffleave = () => {

const[leave,setLeave]=useState({})
const [leavestatus,setLeavestatus]=useState([])
const token=localStorage.getItem('access_token')
const saveLeave=(e)=>{
    const ename=e.target.name
    const evalue=e.target.value
    setLeave({...leave,[ename]:evalue})
}
const submitLeave =(e)=>{
    e.preventDefault()
axios.post(`http://127.0.0.1:8000/api/leave/`,leave,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})
.then((response)=>{
    setLeave(response.data)
    alert("leave applied")
})
.catch((err)=>{
    console.log("error",err?.response.data)
    alert("error in leave request")
})

}


useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/leave/statusview`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response)=>{
        setLeavestatus(response.data)
        // alert("dat get")
    })
    .catch((err)=>{
        console.log("error",err?.response.data)
        alert("error in fetching status")
    })
},[])



  return (
    <div>
        
        <form className='leave_form'>
            <h1>Leave Form</h1>
            <label className='leave_label'>Reason</label>
            <input type='text' name='reason' onChange={saveLeave} className='leave_input'></input> <br></br>

            <label className='leave_label'>From_Date</label>
            <input type='date' name='from_date' onChange={saveLeave} className='leave_input'></input> <br></br>

            <label className='leave_label'>To_Date</label>
            <input type='date' name='due_date' onChange={saveLeave} className='leave_input' placeholder='from date'></input> <br></br>

            <button id='leave_id' onClick={submitLeave}>Apply</button>
        </form>


<h2 className='leave_status'>Leave Status</h2>
<table className='table_task'>
       <tr>
        <th>Name</th>
        <th>Reason</th>
        <th>From_date</th>
        <th>Due_date</th>
        <th>Status</th>
       </tr>
       {leavestatus.map((l)=>(
        <tr key={l.id}>
            <td>{l.username}</td>
            <td>{l.reason}</td>
            <td>{new Date(l.from_date).toLocaleDateString('en-GB')}</td>
            <td>{new Date(l.due_date).toLocaleDateString('en-GB')}</td>
            <td>{l.status}</td>
        </tr>
       ))}
     </table>



    </div>
  )
}

export default Staffleave