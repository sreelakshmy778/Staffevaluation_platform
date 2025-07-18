import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'

const Hrevaluaete_team = () => {
const token=localStorage.getItem("access_token")
const [data,setData]=useState([])  
useEffect(()=>{


axios.get(`http://127.0.0.1:8000/api/adminapi/`,{
  headers:{
    Authorization:`Bearer ${token}`
  }
  
})
.then((response)=>{
  // alert("data get")
  const filterData=response.data.filter(
    (user) => user.role==='TeamLeader'
  )
  setData(filterData)
})

.catch((err)=>{
  alert("error in viewing")
})
},[])


  const handleChange = (e) => {
    const { name, value } = e.target;
    const userId = e.target.dataset.id;

    const updatedDetails = data.map((user) => {
      if (user.id.toString() === userId) {
        return { ...user,
            evaluatee:user.id,
            [name]: value };
      }
      return user;
    });

    setData(updatedDetails);
  }


 
const saveEvaluation = () => {
    const evaluationPayload = data
      .filter(
        (d) =>
          d.communication_score ||
          d.leadership_score ||
          d.employeedevlopment_score ||
          d.comment
      )
      .map((d) => ({
        evaluatee: d.id,
        communication_score: parseInt(d.communication_score) || 0,
        leadership_score: parseInt(d.leadership_score) || 0,
        employeedevlopment_score: parseInt(d.employeedevlopment_score) || 0,
        comment: d.comment || '',
      }));

    if (evaluationPayload.length === 0) {
      alert('Please enter at least one evaluation.');
      return;
    }

    axios
      .post(`http://127.0.0.1:8000/api/hr/team/evaluate`, evaluationPayload, {
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

   <table>
    <tr>
      <th rowSpan={2}>Name</th>
      <th rowSpan={2 }>Position</th>
      <th colSpan={3} style={{textAlign:'center'}}>Score(out of 10)</th>
      <th rowSpan={2}>Comments</th>
    </tr>
    <tr>
      <th>Communication</th>
      <th>Leadership</th>
      <th>Employee Development</th>
    
    </tr>
    {
      data.map((d)=>(
        <tr>
          <td>{d.first_name}</td>
          <td>{d.position}</td>
          
          <td><input
          type='number'
          name='communication_score'
          data-id={d.id}
          value={d.communication_score ||''}
          onChange={handleChange}
          
          ></input></td>

          <td><input
          type='number'
          name='leadership_score'
          data-id={d.id}
          value={d.leadership_score ||''}
          onChange={handleChange}
          
          ></input></td>

          <td><input
          type='number'
          name='employeedevlopment_score'
          data-id={d.id}
          value={d.employeedevlopment_score || ''}
          onChange={handleChange}
          
          ></input></td>

          <td><input
          type='text'
          name='comment'
          data-id={d.id}
          value={d.comment || ''}
          onChange={handleChange}
          
          ></input></td>
        </tr>
      ))
    }
    <button onClick={saveEvaluation}>Submit</button>
   </table>





    </div>
  )
}

export default Hrevaluaete_team