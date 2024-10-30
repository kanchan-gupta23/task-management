
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Update({ setUpdate }) {
  const navigate = useNavigate()
    const { authenticationToken } = useAuth();
    const { id } = useParams();
    const [task, setTask] = useState({
        title: "",
        task: "",
    });
    const [updateData,setUpdatedata]= useState(true)

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/task/getSingleTask/${id}`, {
                    headers: {
                        Authorization: authenticationToken,
                    },
                });
                console.log("Fetched task update:", response.data);
                if(updateData && response.data){
                  setTask({ 
                    title: response.data.title , // Ensure default value
                    task: response.data.task  
                });
                setUpdatedata(false)
                }
                
            } catch (error) {
                console.error("Error fetching task data:", error);
            }
        };

        fetchTask();
    }, [id, authenticationToken, updateData]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    };

    const updateTask = async (e) => {
        e.preventDefault();
        console.log("Task data being sent:", task); // Log the task data
        try {
            const response = await axios.put(`http://localhost:3000/task/update/${id}`, task, {
                headers: {
                    Authorization: authenticationToken,
                }
            });
            if (response.status === 200) {
                console.log("Updated task response:", response.data);
                navigate("/")
                setUpdate(false)
               
              } else {
                console.error("Failed to update task:", response);
            }
        } catch (error) {
            console.error("Error updating task:", error.response || error);
        }
    };

    return (
        <div className=' flex justify-center items-center bg-blue-900 w-screen h-screen'>
            <form onSubmit={updateTask} className='w-[35vw] bg-slate-500 py-4 rounded-xl p-5 text-black capitalize'>
                <h1 className='font-bold text-[3vh]'>Update Task</h1>
                <label>Title</label><br/>
                <input 
                    type='text' 
                    placeholder='title' 
                    onChange={handleInput} 
                    name='title' 
                    value={task.title} 
                    required // Make field required
                /><br/>
                <label>Description</label><br/>
                <textarea 
                    placeholder='task' 
                    onChange={handleInput} 
                    name='task' 
                    value={task.task}
                    required // Make field required
                ></textarea><br/>
                <button className='rounded-lg bg-slate-900 text-white px-4 py-2 mt-6' type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default Update;
