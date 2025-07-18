import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'
const Signup = () => {

const [save,SetSave]=useState({})
const navigate=useNavigate();
const signData =(e)=>{
    const ename=e.target.name
    const evalue=e.target.value

    SetSave({...save,[ename]:evalue})
}

const handleSignup =(e)=>{
e.preventDefault();
axios.post(`http://127.0.0.1:8000/api/register/`,save)
.then((response)=>{
    SetSave(response.data)
    alert("data registered")
 navigate('/')
})

.catch((err)=>{
    console.log(err?.response.data)
    alert("error in registration")
})
}


  return (
    <div>
        

        <form className='signup_form'>
            <h1 className='signup'>Signup</h1>

            <label  className='slab'>Name</label>
            <input name='first_name' onChange={signData} className='sinp'></input>  <br></br>

            <label  className='slab'>Username</label>
            <input name='username' onChange={signData} className='sinp'></input>  <br></br>

            <label  className='slab'>Position</label>
            <input name='position' onChange={signData} className='sinp'></input>  <br></br>

            <label  className='slab'>Email-id</label>
            <input name='email' onChange={signData} className='sinp'></input>  <br></br>

            <label  className='slab'>Phone</label>
            <input name='phone' onChange={signData} className='sinp'></input>  <br></br>

            <label className='slab'>Role</label>
            <select name='role' onChange={signData} className='sinp'>
            <option value="">Select Role</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="TeamLead">Team Lead</option>
            <option value="Staff">Staff</option>
            </select>  <br></br>

            <label  className='slab'>Password</label>
            <input name='password' onChange={signData} className='sinp'></input>  <br></br>

            <button id='sign_btn' onClick={handleSignup}>Signup</button>
        </form>



    </div>
  )
}

export default Signup