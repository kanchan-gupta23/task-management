import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../store/auth'
import axios from 'axios';

function Navbar() {
  const [tasks,setTask] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const {user,authenticationToken} = useAuth()
  
  const getFilteredTask = async ()=>{
    const userId = "671b68253ef34bad4da010ce"; // example userId
const status = "pending";
    try {
      const response = await axios.get(`http://localhost:3000/task/getFilteredTask`,{
        headers: {
          Authorization: authenticationToken,
        },
        params:{
         userId :user._id,
          status: statusFilter,
        }
      })
      

      setTask(response.data)
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    getFilteredTask()
  },[statusFilter])
  return (
    <div className=' w-[20vw] bg-slate-400 h-[100vh] '>
        <button onClick={() => setStatusFilter('')}>All</button>
       <button onClick={() => setStatusFilter('completed')}>Completed</button>
       <button onClick={() => setStatusFilter('incomplete')}>Pending</button>
      <NavLink  to='/'><h1>Home</h1></NavLink> 
     <NavLink to='/registration '> <h1>Registration</h1></NavLink>
    
      <NavLink  to='/login'><h1>Login</h1></NavLink>
    <NavLink  to='/conatct'>  <h1>Contact</h1></NavLink> 
    <div>
        <h2>Filtered Tasks:</h2>
        <ul>
          {tasks.map(task => (
            <li key={task._id}>
              <h3>{task.title}</h3>
              <p>Status: {task.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
