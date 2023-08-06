import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginOption() {
  return (
  <div className =' flex flex-col items-center justify-center  h-screen' >
   <div className='bg-white drop-shadow-lg p-9 space-y-4 rounded-lg'>
   <h2 className='text-center'>Login</h2>
    <div className='flex space-x-3'>
    <Link to='/login'>
    <button type="submit" class="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md focus:outline-none focus:shadow-outline-indigo">Admin</button>

    </Link> 
    <Link to='/login'>
    <button type="submit" class="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md focus:outline-none focus:shadow-outline-indigo">User</button>

    </Link> 

    </div>
   </div>
   
  </div>

  
  )
}
