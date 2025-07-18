import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import './Admin.css'


const Admin = () => {

const token=localStorage.getItem('access_token')

const[data,setData]=useState([])
useEffect(()=>{
axios.get(`http://127.0.0.1:8000/api/adminapi/`,{
  headers:{
    Authorization :`Bearer ${token}`
  }
})
.then((response)=>{
  setData(response.data)
  // alert("data got")
})
.catch((err)=>{
  console.log("error",err?.response.data)
  alert("error in fetching data")
})

},[])

const handleDelete =(id)=>{
  if(window.confirm("are u sure to delete the data?")){
    axios.delete(`http://127.0.0.1:8000/api/adminapi/${id}/`,{
      headers:{
        Authorization :`Bearer ${token}`
      }
    })
    .then((response)=>{
      console.log("Trying to delete user ID:", id);
      alert("data deleted")
      setData((prevData) => prevData.filter((student) => student.id !== id));
    })
    .catch((err)=>{
      console.log("error",err?.response.data)
      alert("error in deletion")
    })
  }
  
}

const {id} =useParams();
const navigate=useNavigate();

const handleUpdate =(id)=>{
  navigate(`/admin/update/${id}`)
}


  return (
    <div>

<table className='admintable'>
      <tr className='tradmin'>
      <th>Name</th>
      <th>Username</th>
      <th>Position</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Role</th>
      
      <th >Delete</th>
      <th>Update</th>
</tr>

{data.map((d)=>(

 <tr key={d.id} >
   <td>{d.first_name}</td>
  <td>{d.username}</td>
   <td>{d.position}</td>
  <td>{d.email}</td>
   <td>{d.phone}</td>
  <td>{d.role}</td>
 
 
 
 
  {/* <td>{d.is_staff ? 'Yes' : 'No'}</td> */}
   {/* <td>{d.is_superuser ? 'Yes' : 'No'}</td> */}
  <td><button onClick={()=>handleUpdate(d.id)} id='delete'>Update</button></td>
  <td><button onClick={() => handleDelete(d.id)} id='update'>Delete</button></td>


 </tr>


))}
    </table>



    </div>
  )
}

export default Admin