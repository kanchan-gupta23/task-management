import axios from 'axios'
import React, { useState } from 'react'
import { useAuth } from '../store/auth'
function CreateTask() {
    const {authenticationToken, user} = useAuth()
    const[task,setTask] =  useState({
        title :"",
        task:""
    })
    
    const handleInput=(e)=>{
        let name= e.target.name
        let value = e.target.value
        setTask({
            ...task,
            [name]:value
        })

    }
   const handleSubmit =  async (e) => {
      e.preventDefault()
    const response = await axios.post(`http://localhost:3000/task/createTask`,task,{
        headers:{
            "Content-Type":"application/json",
            Authorization: authenticationToken 
        }

    })
    console.log(response.data)
    
   }
    
       


  return (
    <div>
       <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type='text' placeholder='title' onChange={handleInput} name='title' value={task.title} />
        <label>Description</label>
        <textarea placeholder='task' onChange={handleInput} name='task' value={task.task}></textarea> 
        <button type='submit'>Submit</button>
       </form>
    </div>
  )
}

export default CreateTask
