import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { data, useNavigate } from 'react-router-dom'
import './Adminadd.css'
const Adminadd = () => {

const navigate=useNavigate();

const [add,SetAdd]=useState([])

const addData =(e)=>{
  const ename=e.target.name
  const evalue=e.target.value

  SetAdd({...add,[ename]:evalue})

}

const handleAdd=(e)=>{
  e.preventDefault();
  axios.post(`http://127.0.0.1:8000/api/register/`,add)
  .then((response)=>{
    alert("new user added")
    // navigate(`/admin/dashboard`)
    SetAdd(response.data)
  })
  .catch((err)=>{
    console.log("error",err?.response.data)
    alert("error in add")
  })
}

  return (
    <div>
      
      <form className='form_admin_add'>
        <h1>Register Form</h1>
        {/* <label className='add_label_admin'>Name</label> */}
        <input className='add_input_admin' onChange={addData} name='first_name' placeholder='Name'></input> <br></br>

        {/* <label className='add_label_admin'>Username</label> */}
        <input className='add_input_admin' onChange={addData} name='username' placeholder='Username'></input> <br></br>

        {/* <label className='add_label_admin'>Position</label> */}
        <input className='add_input_admin' onChange={addData} name='position' placeholder='Position'></input> <br></br>

        {/* <label className='add_label_admin'>E-mail</label> */}
        <input className='add_input_admin' onChange={addData} name='email' placeholder='E-mail'></input> <br></br>

        {/* <label className='add_label_admin'>Phone</label> */}
        <input className='add_input_admin' onChange={addData} name='phone' placeholder='Phone'></input> <br></br>

        {/* <label className='add_label_admin'>Role</label> */}
        <input className='add_input_admin' onChange={addData} name='role' placeholder='Role'></input> <br></br>

        {/* <label className='add_label_admin'>Password</label> */}
        <input className='add_input_admin' onChange={addData} name='password' placeholder='Password'></input> <br></br>

        <button onClick={handleAdd} id='add_btn_admin'>Add</button>
      </form>
    



    </div>
  )
}

export default Adminadd