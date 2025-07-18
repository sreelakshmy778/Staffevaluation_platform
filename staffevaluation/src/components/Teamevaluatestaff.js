import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import './Teamevaluatestaff.css'
const Teamevaluatestaff = () => {
const token=localStorage.getItem('access_token')
const [details,setDetails]=useState([])
useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/adminapi/`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response)=>{
         const filteredData = response.data.filter(
        (user) => user.role === "Staff" 
       
    );
     setDetails(filteredData)
        // alert("data get")
    })
    .catch((err)=>{
        alert("error in data get")
        console.log("error",err?.response.data)
    })
},[])    

 // ✅ Handle input changes (score/comment)
  const handleChange = (e) => {
    const { name, value } = e.target;
    const userId = e.target.dataset.id;

    const updatedDetails = details.map((user) => {
      if (user.id.toString() === userId) {
        return { ...user,
            evaluatee:user.id,
            [name]: value };
      }
      return user;
    });

    setDetails(updatedDetails);
  }

  
const saveEvaluation = () => {
    const evaluationPayload = details
      .filter(
        (d) =>
          d.taskperform_score ||
          d.teamwork_score ||
          d.communication_score ||
          d.comment
      )
      .map((d) => ({
        evaluatee: d.id,
        taskperform_score: parseInt(d.taskperform_score) || 0,
        teamwork_score: parseInt(d.teamwork_score) || 0,
        communication_score: parseInt(d.communication_score) || 0,
        comment: d.comment || '',
      }));

    if (evaluationPayload.length === 0) {
      alert('Please enter at least one evaluation.');
      return;
    }

    axios
      .post(`http://127.0.0.1:8000/api/team/evaluate/staff`, evaluationPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert('Evaluations submitted successfully');
    //     setDetails((prevDetails) =>
    //     prevDetails.map((d) => ({
    //       ...d,
    //       taskperform_score: '',
    //       teamwork_score: '',
    //       communication_score: '',
    //       comment: '',
    //     }))
    //   );
      })
      .catch((err) => {
        alert('Error submitting evaluation');
        console.log('Submission error:', err?.response?.data);
      });
  };

  return (
    <div>
     
     <table className='table_teamevaluate'>
        <tr>
            <th rowSpan={2}>Name</th>
            <th rowSpan={2}>Position</th>
            <th colSpan={3} style={{textAlign:'center'}}>Score(out of 10)</th>
            <th rowSpan={2}>Comment</th>
        </tr>
        <tr>
            <th>Task Perfomance</th>
            <th>Teamwork</th>
            <th>Communication</th>
        </tr>

    {
        details.map((d)=>(
            <tr key={d.id}>
                <td>{d.first_name}</td>
                <td>{d.position}</td>
                <td><input name='taskperform_score'
                     type='number'
                     data-id={d.id}
                     value={d.taskperform_score || ''}
                     onChange={handleChange}
                     className='score_input_team'
                    ></input></td>

                    <td><input name='teamwork_score'
                     type='number'
                     data-id={d.id}
                     value={d.teamwork_score || ''}
                     onChange={handleChange}
                     className='score_input_team'
                    ></input></td>

                    <td><input name='communication_score'
                     type='number'
                     data-id={d.id}
                     value={d.communication_score || ''}
                     onChange={handleChange}
                     className='score_input_team'
                    ></input></td>

                    <td><input
                        name='comment'
                        type='text'
                        data-id={d.id}
                        value={d.comment || ''}
                        onChange={handleChange}
                        className='score_input_team'
                    /></td>
            </tr>
        ))
    }
    <button onClick={saveEvaluation} id='teamevaluate_btn'>Submit</button>


     </table>


    </div>
  )
}

export default Teamevaluatestaff