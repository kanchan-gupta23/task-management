
import React from 'react'
import { useAuth } from '../store/auth';

import { NavLink ,Link} from 'react-router-dom'
function Navbar() {
    const { authenticationToken, user,  IsLoggedIn  } = useAuth();
    
  return (
    
      <div className=' bg-slate-400 w-[20vw] text-black  fixed top-0 -mt-4 left   h-[103vh] ' >
      <div className='w-[20vw] bg-slate-400 h-[100vh] text-white relative  font-semibold text-[3.3vh]'>
      <h1 >{user ?(<h1 className="text-[2.3vh] ml-3 pt-7">{user.email}</h1>):<p></p>}</h1>
      <h1 className="text-[3.3vh] ml-3 capitalize"> {user ? (
                <h1 className="text-[3.3vh] ml-3 capitalize"> welcome, {user.username}</h1> // Safe to access user.username
            ) : (
                <p></p> // Show a loading state
            )}</h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
       
     
      <NavLink to='/'><h1>Home</h1></NavLink>
      {IsLoggedIn ? (
        <>
         <NavLink to ="/logout"><h1>Logout</h1></NavLink>
         <NavLink to='/update'><h1>UpdateTask</h1></NavLink></>
           ):(
              <>
              <NavLink to="/login"><h1>Login</h1></NavLink>
            <NavLink to="/registration"><h1>Registration</h1></NavLink>
            
            </>)}
      
      
      
      </div>
      
    </div> 
    </div>
  )
}

export default Navbar
