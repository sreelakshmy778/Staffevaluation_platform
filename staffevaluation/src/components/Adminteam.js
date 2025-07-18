
import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
const Adminteam = () => {

const token=localStorage.getItem("access_token")
const [data,setData]=useState([])

useEffect(()=>{
  axios.get(`http://127.0.0.1:8000/api/admin/team/`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })

  .then((response)=>{
    setData(response.data)
    console.log("API Response:", response.data);
    // alert("data get")
  })
  .catch((err)=>{
    alert("error in dta geting")
    console.log("error",err?.response.data)
  })
},[])

  return (
    <div>
    
     <table className='admintable'>
           <tr>
                 <th>Name</th>
                <th>Username</th>
                <th>Position</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
      </tr>

       {
        data.map((d)=>(
            <tr>
                <td>{d.first_name}</td>
                <td>{d.username}</td>
                <td>{d.position}</td>
                <td>{d.email}</td>
                <td>{d.phone}</td>
                <td>{d.role}</td>
            </tr>
        ))
      }

     </table>



    </div>
  )
}

export default Adminteam