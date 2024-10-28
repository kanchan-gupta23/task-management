
import {useState }from 'react'
import axios from 'axios'
import { useAuth } from '../store/auth'
import { useNavigate } from 'react-router-dom'
function Registration() {
  const navigate = useNavigate()
  const {storeInLS} = useAuth()
  const [user,setUser] = useState({
    username:"",
    email:"",
    phone:"",
    password:""    
  })
  const handleInput = async (e)=>{
    try {
      let name = e.target.name
      let value = e.target.value
      setUser({
        ...user,
        [name]:value

      })
      
      
    } catch (error) {
      console.log(error)      
    }
  }
  const handleSubmit = async (e)=>{
   e.preventDefault()
   try {
    const fetchData = await axios.post(`http://localhost:3000/auth/registration`,user,{
      headers:{
        "Content-Type":"application/json" }
     })
     console.log(fetchData.data)
     storeInLS(fetchData.data.token)
     setUser({ username:"",
      email:"",
      phone:"",
      password:"" } )
      navigate("/login")
      } catch (error) {
    console.log(error)
   }
  }
  return (
    <div className='bg-blue-950 w-screen flex justify-center items-center '>

      <form onSubmit={handleSubmit} className='w-[35vw] bg-slate-500 py-4 rounded-xl p-5 text-black capitalize'>
        <h1 className='text-center font-bold text-[3.5vh]'>Welcome to our project-management tool</h1>
        <label className='font-semi-bold m-1'>username</label><br/>
        <input className='rounded-lg p-0.5 mb-2' type='text' placeholder='username' name='username' value={user.username} onChange={handleInput} /><br/>
        
        <label className='font-semi-bold m-1 '>email</label><br/>
        <input className='rounded-lg p-0.5 mb-2' type='email' placeholder='email' name='email' value={user.email} onChange={handleInput}/><br/>
        <label className='font-semi-bold m-1'>phone</label><br/>
        <input className='rounded-lg p-0.5 mb-2' type='text' placeholder='phone' name='phone' value={user.phone} onChange={handleInput}/><br/>
        <label className='font-semi-bold m-1 mb-2'>password</label><br/>
        <input className='rounded-lg p-0.5 mb-2' type='password' placeholder='password' name='password' value={user.password} onChange={handleInput}/><br/>
        <button type='submit' className='rounded-lg bg-slate-900 text-white px-4 py-2 mt-6'>Submit</button>

      </form>
      
    </div>
  )
}

export default Registration
