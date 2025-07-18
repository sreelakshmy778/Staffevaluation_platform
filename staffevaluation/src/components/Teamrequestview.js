import React from 'react'
import  { useEffect, useState } from 'react'
import './Teamrequestview.css'
import axios from 'axios'
const Teamrequestview = () => {

const [view,setView]=useState([])
const token=localStorage.getItem("access_token")
useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/request/retrive/teamlead/`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((response)=>{
        // alert("data get")
        setView(response.data)

    })
    .catch((err)=>{
        alert("error in data fetching")
        console.log("error",err?.response.data)
    })
},[])
  return (
    <div>

    <h1>View Requests</h1>
 <table className='table_teamrequest'>
    <tr>
        <th>Title</th>
        <th>Description</th>
    </tr>
    {
        view.map((d)=>(
            <tr>
                <td>{d.title}</td>
                <td>{d.description}</td>
            </tr>
        ))
    }
 </table>
    </div>
  )
}

export default Teamrequestview