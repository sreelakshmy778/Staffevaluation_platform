import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import './TeamTaskStatus.css'
const TeamtTaskStatus = () => {
const [view,setView]=useState([])  
const token=localStorage.getItem("access_token")
useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/task/status/view/`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

.then((response)=>{
    // alert("data got")
    setView(response.data)
})  
.catch((err)=>{
    alert("error")
    console.log("error",err?.response.data)
})  
},[])



  return (
    <div>
        <h1>Task Status</h1>
        <table className='table_team_task_status'>
        <tr>
            <th>Usename</th>
            <th>Task</th>
            <th>Status</th>
            <th>Completed tasks</th>
            <th>Pending</th>
            <th>In Progress</th>

        </tr>
        {view.map((v)=>(
            <tr>
                <td>{v.username}</td>

                <td>
                    <ol>
                        {v.tasks?.map((t,idx)=>(
                            <li>{t.title}</li>
                        ))}
                    </ol>
                    
                </td>          
                <td>
                    <ol>{v.tasks?.map((t,idx)=>(
                            <li>{t.status}</li>
                        ))}
                        </ol>
                    
                    
                </td>   
                <td>{v.completed}</td>
                <td>{v.pending}</td>
                <td>{v.in_progress}</td>
                
            </tr>
        ))}
        </table>
    </div>
  )
}

export default TeamtTaskStatus