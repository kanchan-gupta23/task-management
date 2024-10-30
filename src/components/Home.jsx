
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../store/auth';
import { MdOutlineDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io";

import { NavLink } from 'react-router-dom';
import CreateTask from './CreateTask';
import Navbar from './Navbar';
import Update from './Update';
function Home() {
  const [create, setCreate] = useState(false)
  const { authenticationToken, user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState(''); // New filter state
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false)
  const [updateTaskId, setUpdateTaskId] = useState(null);
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
        setTasks(tasks.filter(task => task._id !== taskId));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleStatus = async (taskId)=>{
    try {
      const response = await axios.put(`http://localhost:3000/task/toggelStatus/${taskId}`,{},{
        headers:{
          Authorization: authenticationToken,
        }
      })
    if (response.status===200){
      setTasks(tasks.map((task)=>
        task._id===taskId ?{...task, status:response.data.status}:task
      ))
    }
      
    } catch (error) {
      console.log(error);
      
      
    }
  }


  // Function to fetch filtered tasks
  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/task/getFilteredTask`, {
        headers: {
          Authorization: authenticationToken,
        },
        params: {
          userId: user._id,
          status: statusFilter, // Apply filter to fetch
        },
      });
      if (response.status === 200) {
        setTasks(response.data);
        console.log("Filtered tasks fetched:", response.data);
      }
    } catch (error) {
      console.error("Error fetching filtered tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks(); // Fetch tasks when statusFilter changes
  }, [user?._id, authenticationToken, statusFilter]);

  const openCreateTask = async ()=>{
   setCreate(true)
  }
useEffect(()=>{
  console.log("Create state updated:", create);
},[create])
const handleUpdate = async (task)=>{
  setUpdateTaskId(task._id);
  setUpdate(true);
}


  return (
  <div className={`bg-zinc-200 min-h-screen w-screen text-black ${create || update ? 'fixed'  : ''} ${create ? 'backdrop-blur-lg bg-white/30 '  : ''} ml-[20vw]`}>
    

  

      <div className=' w-[80vw] text-black  '>
        <div className='flex w-[80vw] justify-around h-[19vh] items-center'>
        <h1 className='text-[5.5vh] font-extrabold '>Project Management Tool</h1>
        
        
    
        <div>
       
        </div>
        </div>
        <div className='flex justify-between  ml-5'>
          <div className='flex gap-4' >
        <button className='border-black border-2 rounded-lg px-2 ' onClick={() => setStatusFilter('')}>All Tasks</button>
      <button  className='border-black border-2 rounded-lg px-2 ' onClick={() => setStatusFilter('completed')}>Completed Tasks</button>
      <button  className='border-black border-2 rounded-lg px-2 ' onClick={() => setStatusFilter('incomplete')}>Incomplete Tasks</button>
      </div>
      <div className='mr-9'>
      <div onClick={openCreateTask } className=''>
       
          <div className='w-[10vw] h-[10vh] mt-4  border-black border-2 rounded-lg flex justify-center items-center'>
            <div>
              <IoIosAddCircle className='text-[5vh] ml-3  ' />
              <h1 className='font-bold text-[3vh] text-center'>Add Task</h1>
            </div>
          </div>
        </div>
        {create && <CreateTask setCreate={setCreate}  />}
        </div>
      </div>
       
        <div className='grid grid-cols-3 gap-5 mx-6'>
       
          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length > 0 ? (
           
            tasks.map((task) => (
            
            
              <div className='border-black border-2 rounded-lg my-4  w-[22vw] h-[30vh] pl-2'key={task._id} >
        
                <Link to={`/singleTask/${task._id}`}>
                  <h1 className='font-bold capitalize text-[4vh]'>{task.title}</h1>
                  <h1 className='text-[3vh]'>{task.task}</h1>
                  <p className='mt-5'>{new Date(task.createdAt).toLocaleDateString()}</p>
                </Link>
                <div className='flex justify-between mt-2 '>
                  <button className='px-2 py-1 rounded-lg' onClick={() => toggleStatus(task._id)} style={{background: task.status === "completed"? 'green':` #991b1b`}}>
                    {task.status === "completed" ? "Completed" : "Incomplete"} 
                    
                  </button>
                  <div className='flex gap-3'>
                    <Link to={`/update/${task._id}`} >
                   
                      <button  ><FaPen className='text-[3.3vh]' />
                    
                      </button>
                     
                    </Link>
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
       
      </div>
    </div>
   
  );
}

export default Home;
