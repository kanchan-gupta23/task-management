import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../store/auth';
import { MdOutlineDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';

import { IoIosAddCircle } from "react-icons/io";


function Home() {
  const { authenticationToken, user } = useAuth();
  
  const [tasks, setTask] = useState([]);
  const {id} = useParams()

  const deleteTask = async (taskId) => {
    if (!taskId) {
      console.error("No task ID provided for deletion");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3000/task/delete/${taskId}`, {
        headers: {
          Authorization: authenticationToken,
        },
      });
      if (response.status === 200) {
        console.log("Task deleted:", response);
        setTask(tasks.filter(task => task._id !== taskId));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const toggelStatus = async (taskId)=>{
    try {
      const response = await axios.put(`http://localhost:3000/task/toggelStatus/${taskId}`,{},{
        headers:{
          Authorization: authenticationToken,
        }
      })
    if (response.status===200){
      setTask(tasks.map((task)=>
        task._id===taskId ?{...task, status:response.data.status}:task
      ))
    }
      
    } catch (error) {
      console.log(error);
      
      
    }
  }

  

  const getTask = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/task/getTask/${user._id}`, {
        headers: {
          Authorization: authenticationToken,
        },
      });
      if (response.status === 200) {
        setTask(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  
  useEffect(() => {
    getTask();
   
  }, [user?._id, authenticationToken]);
  
  return (
    <div className='bg-zinc-200 w-[80vw] text-black p-4'>
       <h1 className='font-bold capitalize text-[4vh] mt-5 mb-3 mx-5' > All Tasks</h1>
    <div className='bg-zinc-200 w-[80vw] text-black flex justify-evenly  '>
     
      <div className='grid grid-cols-2 gap-5'>
        {tasks.length > 0 ? (
          tasks.map((task) => (

           <div className='border-black border-2  rounded-lg my-4   w-[25vw] h-[30vh]' key={task._id}>
               <Link to={`/singleTask/${task._id}`}> 
              
              <h1 className='font-bold capitalize text-[4vh] '>{task.title}</h1>
              <h1 className='text-[3vh]'>{task.task}</h1>
              <p className='mt-5'>{new Date(task.createdAt).toLocaleDateString()}</p>
              
              </Link>
              <div className='flex justify-between mt-2'>
                <button onClick={()=>toggelStatus(task._id)}>{task.status === "completed" ? "Completed" : "Incomplete"}</button>
                <div className='flex gap-3'>
                <Link to={`/update/${task._id}`}  ><button > <FaPen className='text-[3.3vh]'  /></button></Link>
                  <button onClick={() => deleteTask(task._id)}>
                    <MdOutlineDelete className='text-[4.3vh]' />
                  </button>
                
                 
                </div>
              </div>
           
             
             
              
            </div>
            
           
            
          ))
          
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    <Link to="/create">  <div  className=' w-[25vw] h-[30vh] mt-4   p-2 border-black border-2 rounded-lg flex justify-center items-center '>
        <div>
        <IoIosAddCircle className='text-[10vh] ' />
        <h1 className='font-bold text-[3vh]'>Add Task</h1>
        </div>
     
      </div>

      </Link>
    </div>
    
    </div>
    
  );
}

export default Home;
