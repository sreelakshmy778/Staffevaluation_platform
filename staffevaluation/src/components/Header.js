import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import { useState,useEffect } from 'react'



const Header = () => {

  const [role, setRole] = useState(null);
const location=useLocation();

useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
    console.log(role)
  }, [location]); // Runs when route changes





if ((location.pathname ==='/') || (location.pathname ==='/signup'))
    {
    return null
}
  return (
    <div>


        <nav>
          <ul>
              {/* <Link to='/main'>main</Link> */}
              <Link to='/' className='logout'>Log Out</Link>
             
            {role === "admin" &&(
                  <div className="layout">
                    <div className="sidebar">
                      <Link to="/admin/manager">Manager</Link>
                      <Link to="/admin/hr">HR</Link>
                      <Link to="/admin/team">TeamLeader</Link>
                      <Link to="/admin/staff">Staff List</Link>
                    </div>

                    <div className="main">
                      <div className="header">
                        <Link to='/admin/dashboard'>Home</Link>
                        <Link to="/admin/add">Create User</Link>
                      </div>

                      <div className="content">
                        {/* This is where routed pages or content will go */}
                      </div>
                    </div>
                  </div>
            )}
   
          </ul>
            <ul>
              {role=="Staff" &&(
                <div className='header_elements'>
                <Link to='/attendance/staff'>Mark Attendance</Link>
                <Link to='/staff/tasks'>Tasks</Link>
                <Link to='/staff/leave'>Leave Status</Link>
                {/* <Link to='/staff/leave_status'>Leave Status</Link> */}
                <Link to='/staff/evaluate'>Evaluation Status</Link>
                </div>
              )}
            </ul>
            {role=="HR" &&(
              <div className='header_elements'>
              <Link to='/hr/request/view'>View Requests</Link>
              <Link to='/hr/staffregister'>Register Staff</Link>
              <Link to='/hr/evaluate'>Evaluation</Link>
              
              <Link to='/hr/leave'>Leave Requestes</Link>
              <Link to='/hr/request/teamleader'>Send Request</Link>
              {/* <Link to='/hr/evalute/team'>Evaluate Teamleader</Link> */}
              <Link to='/hr/attendance/view'>View Attendance</Link>
              </div>
            )}

            {role=='TeamLeader' &&(
              <div className='header_elements'>
                
              <Link to='/team/task'>Create Task</Link>
              <Link to='/teamleader/request/view'>View Request</Link>
              <Link to='/team/evaluate/staff'>Evaluate Staff</Link>
              <Link to='/hr/evaluate/team/view'>View Evaluations</Link>
              {/* <Link to='/attendance/teamlead'>Mark Attendance</Link> */}
              <Link to='/team/task/status/check'>Task Status</Link>
              </div>
            )}

            {role=='Manager' &&(
              <div className='header_elements'>
                <Link to='/main'>Home</Link>
              <Link to='/manager/request'>Make a request</Link>
              <Link to='/manager/task/view'>Task Overview</Link>
              
              </div>
            )}

        </nav>
    </div>
  )
}

export default Header