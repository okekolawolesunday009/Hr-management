import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="p-2 w-[20%] text-white bg-gray-800 h-screen flex flex-col  ">
      <br></br>
      <br></br>
      <h1 className="text-xm lg:text-2xl font-bold text-center ">Admin Dashboard</h1>
      <ul className=" mt-6 flex flex-col space-y-4 text-center">
        <li className="text-xm lg:text-xl">
          <Link to="/home" className="text-white hover:text-indigo-500">
           <p className=""> Dashboard</p>
          </Link>
        </li>
      
        <li className="text-xm lg:text-xl">
            <Link to="/home/employees" className="text-white hover:text-indigo-500">
              User
            </Link>
          </li>
          <li className="text-xm lg:text-xl">
            <Link to="/home/create" className="text-white hover:text-indigo-500">
              createUser
            </Link>
          </li>
        
          <li className="text-xm lg:text-xl">
          <Link to="/home/profile" className="text-white hover:text-indigo-500">
           profile
          </Link>
        </li>
        <li className="text-xm lg:text-xl">
        <button className="text-white"> logout </button>

        </li>
      </ul>
    </div>
  );
};
export default Sidebar;