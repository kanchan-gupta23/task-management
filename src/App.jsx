import {useState} from 'react'
import {Route,Routes,BrowserRouter} from 'react-router-dom' 
import Registration from './components/Registration'
import Login from './components/Login'
import Home from './components/Home'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import SingleTask from './components/SingleTask'
import Update from './components/Update'
import CreateTask from './components/CreateTask'
function App() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  return (
    <div className='bg-zinc-800 h-screen text-white flex'>
      <BrowserRouter>
      <Navbar setTasks={setTasks} setStatusFilter={setStatusFilter} />
      <Routes>
        <Route path='/' element={<Home tasks={tasks} />}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/singleTask/:id' element={<SingleTask/>}/>
        <Route path='/update/:id' element={<Update/>}/>
        <Route path='/create' element={<CreateTask/>}/>


      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
