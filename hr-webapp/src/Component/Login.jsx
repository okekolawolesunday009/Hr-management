import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password:""
    })
    const{email, password} = formData

    const handleChange =(e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id] : e.target.value
        }))
    }
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault() 
        axios.post('https://hr-management-kvqb.onrender.com/login', formData)
        .then(res => {
          if(res.data.Status === 'success'){
             navigate('/home')

          }else{
            setError(res.data.Error)
          }
        })
        .catch(error => {
          console.log(error)
          toast.error('Not Succesful')
        })
    }
  return (
  <div className =' flex items-center justify-center  h-screen' >
   
      <form onSubmit={handleSubmit} className=" w-full max-w-xs mt-8 px-4 md:px-8 mx-10 lg:mx-auto bg-slate-300 rounded-lg p-4 drop-shadow-lg">
        <div className='text-center text-red-500'>
        {error && error }
       </div>
  <div className="flex flex-col mb-4">
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
    <input 
     onChange={handleChange}
       id="email" 
       type="email" 
       className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
  </div>
  <div className="flex flex-col mb-4">
    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
    <input 
    id="password"
     type="password"
     onChange={handleChange}
      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
  </div>
  <div className="flex items-center justify-between mt-4 space-x-5">
    <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md focus:outline-none focus:shadow-outline-indigo">Login</button>
    <a href="/forgot-password" className="text-xs no-wrap text-gray-700 hover:text-indigo-500">Forgot password?</a>
  </div>
  <button className='drop-shadow-2xl w-full mt-3 bg-slate-100 rounded-lg p-2'>
    Create Account
  </button>
</form>
  </div>

  
  )
}
