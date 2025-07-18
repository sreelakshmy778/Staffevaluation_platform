import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import './Stafftask.css'
import { useNavigate,useParams } from 'react-router-dom'
const Stafftask = () => {


const [notified, setNotified] = useState(false);
const Id=localStorage.getItem('id')  

const token=localStorage.getItem('access_token')
const [data,setData]=useState([])

 
useEffect(()=>{

  if (!Id) {
      console.warn('No ID in URL, cannot fetch tasks.',Id);
      return;
    }
  axios.get(`http://127.0.0.1:8000/api/staff/taskview/${Id}/`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
    
  })
  
  .then((response)=>{
    
    // alert("data get")
  console.log("Fetched data for id:", Id);
  console.log("Response data:", response.data);

const tasks = response.data.tasks || [];
const newTaskIds = response.data.new_task_ids || [];
console.log("New tasks found:", newTaskIds);


if (newTaskIds.length > 0 && !notified) {
      alert("🔔 You have new tasks assigned!");
      setNotified(true);
}
    const sortedTasks = tasks.sort((a, b) => new Date(b.current_date) - new Date(a.current_date));
    setData(sortedTasks);
    // setData(tasks)
  })
  .catch((err)=>{
    alert("data not get")
    console.log("error",err?.response?.data)
  })
},[Id, notified])


const handleStatusChange = (taskId, newStatus) => {
    axios.patch(`http://127.0.0.1:8000/api/staff/task/update/${taskId}/`, 
      { status: newStatus }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(() => {
      // Update local state
      const updatedData = data.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      setData(updatedData);
      alert("✅ Status updated!");
    })
    .catch((err) => {
      alert("⚠️ Failed to update status.");
      console.log("Update error:", err?.response?.data || err.message);
    });
  };




  return (
    <div>

     <h1>📋 Staff Dashboard</h1>
      {/* <h2>welcome {username}</h2> */}
    <table className='table_task'>

    <tr>
      <th>Title</th>
      <th>In Deatil</th>
      <th>Assigned_Date</th>
      <th>Due_Date</th>
      <th>Status</th>
    </tr>


    {
      data.map((d)=>(
<tr key={d.id}>
  <td>{d.title}</td>
  <td>{d.detail}</td>
  <td>{new Date(d.current_date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'  // force IST
  })}</td>
  <td> {new Date(d.due_date).toLocaleDateString('en-GB')}  </td>
  {/* <td>{d.staff_id?.staffname || 'N/A'}</td> */}
  <td>
 <select
    value={d.status || ''}
    onChange={(e) => handleStatusChange(d.id, e.target.value)}
    >
    <option value="">Select</option>
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
    </select>   
  </td>
</tr>
      ))
    }

    </table>







    </div>
  )
}

export default Stafftask