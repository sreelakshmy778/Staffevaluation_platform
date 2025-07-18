import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import './Teamtask.css'
const Teamtask = () => {

const token=localStorage.getItem('access_token')
const [task,setTask]=useState([])
const [data,setData]=useState([])

useEffect (()=>{
axios.get(`http://127.0.0.1:8000/api/team/taskuser/`,{
    headers:{
        Authorization: `Bearer ${token}`
    }
})
.then((response)=>{
    setData(response.data)

})
.catch((err)=>{
    alert("error in username")
    console.log("error",err?.response.data)
})

},[])





const handleTask =(e)=>{
    const ename=e.target.name
    const evalue=e.target.value
    setTask({...task,[ename]:evalue})
}

const saveTask=(e)=>{
    e.preventDefault()
    axios.post(`http://127.0.0.1:8000/api/task/`,task,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response)=>{
        setTask(response.data)
        alert("task added")
    })
    .catch((err)=>{
        alert("error in task adding")
        console.log("error",err?.response.data)
    })
}


  return (
    <div>
    <h1>Assign Tasks</h1>

<table className='table_teamtask'>
    <tr>
    <th>Name</th>
    <th>Title</th>
    <th>Details</th>
    <th>Due_Date</th>
   </tr> 
    
<tr>
<td>
      <select name="staff" onChange={handleTask} className='taskinput'>
  <option value='' >Select User</option>
  {data.map((d) => (
    <option key={d.id} value={d.id} > 
      {d.username}
    </option>
  ))}
</select>
      </td>



<td><input className='taskinput' name='title' onChange={handleTask}></input></td>
<td><input className='taskinput' name='detail' onChange={handleTask}></input></td>
<td><input type='date' className='taskinput' name='due_date' onChange={handleTask}></input></td>
</tr>
<button onClick={saveTask} id='teamtask_btn'>Create Tasks</button>

</table>  
    
    
    
    </div>
  )
}

export default Teamtask