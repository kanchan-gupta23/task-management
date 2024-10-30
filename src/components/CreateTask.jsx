import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
// import { useNavigate } from 'react-router-dom'
import Home  from './Home'
function CreateTask({setCreate}) {
    // const navigate = useNavigate()
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
    setTask({ title: "", task: "" });
    setCreate(false)
   
    
   }
    
       


  return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
       <form onSubmit={handleSubmit}  className='w-[35vw] bg-slate-500 py-4 rounded-xl p-5 text-black capitalize'>
       <h1 className=' font-bold text-[3vh]'>New task</h1>
        <label className='font-semi-bold m-1'>Title</label><br/>
        <input  className='rounded-lg p-0.5 mb-2' type='text' placeholder='title' onChange={handleInput} name='title' value={task.title} /><br/>
        <label className='font-semi-bold m-1'>Description</label><br/>
        <textarea   className='rounded-lg p-0.5 mb-2' placeholder='task' onChange={handleInput} name='task' value={task.task}></textarea> <br/>
        <button  className='rounded-lg bg-slate-900 text-white px-4 py-2 mt-6' type='submit'>Submit</button>
       </form>
    </div>
  )
}

export default CreateTask
