import { useState } from 'react'

import './App.css'
import Login from './Component/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Component/Home'
import LoginOption from './Component/LoginOption'
import DashBoard from './Component/DashBoard'
import Profile from './Component/Profile'
import AddEmployee from './Component/AddEmployee'
import Employees from './Component/Employees'
import EditEmployees from './Component/EditEmployee'

function App() {

  return (
    <div className=''>
      <BrowserRouter>
       <Routes>
         <Route path= '/' element ={<LoginOption/>}></Route>
         <Route path= '/login' element ={<Login/>}></Route>
         <Route path= '/home' element ={<Home/>}>
             <Route path= '/home' element ={<DashBoard/>}></Route>
             <Route path= '/home/create' element ={<AddEmployee/>}></Route>
             <Route path= '/home/employees' element ={<Employees/>}></Route>
             <Route path= '/home/employeeEdit/:id' element ={<EditEmployees/>}></Route>
             <Route path= '/home/profile' element ={<Profile/>}></Route>


         </Route>

         {/* <Route path= 'dashboard' element ={<DashBoard/>}></Route> */}
         {/* <Route path= '/profile' element ={<Profile/>}></Route> */}
        

       </Routes>
      
      </BrowserRouter>
       
        
      
    </div>
  )
}

export default App
