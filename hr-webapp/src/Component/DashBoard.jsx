import React from 'react'

export default function DashBoard() {
  return (
    <div >
     <div className=' p-3 flex justify-around font-bold'>
     <div className='p-3 border  drop-shadow-lg w-[20%]'> 
      <p className='text-center text-sm'>Admin</p>
      <hr/>
      <p   className='text-center text-xs'>Total: {}</p>
      </div>
      <div className='px-3 pt-2 border drop-shadow-lg w-[20%]'> 
      <p className='text-center text-xs'>Employee</p>
      <hr/>
      <p  className='text-center text-xs'>Total: {}</p>
      </div>
      <div className='px-3 pt-2 border drop-shadow-lg w-[20%]'> 
      <p  className='text-center text-xs'>Salary</p>
      <hr/>
      <p className='text-center text-xs'>Total: {}</p>
      </div>

     </div>
      {/* {list of admin} */}
      <div className='text-center mt-4 p-3'>
        <h3 className='font-bold text-xl lg:text-2xl'>List of admin</h3>
        <table>
         <thead>
         <th>
            <th> Email</th>
            <th> Action</th>
          </th>
         </thead>
         <tbody>
          
         </tbody>
        </table>
      </div>
      
    </div>
  )
}
