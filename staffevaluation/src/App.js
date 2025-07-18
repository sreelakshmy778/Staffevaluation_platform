import logo from './logo.svg';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import Header from './components/Header';
import Staffdash from './components/Staffdash';
import Admin from './components/Admin';
import Adminadd from './components/Adminadd';
import Adminupdate from './components/Adminupdate';
import Staffleave from './components/Staffleave';
import Hrdash from './components/Hrdash';
import Hrleave from './components/Hrleave';
import Hrstaffregister from './components/Hrstaffregister';
import Staffstatus from './components/Staffstatus';
import Hrevaluate from './components/Hrevaluate';
import Staffevaluate from './components/Staffevaluate';
import Teamdash from './components/Teamdash';
import Teamtask from './components/Teamtask';
import Adminstaff from './components/Adminstaff';
import Adminteam from './components/Adminteam';
import Adminhr from './components/Adminhr';
import Adminmanager from './components/Adminmanager';
import Managerrequest from './components/Managerrequest';
import Hrrequestview from './components/Hrrequestview';
import Hrrequest from './components/Hrrequest';
import Teamrequestview from './components/Teamrequestview';
import Teamevaluatestaff from './components/Teamevaluatestaff';
import Hrevaluaete_team from './components/Hrevaluaete_team';
import HrEvaluateTeamView from './components/HrEvaluateTeamView';
import Staffattendance from './components/Staffattendance';
import HrAttendanceView from './components/HrAttendanceView';
import TeamleaderAttendance from './components/TeamleaderAttendance';
import TeamtTaskStatus from './components/TeamtTaskStatus';
import Stafftask from './components/Stafftask';
import ManagerTaskView from './components/ManagerTaskView';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path="/main" element={<Main/>}></Route>
        <Route path='/staff/dashboard' element={<Staffdash/>}></Route>
        <Route path='/admin/dashboard' element={<Admin/>}></Route>
        <Route path='/admin/add' element={<Adminadd/>}></Route>
        <Route path='/admin/update/:id' element={<Adminupdate/>}></Route>
        <Route path='/staff/leave' element={<Staffleave/>}></Route>
        <Route path='/hr/dashboard' element={<Hrdash/>}></Route>
        <Route path='/hr/leave' element={<Hrleave/>}></Route>
        <Route path='/hr/staffregister' element={<Hrstaffregister/>}></Route>
        <Route path='/staff/leave_status' element={<Staffstatus/>}></Route>
        <Route path='/hr/evaluate' element={<Hrevaluate/>}></Route>
        <Route path='/staff/evaluate' element={<Staffevaluate/>}></Route>
        <Route path='/team/dashboard' element={<Teamdash/>}></Route>
        <Route path='/team/task' element={<Teamtask/>}></Route>
        <Route path='/admin/staff' element={<Adminstaff/>}></Route>
        <Route path='/admin/team' element={<Adminteam/>}></Route>
        <Route path='/admin/hr' element={<Adminhr/>}></Route>
        <Route path='/admin/manager' element={<Adminmanager/>}></Route>
        <Route path='/manager/request' element={<Managerrequest/>}></Route>
        <Route path='/hr/request/view' element={<Hrrequestview/>}></Route>
        <Route path='/hr/request/teamleader' element={<Hrrequest/>}></Route>
        <Route path='/teamleader/request/view' element={<Teamrequestview/>}></Route>
        <Route path='/team/evaluate/staff' element={<Teamevaluatestaff/>}></Route>
        <Route path='/hr/evalute/team' element={<Hrevaluaete_team/>}></Route>
        <Route path='/hr/evaluate/team/view' element={<HrEvaluateTeamView/>}></Route>
        <Route path='/attendance/staff' element={<Staffattendance/>}></Route>
        <Route path='hr/attendance/view' element={<HrAttendanceView/>}></Route>
        <Route path='/attendance/teamlead' element={<TeamleaderAttendance/>}></Route>
        <Route path='/team/task/status/check' element={<TeamtTaskStatus/>}></Route>
        <Route path='/staff/tasks' element={<Stafftask/>}></Route>
        <Route path='/manager/task/view' element={<ManagerTaskView/>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
