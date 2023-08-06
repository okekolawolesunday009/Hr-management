import React from 'react'
import Sidebar from './SideBar'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <div className='flex '>
        <Sidebar/>
       <div className='flex flex-col w-full '>
       <div className='w-full text-2xl font-bold bg-white text-center h-11 drop-shadow-lg'>
          Employee Management System
        </div>
        <Outlet/>
       </div>

      
    </div>
  )
}
