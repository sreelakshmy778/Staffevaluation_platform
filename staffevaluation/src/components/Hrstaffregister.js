import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import './Hrstaffregister.css'

const Hrstaffregister = () => {
 const[register,setRegister]=useState({})   

const token=localStorage.getItem('access_token')

const saveData =(e)=>{
const ename=e.target.name
const evalue=e.target.value
setRegister({...register,[ename]:evalue})

}

const submitRegister=(e)=>{
    e.preventDefault();
    axios.post(`http://127.0.0.1:8000/api/register/`,register,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((response)=>{
        setRegister(response.data)
        alert("registration sucessfull")
    })
    .catch((err)=>{
        console.log("error",err?.response.data)
        alert("error in registration")
    })
}

  return (
    <div>
       
        <form className='hrregister_form'>
             <h1 className='hr_register' >Register Staff</h1>

            <label className='lab_hrregister'>Name</label>
            <input name='first_name' className='inp_hrregister' onChange={saveData}></input> <br></br>

            <label className='lab_hrregister'>Username</label>
            <input name='username' className='inp_hrregister' onChange={saveData}></input> <br></br>

            <label className='lab_hrregister'>Position</label>
            <input name='position' className='inp_hrregister' onChange={saveData}></input> <br></br>

             <label className='lab_hrregister'>E-mail</label>
            <input name='email' className='inp_hrregister' onChange={saveData}></input> <br></br>

             <label className='lab_hrregister'>Phone</label>
            <input name='phone' className='inp_hrregister' onChange={saveData}></input> <br></br>

             <label className='lab_hrregister'>Role</label>
            <input name='role' className='inp_hrregister' onChange={saveData}></input> <br></br>

             <label className='lab_hrregister'>Password</label>
            <input name='password' className='inp_hrregister' onChange={saveData}></input> <br></br>

            <button id='btn-hrreg' onClick={submitRegister}>Register</button>
        </form>



    </div>
  )
}

export default Hrstaffregister