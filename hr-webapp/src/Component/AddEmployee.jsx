import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function AddEmployee() {
  const [error, setError] = useState('')
    const [data, setData]= useState({
        name:'',
        email: '',
        password: '',
        address: '',
        image: ''
    })
    // const {name,email, password, address, image } = data

    function handleChange(e){
      // console.log(e.target.files)

        if(e.target.files){
            setData((p) =>({
              ...p,
              image: e.target.files[0]
            }))
          }
          //text/boolean/number (files- if it has files inside it)
          if(!e.target.files){
            setData((p) =>({
              ...p,
              [e.target.id]: e.target.value
              //we want the true and false to be considered so boolean state can be either if not set it to value (??) using this
            }))
         }
    }
    function handleSubmit(e){
        e.preventDefault()
        console.log(data)
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('address', data.address)
        if (data.image) {
          formData.append('image', data.image);
        }
        axios.post('https://hr-management-kvqb.onrender.com/home/create', formData)
        .then(res => {
          if(res.data.Status === 'Success'){
             navigate('/home/employees')

          }else{
            setError(res.data.Error)
          }
        })
        .catch((error => {
          console.log(error)
        
        }))

    }
  return (
    <div>
     <div className =' flex items-center justify-center ' >
    
   <form onSubmit={handleSubmit} className="mt-8 w-full p-4 max-w-lg ">
    <h1 className='text-center font-bold text-2xl mb-4'> Add Employee</h1>
     <div className='text-center text-red-500'>
    </div>
    <div className="flex flex-col mb-4">
    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
    <input required
    onChange={handleChange}
        id="name" 
        name ='name'
        type="text" 
        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
    </div>
    <div className="flex flex-col mb-4">
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
    <input 
    onChange={handleChange}
        id="email" 
        name ='email'
        type="email" 
        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
    </div>
    <div className="flex flex-col mb-4">
    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
    <input 
    id="password"
    type="password"
    name ='password'
    onChange={handleChange}
    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
    </div>
    <div className="flex flex-col mb-4">
    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
    <input 
    id="address"
    name ='address'
    type="address"
    onChange={handleChange}
    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
    </div>
    <div className="flex flex-col mb-4">
    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Select Image</label>
    <input disabled
    id="image"
    name ='image'
    type="file"
    onChange={handleChange}
    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
    </div>
    <div className="flex items-center justify-between mt-4 space-x-5">
    <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md focus:outline-none focus:shadow-outline-indigo">Create</button>
    </div>

</form>
</div>
      
    </div>
  )
}
