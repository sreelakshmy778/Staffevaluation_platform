import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import './Managerrequest.css'
const Managerrequest = () => {

const [request,setRequest]=useState([])
const token=localStorage.getItem('access_token')

const saveRequest =(e)=>{
const ename=e.target.name
const evalue=e.target.value
setRequest({...request,[ename]:evalue})

}


const createRequest=(e)=>{
  e.preventDefault();

axios.post(`http://127.0.0.1:8000/api/request/`,request,{
 headers:{
        Authorization: `Bearer ${token}`
  }
  })
.then((response)=>{
    setRequest(response.data)
    alert("request created sucessfully")
    
  })
  .catch((err)=>{
    alert("error in request creation")
    console.log("error",err?.response.data)
  })

}






  return (
    <div>
    <h1>Make A Request</h1>
    
    <form className='manager_request_form'>
      <label className='request_label'>Matter</label>
      <input type='textfield' name='title' className='request_input' onChange={saveRequest}></input> <br></br>

      <label className='request_label'>Description</label>
      <textarea  name='description'  className='request_input'  onChange={saveRequest}  /> <br></br>
      
      <button onClick={createRequest} id='mbtn'>Create Request</button>
    </form>
    



    </div>
  )
}

export default Managerrequest