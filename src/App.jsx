
import {Route,Routes,BrowserRouter} from 'react-router-dom' 
import Registration from './components/Registration'
import Login from './components/Login'
import Home from './components/Home'
import Contact from './components/Contact'
import SingleTask from './components/SingleTask'
import Update from './components/Update'
import CreateTask from './components/CreateTask'
import Navbar from './components/Navbar'
import Logout from './components/Logout'
function App() {


  return (
    <div className='bg-zinc-800 h-screen text-white flex'>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home  />}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/singleTask/:id' element={<SingleTask/>}/>
        <Route path='/update/:id' element={<Update/>}/>
        <Route path='/create' element={<CreateTask/>}/>
        <Route path='/logout' element={<Logout/>}/>



      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
