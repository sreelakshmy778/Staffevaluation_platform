import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import './Hrevaluate.css'


const Hrevaluate = () => {
const token=localStorage.getItem('access_token')
 const evaluator = localStorage.getItem('username') || 'HR';
const [data,setData]=useState([])   
const [value,setValue]=useState({})
useEffect (()=>{
axios.get(`http://127.0.0.1:8000/api/adminapi/`,{
    headers:{
        Authorization: `Bearer ${token}`
    }
})
.then((response)=>{
    const filteredData = response.data.filter(
        (user) => user.role === "Staff" 
    );
    setData(filteredData)
    // alert("data get")
})
.catch((err)=>{
    console.log("error",err?.response.data)
    alert("error in data get")
})    
},[])






const saveEvaluate = (e, id) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [name]: value,
      },
    }));
  };

const handleEvaluate = (e) => {
  e.preventDefault();

  const evaluations = Object.entries(value).map(([userId, values]) => {
    const user = data.find((u) => u.id === parseInt(userId));
    if (!user) return null;

    return {
      evaluatee: user.id,
      career_score: parseInt(values.career_score),
      attendance_score: parseInt(values.attendance_score),
      comment: values.comment,
    };
  }).filter(Boolean); // Removes any null values

  evaluations.forEach((evaluation) => {
    axios.post(`http://127.0.0.1:8000/api/evaluate/`, evaluation, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Saved:", response.data);
    })
    .catch((err) => {
      console.error("Error saving evaluation:", err?.response?.data || err.message);
    });
  });

  alert("Evaluations submitted.");
};



//  hr evaluate teammmm............................................................

const [datas,setDatas]=useState([])  
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
  setDatas(filterData)
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

    setDatas(updatedDetails);
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


    <h1>Evalute Teamleader</h1>
    <table className='evaluationtable_hr'>

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
      datas.map((d)=>(
        <tr>
          <td>{d.first_name}</td>
          <td>{d.position}</td>
          
          <td><input
          type='number'
          name='communication_score'
          className='number-box'
          data-id={d.id}
          value={d.communication_score ||''}
          onChange={handleChange}
          
          ></input></td>

          <td><input
          type='number'
          name='leadership_score'
          className='number-box'
          data-id={d.id}
          value={d.leadership_score ||''}
          onChange={handleChange}
          
          ></input></td>

          <td><input
          type='number'
          className='number-box'
          name='employeedevlopment_score'
          data-id={d.id}
          value={d.employeedevlopment_score || ''}
          onChange={handleChange}
          
          ></input></td>

          <td><input
          type='text'
          name='comment'
          className='number-box'
          data-id={d.id}
          value={d.comment || ''}
          onChange={handleChange}
          
          ></input></td>
        </tr>
      ))
    }
    <button onClick={saveEvaluation} id='btn_hrevaluate'>Submit</button>
   </table>







        <h1>Evaluate Staff</h1>
        <table border={1} className='evaluationtable_hr'>
          <tr>
            <th rowSpan={2} style={{ verticalAlign: 'middle' }}>Name</th>
            <th  rowSpan={2}  style={{textAlign:'center'}}>Role</th>
            <th colSpan={2} style={{textAlign:'center'}}>Score (out of 10)</th>
            <th  rowSpan={2}  style={{textAlign:'center'}}>Comment</th>
            {/* <th>Evaluator</th> */}
          </tr> 

          <tr>
      {/* <th></th>
      <th></th> */}
      <th>Leadership</th>
      <th>Communication</th>
      {/* <th>Reliability</th> */}
      {/* <th></th> */}
      {/* <th></th> */}
    </tr>


           {data.map((d) => (
  <tr key={d.id}>
        <td>{d.username}</td>
        <td>{d.position}</td>

        <td>
          <input
            name="career_score"
            type="number"
            className='number-box'
            max={10}
            onChange={(e) => saveEvaluate(e, d.id)}
            value={value[d.id]?.career_score || ""}
          />
        </td>
        <td>
          <input
            name="attendance_score"
            type="number"
            className='number-box'
            max={10}
            onChange={(e) => saveEvaluate(e, d.id)}
            value={value[d.id]?.attendance_score || ""}
          />
        </td>
       
        <td>
          <input
            name="comment"
            className='number-box'
            onChange={(e) => saveEvaluate(e, d.id)}
            value={value[d.id]?.comment || ""}
          />
        </td>
        {/* <td>Optional: evaluator name or dropdown</td> */}
      </tr>
))}
            <button onClick={handleEvaluate} id='btn_hrevaluate'>Submit</button>
        </table>
     

    </div>
  )
}

export default Hrevaluate