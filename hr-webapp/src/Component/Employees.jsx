import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Employees() {
  function handleDelete(id){
    console.log('del')
    axios.delete('https://hr-management-kvqb.onrender.com/home/delete/' + id)
    .then(res => {
        // window.prompt()
        if(res.data.Status === 'success'){
            window.location.reload(true)
        }else{
            alert('Error')
        }

        
    })
    .catch((err => console.log(err)))

}
  const [data, setData] = useState([])
  useEffect(()=>{
    axios.get('https://hr-management-kvqb.onrender.com/home/employees')
    .then(res =>{
      if(res.data.Status === 'success'){
        // console.log(res.data.Result,'ggg')
        setData(res.data.Result)

      }
  })
    .catch((err => console.log(err)))


  },[])
  return (
    <div className='px-5 py-3'>
        <div className='flex justify-center'>
            <h3>Update Employee</h3>

        </div>
        <Link to='/home/create' className=' rounded p-3 text-white bg-green-400'>Add Employees</Link>
        <table>
          <tr>
            <th>Name</th>
            <th>email</th>
            <th>password</th>
            <th>address</th>
            <th>image</th>
            <th>Action</th>
          </tr>
          <tbody>
            {data.map((employee, index) =>{
              return  <tr key={index} className=''>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{}</td>
                        <td>{employee.address}</td>
                        <td>{
                          <img 
                          src ={`https://hr-management-kvqb.onrender.com/images/` + employee.image}
                          className='w-20  h-20 rounded-2xl'
                         alt=""/>  }</td>
                        <td>
                        <Link to={`/home/employeeEdit/` + employee.id}>
                          <button className='bg-blue-600 p-2 rounded-lg text-white font-semibold'>update</button>
                        </Link>
                          </td>
                        <td><button onClick={e => handleDelete(employee.id)} className='bg-red-600 p-2 rounded-lg text-white font-semibold'>delete</button></td>
                    </tr>
             
              
            })}
          </tbody>
        </table>

      
    </div>
  )
}
