import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import axios from 'axios';


function Update() {

    const { authenticationToken}= useAuth()
    const {id}= useParams()
    const [task,setTask] = useState({
        title:"",
        task:"", 

    })
    useEffect(() => {
        const fetchTask = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/task/${id}`, {
              headers: {
                Authorization: authenticationToken,
              },
            });
            setTask({
              title: response.data.title,
              task: response.data.task,
            });
          } catch (error) {
            console.error("Error fetching task data:", error);
          }
        };
    
        fetchTask();
      }, [id, authenticationToken]);

     const handleInput = async (e)=>{
        let name = e.target.name        
        let value = e.target.value
        setTask({
            ...task,
            [name]:value
        })
     }
 
        const updateTask = async (e)=>{
            e.preventDefault()
            const response = await axios.put(`http://localhost:3000/task/update/${id}`,task,{
              headers:{
                Authorization: authenticationToken,
              }
            } )
           
            
            console.log(response);
            
          }

   

    
  return (
    <div>
     <form onSubmit={updateTask}>
        <label>Title</label>
        <input type='text' placeholder='title' onChange={handleInput} name='title' value={task.title} />
        <label>Description</label>
        <textarea placeholder='task' onChange={handleInput} name='task' value={task.task}></textarea> 
        <button type='submit'>Submit</button>
       </form>

    
    </div>
  )
}

export default Update
