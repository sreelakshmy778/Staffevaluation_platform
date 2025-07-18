import React from 'react'
import  { useEffect, useState } from 'react'
import './Hrrequestview.css'
import axios from 'axios'
const Hrrequestview = () => {
const[data,setData]=useState([])
const token=localStorage.getItem("access_token")
useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/request/retrive/manager/`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response)=>{
        // alert("data get")
        setData(response.data)
    })
    .catch((err)=>{
        console.log("error",err?.response.data)
        alert("error in request viewing")
    })
},[])

  return (
    <div>
<h1 className='view'>View Requests</h1>
{
  data.map((d)=>(
    <div className='view_request'>
    <h2 className='req_title'>{d.title}</h2>
    <p className='req_des'>{d.description}</p>
    </div>
  ))
}

    </div>
  )
}

export default Hrrequestview