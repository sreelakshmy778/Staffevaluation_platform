import React from 'react'
import  { useEffect, useState } from 'react'
import './Hrrequest.css'
import axios from 'axios'
const Hrrequest = () => {
const token=localStorage.getItem("access_token")
const[request,setRequest]=useState([])    



const saveRequest = ({ target: { name, value } }) => {
  setRequest(prev => ({ ...prev, [name]: value }));
};


const createRequest =()=>{
axios.post(`http://127.0.0.1:8000/api/request/`,request,{
    headers:{
        Authorization: `Bearer ${token}`
    }
})
.then((response)=>{
    setRequest(response.data)
    alert("request send")
})
.catch((err)=>{
    alert("error in request sending")
    console.log("error",err?.response.data)
})

}


  return (
    <div >
       
   
    <form className='form_hr'>
       <h1 className='send_request'>Send Request</h1>
      <label className='requestt_label'>Matter</label>
      <input type='textfield' name='title' className='request_input' onChange={saveRequest}></input> <br></br>

      <label className='requestt_label1'>Description</label>
      <input type='textarea' name='description' className='request_input1' onChange={saveRequest}></input> <br></br>
      
      <button onClick={createRequest} id='btn_hrrequest'>Create Request</button>
    </form>




    </div>
  )
}

export default Hrrequest