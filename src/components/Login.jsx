import { useState } from 'react';
import { useAuth } from '../store/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate()
  const { authenticationToken } = useAuth();
  const [user, setUser] = useState({
   
    email: "",
    phone: "",
    
  });

  const handleInput=(e)=>{
   const name = e.target.name
   const value = e.target.value
   setUser({
    ...user,
    [name]:value
   })
  }
  const handleSubmit= async (e) => {
   e.preventDefault()
    try {
      const response = await axios.post(`http://localhost:3000/auth/login`, user,{
        headers: {
          "Content-Type":"application/json",
          Authorization: authenticationToken,
        },
      });
      if(response.status===200){
      navigate("/")    
     }
      
    } catch (err) {
      console.error("Error fetching single task:", err);
      
    } 
  };

 

  return (
    <div className='bg-blue-950 w-screen flex justify-center items-center '>
      <form onSubmit={handleSubmit} className='w-[35vw] bg-slate-500 py-6 rounded-xl p-5 text-black capitalize'>
      <h1 className='text-center font-bold text-[3.5vh]'>Welcome to our project-management tool</h1>
        
        <label className='font-semi-bold m-1 '>email</label><br/>
        <input className='rounded-lg p-0.5 mb-2 ' type='email' placeholder='email' name='email' value={user.email} onChange={handleInput}/><br/>
       
        <label className='font-semi-bold m-1 ' >password</label><br/>
        <input className='rounded-lg p-0.5' type='password' placeholder='password' name='password' value={user.password} onChange={handleInput}/><br/>
        <button type='submit' className='rounded-lg bg-slate-900 text-white px-4 py-2 mt-6'>Submit</button>

      </form>
      
    </div>
  );
}

export default Login;
