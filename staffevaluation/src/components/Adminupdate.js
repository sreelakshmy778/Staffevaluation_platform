import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
const Adminupdate = () => {

const [update,setUpdate]=useState({})
const navigate=useNavigate();
const token=localStorage.getItem('access_token')
const {id} =useParams();
console.log(id)
useEffect (()=>{
    axios.get(`http://127.0.0.1:8000/api/adminapi/${id}/`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((response)=>{
        setUpdate(response.data)
        // alert("data get")
    })
    .catch((err)=>{
        console.log("error",err?.response.data)
    })
},[id,token])

const handleUpdate=(e)=>{
const ename=e.target.name
  const evalue=e.target.value

  setUpdate({...update,[ename]:evalue})
}

const saveUpdate =(e)=>{
    e.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/adminapi/${id}/`,update,{
        headers:{
            Authorization : `Bearer  ${token}`
        }
    })
    .then((response)=>{
        setUpdate(response.data)
        alert("data updated")
        navigate(`/admin/dashboard`)
    })
    .catch((err)=>{
        console.log("error",err?.response.data)
        alert("error in updation")
    })

}


  return (
    <div>Adminupdate

       <form>

         <label className='aupdate_lab'>Name</label>
        <input className='aupdate_inp' name='first_name' value={update.first_name} onChange={handleUpdate}></input> <br></br>

        <label className='aupdate_lab'>Username</label>
        <input className='aupdate_inp' name='username' value={update.username} onChange={handleUpdate}></input> <br></br>

        <label className='aupdate_lab'>Position</label>
        <input className='aupdate_inp' name='position' value={update.position} onChange={handleUpdate}></input> <br></br>


        <label className='aupdate_lab'>Email</label>
        <input className='aupdate_inp' name='email' value={update.email} onChange={handleUpdate}></input> <br></br>

       <label className='aupdate_lab'>Phone</label>
        <input className='aupdate_inp' name='phone' value={update.phone} onChange={handleUpdate}></input> <br></br>
       
        <label className='aupdate_lab'>Role</label>
        <input className='aupdate_inp' name='role' value={update.role} onChange={handleUpdate}></input> <br></br>

        <label className='aupdate_lab'>Password</label>
        <input type='password' className='aupdate_inp' name='password' value={update.password}  onChange={handleUpdate}></input> <br></br>

        <button onClick={saveUpdate}>Update</button>

       </form>



    </div>
  )
}

export default Adminupdate