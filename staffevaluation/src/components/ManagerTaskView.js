import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import './ManagerTaskView.css'
const ManagerTaskView = () => {
const token=localStorage.getItem("access_token")
const [get,setGet]=useState([])   
const [data,SetData]=useState(null)
useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/task/status/view/`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response)=>{
        setGet(response.data)
        // alert("data get")
    })
    .catch((err)=>{
        alert("error in data get")
        console.log("error",err?.response.data)
    })
},[])

const getDetails = (username) => {
    const selected = get.find(user => user.username === username);
    SetData(selected);
  };

  return (
    <div className='arrange'>
        
        <h1 className='task_view' >Task Overview</h1>
        <div className='task_brief'>
        {
            get.map((d)=>(
                <div className='task_view1' >
                <p>{d.position}</p>
                <p>{d.firstname}</p> 
                <button onClick={() => getDetails(d.username)} id='btn_view'>View Details</button>

                </div>
            ))
        }
        <div>
  {data && (
    <div className="task-details-card">
        <div>
          <h2>Task Details for {data.firstname}</h2>
          <p>✅ Completed Tasks: <strong>{data.completed}</strong></p>
          <p>🕒 Pending Tasks: <strong>{data.pending}</strong></p>
          <p>🚧 In Progress: <strong>{data.in_progress}</strong></p>
        </div>

        <div className='task-details-card1'>
          <h2>Task Breakdown:</h2>
          <ul>
            {data.tasks.map((task, index) => (
              <li key={index}>
                <strong>{task.title}</strong> — {task.status}
              </li>
            ))}
          </ul>
        </div>
    </div>
      )}
      </div>
                
            </div>
        
    </div>
  )
}

export default ManagerTaskView