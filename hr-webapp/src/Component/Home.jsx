import React, { useState } from 'react'
import Sidebar from './SideBar'
import { Outlet } from 'react-router-dom'
import { BsThreeDotsVertical } from 'react-icons/bs'

export default function Home() {
  const [nav, setNav] = useState(false)

  function handleClick(){
    setNav((p) => !p)
  }

  return (
    <div className='flex relative '>
    <div className= {nav ? 'w-[150%] block absolute' : 'hidden' }><Sidebar/></div>
      
       <div className='flex flex-col w-full '>
       <div className=' relative  w-full text-2xl font-bold bg-white text-center h-11 drop-shadow-lg'>
        <div className='flex  items-center justify-center'>
        <h1 className='text-lg'>
         Employee Management System
         </h1>
         <div className=' absolute right-0'>
         <BsThreeDotsVertical onClick={handleClick}/>
         </div>
        </div>
        </div>
        <Outlet/>
       </div>

      
    </div>
  )
}
