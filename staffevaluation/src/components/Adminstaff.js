import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
const Adminstaff = () => {
const token=localStorage.getItem("access_token")
const [data,setData]=useState([])

useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/admin/staff/`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((response)=>{
        // alert("data got")
        setData(response.data)
    })
    .catch((err)=>{
        alert("error in fetching")
        console.log("error",err?.response.data)
    })
},[])
  return (
    <div>
        <h1>Staffs</h1>
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

export default Adminstaff