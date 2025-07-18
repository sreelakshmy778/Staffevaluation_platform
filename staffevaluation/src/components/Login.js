import React from 'react'
import './Login.css'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {


const [data,SetData]=useState({
    'username':'',
    
    'password':''
})

const navigate=useNavigate();

const loginData =(e)=>{
const ename=e.target.name
const evalue=e.target.value
SetData({...data,[ename]:evalue})

}


const submitLogin =(e)=>{
    e.preventDefault();
axios.post(`http://127.0.0.1:8000/api/token/`,data)
.then((response)=>{

    const { access, refresh, role, user_id} = response.data;

    console.log(role)
    const userId=localStorage.getItem('user_id')
    localStorage.setItem('access_token',access)
    localStorage.setItem('refresh_token',refresh)
    localStorage.setItem("role", role);
    localStorage.setItem("id",user_id)
    localStorage.setItem('user_name', response.data.username);
    const a=localStorage.getItem("id")
    console.log('id of user',a)

    axios.defaults.headers.common['Authorization']=`Bearer ${access}`
    if (role === 'admin')
    {
     navigate('/admin/dashboard');
    
    }
    else if(role==='Staff'){
          navigate('/staff/dashboard');
    
    }
    else if(role=="HR"){
      navigate('/hr/dashboard')
    }
    else if(role=="TeamLeader"){
      navigate(`/attendance/teamlead`)
    }
    else{
      navigate(`/main`)
    }

 alert("login sucessfull")

})
.catch((err)=>{
    alert("login failure")
    console.log("error",err?.response.data)
})

}


  return (
    <div>

        <form className='login_form'>
          <h1 className='login'>Login</h1>
            {/* <label className='llab'>Username:</label> */}
            <input name='username' className='linp' onChange={loginData} placeholder='Enter Username'></input> <br></br>

            {/* <label className='llab'>Role:</label>
            <input name='role' className='linp' onChange={loginData}></input> <br></br> */}

             {/* <label className='llab'>Password:</label> */}
            <input name='password' className='linp' onChange={loginData} placeholder='Enter Password'></input> <br></br>
             
            <button onClick={submitLogin} id='login_btn'>LOGIN</button>
            <a href='/signup' className='create_account'>Create A Account?</a>
        </form>
    </div>
  )
}

export default Login