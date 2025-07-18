import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
const TeamleaderAttendance = () => {
const [attendance,setAttendance]=useState(false)  
const[today,setToday]=useState('') 
const token=localStorage.getItem("access_token")

useEffect(() => {
  const currentDate = new Date();
  const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month (0-indexed)
  const dd = String(currentDate.getDate()).padStart(2, '0');
  const yyyy = currentDate.getFullYear();
  const formattedDate = `${dd}-${mm}-${yyyy}`;
  setToday(formattedDate);
}, []);



const handleMarkAttendance =()=>{
axios.post(`http://127.0.0.1:8000/api/attendance/mark`,
  { is_present: true },{
    headers:{
        Authorization: `Bearer ${token}`
    }
})
.then((response) => {
    const msg = response.data.message;
    console.log(msg);
    alert(msg);
    if (msg.includes("already")) {
      setAttendance(true);
    } else if (msg.includes("marked")) {
      setAttendance(true);
    }
  })
  .catch((err) => {
    console.log("❌ Error:", err.response?.data || err.message);
    alert("Error marking attendance");
  });
}

return (
    <div>
      <h1>Welcome,Team Leader</h1>
     <h2>📝 Attendance</h2>
      <p><strong>📅 Today:</strong> {today}</p>
      <p>Please mark your presence below:</p>
      <button
        onClick={handleMarkAttendance}
        disabled={attendance}
        className={attendance ? "marked-btn" : "mark-btn"}
      >
        {attendance ? '✅ Already Marked' : '✅ Mark Present'}
      </button>

    </div>
  )
}

export default TeamleaderAttendance